import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Status = 'backlog' | 'doing' | 'review' | 'done'
type Priority = 'baixa' | 'media' | 'alta'

type TeamMember = {
  id: string
  name: string
  role: string
}

type Task = {
  id: string
  title: string
  description: string
  ownerId: string
  status: Status
  priority: Priority
  dueDate: string
  objective: string
}

const team: TeamMember[] = [
  { id: 'ana', name: 'Ana Souza', role: 'Vendas' },
  { id: 'bruno', name: 'Bruno Lima', role: 'Operações' },
  { id: 'carla', name: 'Carla Nunes', role: 'Financeiro' },
  { id: 'diego', name: 'Diego Alves', role: 'Atendimento' },
  { id: 'elisa', name: 'Elisa Rocha', role: 'Marketing' },
]

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Organizar demandas recebidas pelo WhatsApp',
    description: 'Centralizar solicitações dos clientes que estavam espalhadas em conversas.',
    ownerId: 'diego',
    status: 'doing',
    priority: 'alta',
    dueDate: '2026-06-14',
    objective: 'Reduzir perda de prazos com clientes',
  },
  {
    id: '2',
    title: 'Revisar contratos pendentes',
    description: 'Conferir contratos que precisam de assinatura até o fim da semana.',
    ownerId: 'carla',
    status: 'review',
    priority: 'media',
    dueDate: '2026-06-16',
    objective: 'Melhorar previsibilidade financeira',
  },
  {
    id: '3',
    title: 'Criar campanha de indicação',
    description: 'Planejar uma campanha simples para clientes indicarem novos clientes.',
    ownerId: 'elisa',
    status: 'backlog',
    priority: 'baixa',
    dueDate: '2026-06-25',
    objective: 'Aumentar geração de oportunidades',
  },
  {
    id: '4',
    title: 'Atualizar planilha de entregas',
    description: 'Migrar informações antigas para o painel e retirar duplicidades.',
    ownerId: 'bruno',
    status: 'done',
    priority: 'media',
    dueDate: '2026-06-10',
    objective: 'Centralizar acompanhamento operacional',
  },
  {
    id: '5',
    title: 'Ligar para clientes com prazo crítico',
    description: 'Entrar em contato com clientes impactados por atrasos e alinhar expectativa.',
    ownerId: 'ana',
    status: 'doing',
    priority: 'alta',
    dueDate: '2026-06-11',
    objective: 'Evitar surpresa negativa para clientes',
  },
]

const statusLabels: Record<Status, string> = {
  backlog: 'A fazer',
  doing: 'Em andamento',
  review: 'Em revisão',
  done: 'Concluído',
}

const priorityLabels: Record<Priority, string> = {
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta',
}

const statusOrder: Status[] = ['backlog', 'doing', 'review', 'done']

function getOwner(ownerId: string) {
  return team.find((member) => member.id === ownerId)
}

