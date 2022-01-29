/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, Dispatch } from 'react'
import api from '@services/common'

interface IUseDrainaseRead {
  drainase: { [key: string]: any }
  loading: boolean
  message: unknown
  setLoading: Dispatch<React.SetStateAction<boolean>>
  setMessage: Dispatch<React.SetStateAction<{ [key: string]: string }>>
  setDrainase: Dispatch<React.SetStateAction<{ [key: string]: any }>>
}

const useDrainaseRead = (
  is_published: string | boolean = '',
  id: string,
  deps: any[] = []
): IUseDrainaseRead => {
  const [loading, setLoading] = useState<boolean>(false)
  const [drainase, setDrainase] = useState({})
  const [message, setMessage] = useState<unknown>({})

  useEffect(() => {
    const fetchDrainase = async () => {
      setLoading(true)

      try {
        const response = await api({
          method: 'get',
          url: `/drainase/${id}`,
          ...(is_published ? { params: { is_published } } : {}),
          headers: { 'Content-Type': 'application/json' },
        })

        const { data } = response

        setDrainase(data)

        setLoading(false)

        setMessage({})
      } catch (err: unknown) {
        setLoading(false)

        setDrainase({})

        setMessage(err)
      }
    }

    fetchDrainase()
  }, [...deps])

  return { drainase, loading, message, setLoading, setMessage, setDrainase }
}

export default useDrainaseRead
