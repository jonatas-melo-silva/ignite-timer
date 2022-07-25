import { ReactElement } from 'react'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { useCyclesContext } from '../../contexts/CyclesContext'
import { HistoryContainer, HistoryList, Status } from './styles'

export function History(): ReactElement {
  const { cycles } = useCyclesContext()
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {cycle.status === 'concluded' && (
                    <Status statusColor="green">Concluída</Status>
                  )}
                  {cycle.status === 'interrupted' && (
                    <Status statusColor="red">Interrompido</Status>
                  )}
                  {cycle.status === 'pending' && (
                    <Status statusColor="yellow">Em andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
