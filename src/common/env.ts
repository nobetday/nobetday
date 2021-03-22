export const ensureEnv = (key: string, value: string | undefined): string => {
  if (!value) {
    throw new Error(`Env ${key} not found`)
  }
  return value
}
