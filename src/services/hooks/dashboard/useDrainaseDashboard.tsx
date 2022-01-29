/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, Dispatch } from 'react'
import api from '@services/common'

interface IUseDrainase {
  drainase: any
  loading: boolean
  message: unknown
  setLoading: Dispatch<React.SetStateAction<boolean>>
  setMessage: Dispatch<React.SetStateAction<{ [key: string]: string }>>
  setDrainase: Dispatch<React.SetStateAction<null>>
}

const useDrainaseDashboard = (): IUseDrainase => {
  const [loading, setLoading] = useState<boolean>(false)
  const [drainase, setDrainase] = useState<any>({})
  const [message, setMessage] = useState<unknown>({})

  useEffect(() => {
    const fetchDrainaseDashboard = async () => {
      setLoading(true)

      try {
        const response = await api({
          method: 'get',
          url: '/drainase/dashboard',
          headers: { 'Content-Type': 'application/json' },
        })

        const { data } = response

        setDrainase(data)

        setLoading(false)

        setMessage({})
      } catch (err: unknown) {
        setLoading(false)

        setDrainase(null)

        setMessage(err)
      }
    }

    fetchDrainaseDashboard()
  }, [])

  return { drainase, loading, message, setLoading, setMessage, setDrainase }
}

export default useDrainaseDashboard
