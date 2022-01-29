import axios, { Canceler } from 'axios'
import { useQuery } from 'react-query'

type UseDrainaseSearch = {
  q: string
  path: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any
}

const { CancelToken } = axios

let cancel: Canceler

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useDrainaseSearch = ({ q, path, options }: UseDrainaseSearch) => {
  if (cancel !== undefined) {
    cancel()
  }

  const query = useQuery(
    ['/search-drainase', q, path],
    () =>
      axios
        .get(`${process.env.REACT_APP_API_URI_PROD}/drainase`, {
          cancelToken: new CancelToken((c: Canceler) => {
            cancel = c
          }),
          params: {
            q,
            street_path: path,
          },
        })
        .then((res) => {
          return res.data
        }),
    {
      ...options,
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always',
      refetchOnMount: false,
    }
  )

  return {
    ...query,
    data: query.data?.data,
  }
}

export default useDrainaseSearch
