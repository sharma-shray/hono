import type { Context } from '../../context'
import { parse, serialize } from '../../utils/cookie'
import type { CookieOptions, Cookie } from '../../utils/cookie'

interface GetCookie {
  (c: Context, key: string): string | undefined
  (c: Context): Cookie
}

export const getCookie: GetCookie = (c, key?) => {
  const cookie = c.req.raw.headers.get('Cookie')
  if (typeof key === 'string') {
    if (!cookie) return undefined
    const obj = parse(cookie)
    return obj[key]
  }
  if (!cookie) return {}
  const obj = parse(cookie)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return obj as any
}

export const setCookie = (c: Context, name: string, value: string, opt?: CookieOptions): void => {
  const cookie = serialize(name, value, opt)
  c.header('set-cookie', cookie, { append: true })
}