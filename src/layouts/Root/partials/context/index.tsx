import React, { useContext, useReducer } from 'react'
import DistrictUrl from '@shp/district.zip'
import TYPES from './types'

interface IFilterDrainase {
  value: string
  manage: string
}

type InitValue = {
  basicMap: string
  setBasicMap: (v: string) => void
  filterDrainase: Array<string>
  filterManage: Record<string, boolean>
  setFilterDrainase: (v: IFilterDrainase) => void
}

type Action = {
  type: TYPES
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any | IFilterDrainase
}

const initValue: InitValue = {
  basicMap: DistrictUrl,
  setBasicMap: () => {},
  filterDrainase: [],
  filterManage: { A: false, B: false },
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
        filterDrainase: Array.from(
          new Set([...state.filterDrainase, payload?.value])
        ),
        filterManage: {
          ...state.filterManage,
          [payload?.manage]: !state.filterManage[payload?.manage],
        },
      }

    case TYPES.REMOVE_FILTER_DRAINASE:
      return {
        ...state,
        filterDrainase: state.filterDrainase.filter(
          (drainase) => drainase !== payload?.value
        ),
        filterManage: {
          ...state.filterManage,
          [payload?.manage]: !state.filterManage[payload?.manage],
        },
      }

    default:
      return state
  }
}

const MapProvider: React.FC<IMapProvider> = ({ children }: IMapProvider) => {
  const [state, dispatch] = useReducer(REDUCER, initValue)

  const setBasicMap = (payload: string) =>
    dispatch({ type: TYPES.SET_BASIC_MAP, payload })

  const setFilterDrainase = ({ value, manage }: IFilterDrainase) =>
    dispatch({
      type: TYPES.SET_FILTER_DRINASE,
      payload: { value, manage },
    })

  return (
    <MapContext.Provider
      value={{
        basicMap: state.basicMap,
        setBasicMap,
        filterDrainase: state.filterDrainase,
        setFilterDrainase,
        filterManage: state.filterManage,
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
