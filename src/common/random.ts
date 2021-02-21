import { randomLcg } from 'd3-random'

export type RandomSource = () => number

export const getDailyRandomSource = (): RandomSource => {
  const date = new Date()
    .toISOString()
    .substring(0, 10)
    .replace(/-/g, '')
  return randomLcg(+date)
}
