import { createContext, ReactNode, useContext, useState } from 'react'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
  status: 'pending' | 'concluded' | 'interrupted'
}

interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountsSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CycleContextType)

type CyclesContextProviderProps = {
  children: ReactNode
}

export function CycleContextProvider({ children }: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountsSecondsPassed, setAmountsSecondsPassed] = useState<number>(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number): void {
    setAmountsSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished(): void {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            status: 'concluded',
            finishedDate: new Date(),
          } as Cycle
        }

        return cycle
      }),
    )
    setActiveCycleId(null)
  }

  function createNewCycle(data: CreateCycleData): void {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
      status: 'pending',
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountsSecondsPassed(0)
  }

  function interruptCurrentCycle(): void {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            status: 'interrupted',
            interruptedDate: new Date(),
          } as Cycle
        }

        return cycle
      }),
    )

    setActiveCycleId(null)
  }
  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountsSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

export function useCyclesContext(): CycleContextType {
  return useContext(CyclesContext)
}
