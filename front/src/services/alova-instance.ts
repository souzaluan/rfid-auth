import { createAlova } from 'alova'
import ReactHook from 'alova/react'
import GlobalFecth from 'alova/GlobalFetch'

const baseURL = process.env.NEXT_PUBLIC_API_URL

export const alovaInstance = createAlova({
  baseURL,
  statesHook: ReactHook,
  requestAdapter: GlobalFecth(),
  responded: {
    onSuccess: async (response) => {
      const json = await response.json()

      if (!response.ok) {
        throw new Error(json.message)
      }

      return json
    },
  },
})
