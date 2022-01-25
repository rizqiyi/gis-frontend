import { useEffect, useState, Dispatch } from 'react'
import { IDrainase } from '@interfaces/drainase'
import api from '@services/common'

interface IUseDrainase {
  drainase: IDrainase | null
  loading: boolean
  message: unknown
  setLoading: Dispatch<React.SetStateAction<boolean>>
  setMessage: Dispatch<React.SetStateAction<{ [key: string]: string }>>
  setDrainase: Dispatch<React.SetStateAction<IDrainase | null>>
}

type Query = {
  street_path?: string | boolean
}

const useDrainase = (
  is_published: string | boolean = '',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps: any[] = [],
  q?: Query
): IUseDrainase => {
  const [loading, setLoading] = useState<boolean>(false)
  const [drainase, setDrainase] = useState<IDrainase | null>(null)
  const [message, setMessage] = useState<unknown>({})

  const getParams = (pubs: string | boolean, query?: Query) => {
    const p = { params: {} }

    if (is_published) Object.assign(p.params, { is_published: pubs })

    if (query) Object.assign(p.params, { ...query })

    return p
  }

  useEffect(() => {
    const fetchDrainase = async () => {
      setLoading(true)

      try {
        const response = await api({
          method: 'get',
          url: '/drainase',
          ...getParams(is_published, q),
          headers: { 'Content-Type': 'application/json' },
        })

        const { data } = response

        setDrainase(data as IDrainase)

        setLoading(false)

        setMessage({})
      } catch (err: unknown) {
        setLoading(false)

        setDrainase(null)

        setMessage(err)
      }
    }

    fetchDrainase()
  }, [...deps])

  return { drainase, loading, message, setLoading, setMessage, setDrainase }
}

export default useDrainase
