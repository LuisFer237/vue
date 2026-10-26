import { GameStatus } from '@/modules/pokemon/interfaces'

describe('gameStatusInterface', () => {
  test('should have a value of "playing"', () => {
    expect(GameStatus.Playing).toBe('playing')
  })
  test('should have a value of "playing"', () => {
    expect(GameStatus.Won).toBe('won')
  })
  test('should have a value of "playing"', () => {
    expect(GameStatus.Lost).toBe('lost')
  })
})
