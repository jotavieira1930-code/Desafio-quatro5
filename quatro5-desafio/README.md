# BitFlow PME - Desafio Técnico Quatro5

Ferramenta simples de gestão de atividades para uma empresa de soluções inteligentes e engenharia, criada em TypeScript com React e Vite.

A proposta é apoiar Ricardo e sua equipe de 10 pessoas, resolvendo tarefas espalhadas, falta de clareza sobre responsáveis, prazos estourando sem aviso e reuniões sem números.

## Inspiração e escolha do nome

O projeto utiliza a metodologia Kanban e foi inspirado no Bitrix24, especialmente na ideia de centralizar atividades e acompanhar o trabalho por meio de um quadro visual. O BitFlow adapta esse conceito para uma solução autoral, mais simples e focada nas necessidades apresentadas no desafio técnico.

O nome **BitFlow** combina “Bit”, como referência à inspiração no Bitrix24 e ao contexto de tecnologia, com “Flow”, que representa o fluxo das tarefas pelo quadro Kanban. O projeto não possui vínculo com o Bitrix24.

## Como rodar

Pré-requisitos:

- Node.js LTS instalado
- npm instalado junto com o Node

Passos:

```bash
cd quatro5-desafio
npm install
npm run dev
```

Depois abra o endereço exibido pelo Vite, normalmente:

```txt
http://localhost:5173
```

Para validar a build:

```bash
npm run build
```

## Funcionalidades

- Registro de novas atividades
- Responsável por tarefa
- Prazo
- Prioridade
- Status da tarefa
- Objetivo do trabalho para o cliente em cada atividade
- Quadro Kanban com as etapas: A fazer, Em andamento, Em revisão e Concluído
- Dados fictícios iniciais
- Indicadores/KPIs para apoiar decisão
- Visão de carga de trabalho da equipe de 10 pessoas
- Agenda separada para reuniões, treinamentos e alinhamentos
- Identidade visual em vermelho e branco

## Como a solução responde ao Ricardo

### “O trabalho do time vive espalhado em planilha, papel e grupo de WhatsApp. Eu nunca sei o que está em andamento de verdade.”

O BitFlow centraliza as atividades em um único quadro Kanban. Cada tarefa possui responsável, prazo, prioridade e status, permitindo que o Ricardo visualize o que está a fazer, em andamento, em revisão ou concluído.

### “Tem gente afogada de tarefa e gente ociosa — e eu só descubro quando alguém reclama ou quando algo não sai.”

A seção de carga por pessoa mostra quantas tarefas ativas e quantas tarefas de alta prioridade cada integrante possui. O indicador de pessoas sobrecarregadas ajuda o Ricardo a identificar desequilíbrios e redistribuir o trabalho antes que uma entrega seja afetada.

### “Prazo combinado com cliente estoura e eu só fico sabendo depois que estourou. Ninguém me avisa antes.”

Cada atividade possui um prazo visível e as tarefas vencidas recebem destaque no quadro. O indicador de tarefas atrasadas permite que o Ricardo identifique entregas críticas, cobre uma atualização e renegocie prioridades antes que o problema aumente. Como evolução, o sistema poderia enviar notificações automáticas antes do vencimento.

### “Na reunião de segunda-feira ninguém tem número nenhum. A conversa é toda baseada em ‘acho que foi uma boa semana’.”

O painel apresenta taxa de conclusão, tarefas atrasadas, tarefas ativas, pessoas sobrecarregadas e carga por pessoa. Assim, a reunião pode ser conduzida com números objetivos sobre entregas, atrasos e capacidade do time.

## Metodologia escolhida

Escolhi usar Kanban como base porque o maior problema do Ricardo é falta de visibilidade. O Kanban deixa claro o que está a fazer, o que está em andamento, o que está em revisão e o que já foi concluído.

Também usei uma lógica simples de indicadores para apoiar a reunião semanal. A ideia é que a conversa deixe de ser baseada em “acho que foi uma boa semana” e passe a ser baseada em dados.

## Indicadores e decisões

### Taxa de conclusão

Mostra a porcentagem de tarefas concluídas em relação ao total. O Ricardo usa esse número para entender se o time está realmente finalizando entregas ou apenas acumulando tarefas abertas.

### Tarefas atrasadas

Mostra quantas tarefas passaram do prazo e ainda não foram concluídas. O Ricardo usa esse número para agir antes que o cliente reclame ou antes que um prazo crítico vire crise.

### Tarefas ativas

Mostra quantas tarefas ainda estão abertas. O Ricardo usa esse indicador para entender o volume real de trabalho do time.

### Pessoas sobrecarregadas

Mostra quantas pessoas têm três ou mais tarefas ativas. O Ricardo usa esse número para redistribuir demandas e evitar que alguns membros fiquem afogados enquanto outros ficam ociosos.

### Carga por pessoa

Mostra quantas tarefas ativas e quantas de alta prioridade cada pessoa possui. O Ricardo usa essa visão para equilibrar o trabalho e decidir quem pode receber novas demandas.

## Decisões técnicas

- React: escolhido para construir uma interface dinâmica rapidamente.
- TypeScript: usado por ser exigência do desafio e por trazer tipagem real para tarefas, status, prioridades e membros do time.
- Vite: escolhido por ser simples, rápido e fácil de rodar localmente.
- Dados em memória: não usei banco de dados para manter o escopo viável dentro do prazo.

## O que foi cortado para caber no prazo

- Login de usuários
- Banco de dados
- Autenticação e permissões
- Histórico real de alterações
- Drag and drop entre colunas
- Filtros avançados
- Notificações automáticas de atraso

## O que faria com mais tempo

- Persistência com Supabase ou PostgreSQL
- Autenticação por usuário
- Drag and drop no Kanban
- Filtro por responsável, prioridade e prazo
- Histórico de movimentações da tarefa
- Notificações para tarefas próximas do vencimento
- Deploy na Vercel
- Dashboard com gráficos semanais

## Uso de IA

IA foi usada como apoio para estruturar a solução, acelerar a escrita do código e revisar o README. As decisões principais foram manter o escopo simples, usar Kanban como metodologia central e priorizar indicadores que geram decisão para o gestor.
