import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Status = 'backlog' | 'doing' | 'review' | 'done'
type Priority = 'baixa' | 'media' | 'alta'
type View = 'tasks' | 'agenda'
type EventType = 'reuniao' | 'treinamento' | 'alinhamento'

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

type AgendaEvent = {
  id: string
  title: string
  type: EventType
  date: string
  time: string
  participants: string
}

const team: TeamMember[] = [
  { id: 'isaac', name: 'Isaac Vinicius', role: 'Engenharia' },
  { id: 'fabio', name: 'Fabio Junior', role: 'Projetos' },
  { id: 'rafael', name: 'Rafael', role: 'Automação' },
  { id: 'diego', name: 'Diego', role: 'Atendimento' },
  { id: 'luiza', name: 'Luiza', role: 'Comercial' },
  { id: 'larissa', name: 'Larissa Nunes', role: 'Financeiro' },
  { id: 'joao', name: 'João Paulo', role: 'Tecnologia' },
  { id: 'ingrid', name: 'Ingrid', role: 'Qualidade' },
  { id: 'gustavo', name: 'Gustavo', role: 'Operações' },
  { id: 'marconi', name: 'Marconi', role: 'Implantação' },
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
    objective: 'Dar visibilidade ao cliente sobre o andamento das solicitações',
  },
  {
    id: '2',
    title: 'Revisar contratos pendentes',
    description: 'Conferir contratos que precisam de assinatura até o fim da semana.',
    ownerId: 'larissa',
    status: 'review',
    priority: 'media',
    dueDate: '2026-06-16',
    objective: 'Garantir uma contratação clara e segura para o cliente',
  },
  {
    id: '3',
    title: 'Desenhar solução de automação',
    description: 'Mapear o processo atual e preparar uma proposta técnica simplificada.',
    ownerId: 'rafael',
    status: 'backlog',
    priority: 'alta',
    dueDate: '2026-06-25',
    objective: 'Reduzir atividades manuais na operação do cliente',
  },
  {
    id: '4',
    title: 'Atualizar painel de entregas',
    description: 'Migrar informações antigas para o painel e retirar duplicidades.',
    ownerId: 'gustavo',
    status: 'done',
    priority: 'media',
    dueDate: '2026-06-10',
    objective: 'Centralizar o acompanhamento da implantação do cliente',
  },
  {
    id: '5',
    title: 'Validar projeto de engenharia',
    description: 'Revisar requisitos técnicos antes da apresentação da solução.',
    ownerId: 'isaac',
    status: 'doing',
    priority: 'alta',
    dueDate: '2026-06-11',
    objective: 'Entregar uma solução tecnicamente segura e aderente ao cliente',
  },
]

