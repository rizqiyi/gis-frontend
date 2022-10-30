import { useEffect, useState, Dispatch } from 'react'
import { IDistrict } from '@interfaces/drainase'
import api from '@services/common'

interface IUseDistrict {
  district: IDistrict | null
  loading: boolean
  message: unknown
  setLoading: Dispatch<React.SetStateAction<boolean>>
  setMessage: Dispatch<React.SetStateAction<{ [key: string]: string }>>
  setDistrict: Dispatch<React.SetStateAction<IDistrict | null>>
}

const useDistrict = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps: any[] = [],
  path?: 'A' | 'B'
): IUseDistrict => {
  const [loading, setLoading] = useState<boolean>(false)
  const [district, setDistrict] = useState<IDistrict | null>(null)
  const [message, setMessage] = useState<unknown>({})

  useEffect(() => {
    const fetchDrainase = async () => {
      setLoading(true)

      try {
        const response = await api(
          {
            method: 'get',
            url: `/drainase/district?street_path=${path}`,
            headers: { 'Content-Type': 'application/json' },
          },
          false
        )

        setDistrict(response as IDistrict)

        setLoading(false)

        setMessage({})
      } catch (err: unknown) {
        setLoading(false)

        setDistrict(null)

        setMessage(err)
      }
    }

    fetchDrainase()
  }, [...deps])

  return { district, loading, message, setLoading, setMessage, setDistrict }
}

export default useDistrict
