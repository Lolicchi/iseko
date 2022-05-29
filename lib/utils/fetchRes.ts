import { Constants } from './Constants.ts'

export const fetchRes = async <T>(
  endpoint: string,
  token: string,
  headers?: Record<string, string>
): Promise<T | undefined> => {
  const res = await (
    await fetch(Constants.API + endpoint, {
      headers: {
        ...headers,
        Authorization: token
      }
    })
  ).json()
  return res.message ? undefined : res
}
