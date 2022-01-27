import axios, { AxiosRequestConfig, Canceler } from 'axios'

const { CancelToken } = axios

let cancel: Canceler

const api = async (
  payload: AxiosRequestConfig,
  withCancel = false
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  if (cancel !== undefined && withCancel) {
    cancel()
  }

  try {
    const response = await axios({
      ...payload,
      // timeout: 30000,
      baseURL: process.env.REACT_APP_API_URI_PROD,
      cancelToken: new CancelToken((c: Canceler) => {
        cancel = c
      }),
    })

    return response?.data
  } catch (error: unknown) {
    return error
  }
}

// const reFetch = async (payload: AxiosRequestConfig, token: string) => {
//   if (token) {
//     try {
//       payload.timeout = 30000

//       const reRequest = await axios({
//         ...payload,
//         headers: {
//           ...payload.headers,
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       return reRequest.data
//     } catch (error) {
//       return Promise.reject(error)
//     }
//   }
// }

export default api
