import produce from 'immer'
import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
  status: 'pending' | 'concluded' | 'interrupted'
}

interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CycleState, action: any) {
  console.log(state)
  console.log(action)

  switch (action.type) {
    case ActionTypes.CREATE_NEW_CYCLE:
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload],
      //   activeCycleId: action.payload.id,
      // }
      return produce(state, (draft) => {
        draft.cycles.push(action.payload)
        draft.activeCycleId = action.payload.id
      })
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return {
      //         ...cycle,
      //         interruptedDate: new Date(),
      //         status: 'interrupted',
      //       }
      //     }
      //     return cycle
      //   }),
      //   activeCycleId: null,
      // }
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return {
      //         ...cycle,
      //         finishedDate: new Date(),
      //         status: 'concluded',
      //       }
      //     }
      //     return cycle
      //   }),
      //   activeCycleId: null,
      // }
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
    }
    default:
      return state
  }
}
