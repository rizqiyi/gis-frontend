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

const useDrainase = (is_published: string | boolean = ''): IUseDrainase => {
  const [loading, setLoading] = useState<boolean>(false)
  const [drainase, setDrainase] = useState<IDrainase | null>(null)
  const [message, setMessage] = useState<unknown>({})

  useEffect(() => {
    const fetchDrainase = async () => {
      setLoading(true)

      try {
        const response = await api({
          method: 'get',
          url: '/drainase',
          ...(is_published ? { params: { is_published } } : {}),
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
  }, [])

  return { drainase, loading, message, setLoading, setMessage, setDrainase }
}

export default useDrainase