function isOverdue(task: Task) {
  const today = new Date('2026-06-13T00:00:00')
  const dueDate = new Date(`${task.dueDate}T00:00:00`)
  return task.status !== 'done' && dueDate < today
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [title, setTitle] = useState('')
  const [ownerId, setOwnerId] = useState(team[0].id)
  const [priority, setPriority] = useState<Priority>('media')
  const [dueDate, setDueDate] = useState('2026-06-20')

  const metrics = useMemo(() => {
    const total = tasks.length
    const done = tasks.filter((task) => task.status === 'done').length
    const overdue = tasks.filter(isOverdue).length
    const active = tasks.filter((task) => task.status !== 'done').length

    const workload = team.map((member) => {
      const memberTasks = tasks.filter((task) => task.ownerId === member.id && task.status !== 'done')
      return {
        ...member,
        activeTasks: memberTasks.length,
        urgentTasks: memberTasks.filter((task) => task.priority === 'alta').length,
      }
    })

    return {
      total,
      done,
      active,
      overdue,
      completionRate: total === 0 ? 0 : Math.round((done / total) * 100),
      overloaded: workload.filter((item) => item.activeTasks >= 3).length,
      workload,
    }
  }, [tasks])

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title.trim()) {
      return
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: 'Atividade criada durante o acompanhamento do time.',
      ownerId,
      status: 'backlog',
      priority,
      dueDate,
      objective: 'Organizar demandas do time',
    }

    setTasks((currentTasks) => [newTask, ...currentTasks])
    setTitle('')
  }

  function changeStatus(taskId: string, nextStatus: Status) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, status: nextStatus } : task)),
    )
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div>
          <span className="eyebrow">Gestão de Atividades</span>
          <h1>BitFlow PME</h1>
          <p>
            Um painel simples para o Ricardo registrar demandas, acompanhar responsáveis,
            visualizar prazos e tomar decisões com base em indicadores.
          </p>
        </div>
        <div className="hero-card">
          <strong>Metodologia escolhida</strong>
          <p>Kanban para visualizar o fluxo + indicadores para apoiar a reunião semanal.</p>
        </div>
      </section>

      <section className="metrics-grid" aria-label="Indicadores do time">
        <article className="metric-card">
          <span>Conclusão</span>
          <strong>{metrics.completionRate}%</strong>
          <small>Mostra se o time está realmente finalizando entregas.</small>
        </article>
        <article className="metric-card warning">
          <span>Atrasadas</span>
          <strong>{metrics.overdue}</strong>
          <small>Ajuda o Ricardo a agir antes do cliente reclamar.</small>
        </article>
        <article className="metric-card">
          <span>Ativas</span>
          <strong>{metrics.active}</strong>
          <small>Indica quanto trabalho ainda está aberto.</small>
        </article>
        <article className="metric-card">
          <span>Sobrecarregados</span>
          <strong>{metrics.overloaded}</strong>
          <small>Mostra se alguém precisa de redistribuição de tarefas.</small>
        </article>
      </section>

      <section className="content-grid">
        <form className="task-form" onSubmit={addTask}>
          <h2>Registrar nova atividade</h2>
          <label>
            Título da tarefa
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ex: Revisar proposta do cliente"
            />
          </label>

          <label>
            Responsável
            <select value={ownerId} onChange={(event) => setOwnerId(event.target.value)}>
              {team.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} — {member.role}
                </option>
              ))}
            </select>
          </label>

          <div className="form-row">
            <label>
              Prioridade
              <select value={priority} onChange={(event) => setPriority(event.target.value as Priority)}>
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>
            </label>

            <label>
              Prazo
              <input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
            </label>
          </div>

          <button type="submit">Adicionar tarefa</button>
        </form>

        <aside className="workload-panel">
          <h2>Carga por pessoa</h2>
          <p>Ajuda a identificar pessoas afogadas ou ociosas.</p>
          {metrics.workload.map((member) => (
            <div className="workload-item" key={member.id}>
              <div>
                <strong>{member.name}</strong>
                <span>{member.activeTasks} tarefas ativas • {member.urgentTasks} alta prioridade</span>
              </div>
              <div className="workload-bar">
                <div style={{ width: `${Math.min(member.activeTasks * 25, 100)}%` }} />
              </div>
            </div>
          ))}
        </aside>
      </section>

      <section className="kanban-board" aria-label="Quadro Kanban">
        {statusOrder.map((status) => {
          const columnTasks = tasks.filter((task) => task.status === status)

          return (
            <div className="kanban-column" key={status}>
              <div className="column-header">
                <h2>{statusLabels[status]}</h2>
                <span>{columnTasks.length}</span>
              </div>

              <div className="task-list">
                {columnTasks.map((task) => {
                  const owner = getOwner(task.ownerId)
                  const overdue = isOverdue(task)

                  return (
                    <article className={`task-card ${overdue ? 'overdue' : ''}`} key={task.id}>
                      <div className="task-topline">
                        <span className={`priority priority-${task.priority}`}>{priorityLabels[task.priority]}</span>
                        {overdue && <span className="overdue-badge">Atrasada</span>}
                      </div>

                      <h3>{task.title}</h3>
                      <p>{task.description}</p>

                      <dl>
                        <div>
                          <dt>Responsável</dt>
                          <dd>{owner?.name}</dd>
                        </div>
                        <div>
                          <dt>Prazo</dt>
                          <dd>{new Date(`${task.dueDate}T00:00:00`).toLocaleDateString('pt-BR')}</dd>
                        </div>
                        <div>
                          <dt>Objetivo</dt>
                          <dd>{task.objective}</dd>
                        </div>
                      </dl>

                      <label className="status-control">
                        Status
                        <select value={task.status} onChange={(event) => changeStatus(task.id, event.target.value as Status)}>
                          {statusOrder.map((option) => (
                            <option key={option} value={option}>
                              {statusLabels[option]}
                            </option>
                          ))}
                        </select>
                      </label>
                    </article>
                  )
                })}
              </div>
            </div>
          )
        })}
      </section>
    </main>
  )
}

export default App
