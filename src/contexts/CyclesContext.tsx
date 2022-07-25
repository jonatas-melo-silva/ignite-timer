import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from 'react'
import {
  createNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

interface CreateCycleData {
  task: string
  minutesAmount: number
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
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const [amountsSecondsPassed, setAmountsSecondsPassed] = useState<number>(0)

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number): void {
    setAmountsSecondsPassed(seconds)
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

    dispatch(createNewCycleAction(newCycle))
    setAmountsSecondsPassed(0)
  }

  function interruptCurrentCycle(): void {
    dispatch(interruptCurrentCycleAction())
  }

  function markCurrentCycleAsFinished(): void {
    dispatch(markCurrentCycleAsFinishedAction())
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