const initialAgenda: AgendaEvent[] = [
  {
    id: 'agenda-1',
    title: 'Alinhamento semanal de projetos',
    type: 'alinhamento',
    date: '2026-06-15',
    time: '09:00',
    participants: 'Todo o time',
  },
  {
    id: 'agenda-2',
    title: 'Treinamento de segurança em campo',
    type: 'treinamento',
    date: '2026-06-17',
    time: '14:00',
    participants: 'Engenharia e Implantação',
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

const eventTypeLabels: Record<EventType, string> = {
  reuniao: 'Reunião',
  treinamento: 'Treinamento',
  alinhamento: 'Alinhamento',
}

const statusOrder: Status[] = ['backlog', 'doing', 'review', 'done']

function getOwner(ownerId: string) {
  return team.find((member) => member.id === ownerId)
}

function isOverdue(task: Task) {
  const today = new Date('2026-06-14T00:00:00')
  const dueDate = new Date(`${task.dueDate}T00:00:00`)
  return task.status !== 'done' && dueDate < today
}

function App() {
  const [view, setView] = useState<View>('tasks')
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [agenda, setAgenda] = useState<AgendaEvent[]>(initialAgenda)
  const [title, setTitle] = useState('')
  const [ownerId, setOwnerId] = useState(team[0].id)
  const [priority, setPriority] = useState<Priority>('media')
  const [dueDate, setDueDate] = useState('2026-06-20')
  const [objective, setObjective] = useState('')
  const [eventTitle, setEventTitle] = useState('')
  const [eventType, setEventType] = useState<EventType>('reuniao')
  const [eventDate, setEventDate] = useState('2026-06-16')
  const [eventTime, setEventTime] = useState('09:00')
  const [participants, setParticipants] = useState('')

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
      objective: objective.trim() || 'Entregar valor ao cliente com clareza e dentro do prazo',
    }

    setTasks((currentTasks) => [newTask, ...currentTasks])
    setTitle('')
    setObjective('')
  }

  function addAgendaEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!eventTitle.trim() || !participants.trim()) {
      return
    }

    setAgenda((currentAgenda) => [
      ...currentAgenda,
      {
        id: crypto.randomUUID(),
        title: eventTitle.trim(),
        type: eventType,
        date: eventDate,
        time: eventTime,
        participants: participants.trim(),
      },
    ])
    setEventTitle('')
    setParticipants('')
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
          <span className="eyebrow">Soluções inteligentes e engenharia</span>
          <h1>BitFlow PME</h1>
          <p>
            A central de trabalho da empresa do Ricardo para registrar demandas, acompanhar
            responsáveis, visualizar prazos e tomar decisões com base em indicadores.
          </p>
        </div>
        <div className="hero-card">
          <strong>Metodologia e inspiração</strong>
          <p>Kanban para visualizar o fluxo, com uma experiência simples inspirada no Bitrix24.</p>
        </div>
      </section>

      <nav className="view-tabs" aria-label="Áreas do BitFlow">
        <button className={view === 'tasks' ? 'active' : ''} onClick={() => setView('tasks')}>
          Tarefas e Kanban
        </button>
        <button className={view === 'agenda' ? 'active' : ''} onClick={() => setView('agenda')}>
          Reuniões e treinamentos
        </button>
      </nav>

      {view === 'tasks' ? (
        <>
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

              <label>
                Objetivo do trabalho para o cliente
                <input
                  value={objective}
                  onChange={(event) => setObjective(event.target.value)}
                  placeholder="Ex: Reduzir o consumo de energia da operação"
                />
                <small>Resuma em uma frase o resultado que esta atividade ajuda a entregar.</small>
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
              <p>Equipe de 10 pessoas: identifique rapidamente quem está com mais ou menos demandas.</p>
              <div className="workload-list">
                {metrics.workload.map((member) => (
                  <div className="workload-item" key={member.id}>
                    <div>
                      <strong>{member.name}</strong>
                      <span>{member.role} • {member.activeTasks} ativas • {member.urgentTasks} alta prioridade</span>
                    </div>
                    <div className="workload-bar">
                      <div style={{ width: `${Math.min(member.activeTasks * 25, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
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
                            <div className="client-objective">
                              <dt>Objetivo para o cliente</dt>
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
        </>
      ) : (
        <section className="agenda-grid">
          <form className="agenda-form" onSubmit={addAgendaEvent}>
            <div>
              <span className="section-kicker">Agenda interna</span>
              <h2>Marcar encontro</h2>
              <p>Reuniões, treinamentos e alinhamentos ficam separados das tarefas do Kanban.</p>
            </div>

            <label>
              Título
              <input
                value={eventTitle}
                onChange={(event) => setEventTitle(event.target.value)}
                placeholder="Ex: Reunião de acompanhamento do cliente"
              />
            </label>

            <label>
              Tipo
              <select value={eventType} onChange={(event) => setEventType(event.target.value as EventType)}>
                <option value="reuniao">Reunião</option>
                <option value="treinamento">Treinamento</option>
                <option value="alinhamento">Alinhamento</option>
              </select>
            </label>

            <div className="form-row">
              <label>
                Data
                <input type="date" value={eventDate} onChange={(event) => setEventDate(event.target.value)} />
              </label>
              <label>
                Horário
                <input type="time" value={eventTime} onChange={(event) => setEventTime(event.target.value)} />
              </label>
            </div>

            <label>
              Participantes
              <input
                value={participants}
                onChange={(event) => setParticipants(event.target.value)}
                placeholder="Ex: Engenharia, Comercial e Ricardo"
              />
            </label>

            <button type="submit">Adicionar à agenda</button>
          </form>

          <div className="agenda-panel">
            <div className="agenda-heading">
              <div>
                <span className="section-kicker">Próximos encontros</span>
                <h2>Agenda do time</h2>
              </div>
              <strong>{agenda.length} agendados</strong>
            </div>

            <div className="event-list">
              {agenda
                .slice()
                .sort((first, second) => `${first.date}${first.time}`.localeCompare(`${second.date}${second.time}`))
                .map((item) => (
                  <article className="event-card" key={item.id}>
                    <div className="event-date">
                      <strong>{new Date(`${item.date}T00:00:00`).toLocaleDateString('pt-BR', { day: '2-digit' })}</strong>
                      <span>{new Date(`${item.date}T00:00:00`).toLocaleDateString('pt-BR', { month: 'short' })}</span>
                    </div>
                    <div>
                      <span className={`event-type event-${item.type}`}>{eventTypeLabels[item.type]}</span>
                      <h3>{item.title}</h3>
                      <p>{item.time} • {item.participants}</p>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

export default App
