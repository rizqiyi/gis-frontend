import React, { useContext, useReducer } from 'react'
import DistrictUrl from '@shp/district.zip'
import TYPES from './types'

type InitValue = {
  basicMap: string
  setBasicMap: (v: string) => void
  filterDrainase: Array<string>
  setFilterDrainase: (v: string) => void
}

type Action = {
  type: TYPES
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any
}

const initValue: InitValue = {
  basicMap: DistrictUrl,
  setBasicMap: () => {},
  filterDrainase: [],
  setFilterDrainase: () => {},
}

const MapContext = React.createContext(initValue)

interface IMapProvider {
  children: React.ReactNode
}

const REDUCER = (state: InitValue, action: Action): InitValue => {
  const { type, payload } = action
  switch (type) {
    case TYPES.SET_BASIC_MAP:
      return {
        ...state,
        basicMap: payload,
      }

    case TYPES.SET_FILTER_DRINASE:
      return {
        ...state,
        filterDrainase: [...state.filterDrainase, payload],
      }

    case TYPES.REMOVE_FILTER_DRAINASE:
      return {
        ...state,
        filterDrainase: state.filterDrainase.filter(
          (drainase) => drainase !== payload
        ),
      }

    default:
      return state
  }
}

const MapProvider: React.FC<IMapProvider> = ({ children }: IMapProvider) => {
  const [state, dispatch] = useReducer(REDUCER, initValue)

  const setBasicMap = (payload: string) =>
    dispatch({ type: TYPES.SET_BASIC_MAP, payload })

  const setFilterDrainase = (payload: string) => {
    const isDuplicate = state.filterDrainase.findIndex(
      (drainase: string) => drainase === payload
    )

    dispatch({
      type:
        isDuplicate > -1
          ? TYPES.REMOVE_FILTER_DRAINASE
          : TYPES.SET_FILTER_DRINASE,
      payload,
    })
  }

  return (
    <MapContext.Provider
      value={{
        basicMap: state.basicMap,
        setBasicMap,
        filterDrainase: Array.from(new Set(state.filterDrainase)),
        setFilterDrainase,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}

export const useMapContext = (): InitValue => {
  const mapContext = useContext(MapContext)

  return mapContext
}

export default MapProvider
