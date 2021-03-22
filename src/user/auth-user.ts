export interface AuthUser {
  readonly id: string
}

export const getNameFromId = (id: string) => {
  return `User ${Array.from(id)
    .filter((c, index) => index % 3 === 0)
    .map((c) => `${(c.charCodeAt(0) % 10) + 1}`)
    .join('')}`
}
