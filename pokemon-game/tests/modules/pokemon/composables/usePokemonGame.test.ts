import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame'
import { withSetup } from '../../../utils/with-setup'
import { GameStatus } from '@/modules/pokemon/interfaces'
import { flushPromises } from '@vue/test-utils'
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi'
import MockAdapter from 'axios-mock-adapter'
import { pokemonListFake } from '../../../data/fake-pokemons'

const mockPokemonApi = new MockAdapter(pokemonApi)

mockPokemonApi.onGet('/?limit=1025').reply(200, {
  results: pokemonListFake,
})

describe('usePokemonGame', async () => {
  test('should initialize with the correct default values', async () => {
    const [results, app] = withSetup(usePokemonGame)

    expect(results.gameStatus.value).toBe(GameStatus.Playing)
    expect(results.isLoading.value).toBe(true)
    expect(results.pokemonOptions.value).toEqual([])
    expect(results.randomPokemon.value).toBe(null)

    await flushPromises()

    expect(results.pokemonOptions.value.length).toBe(4)
    expect(results.randomPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    })
  })

  test('should correctly handle getNextRound', async () => {
    const [results] = withSetup(usePokemonGame)
    await flushPromises()

    results.gameStatus.value = GameStatus.Won

    results.getNextRound(5)

    expect(results.gameStatus.value).toBe(GameStatus.Playing)
    expect(results.pokemonOptions.value).toHaveLength(5)
  })

  test('should correctly handle getNextRound and return different pokemons', async () => {
    const [results] = withSetup(usePokemonGame)
    await flushPromises()

    const lastPokemons = [...results.pokemonOptions.value]

    results.getNextRound()

    // console.log(results.pokemonOptions.value)
    // console.log(lastPokemons)

    expect(results.pokemonOptions.value).not.toEqual(lastPokemons)
  })

  test('should correctly handle an incorrect answer', async () => {
    const [results] = withSetup(usePokemonGame)
    await flushPromises()

    const { checkAnswer, gameStatus } = results

    expect(results.gameStatus.value).toBe(GameStatus.Playing)

    checkAnswer(100000)

    expect(results.gameStatus.value).toBe(GameStatus.Lost)
  })

  test('should correctly handle an correct answer', async () => {
    const [results] = withSetup(usePokemonGame)
    await flushPromises()

    const { checkAnswer, gameStatus, randomPokemon } = results

    expect(results.gameStatus.value).toBe(GameStatus.Playing)

    checkAnswer(randomPokemon.value.id)

    expect(results.gameStatus.value).toBe(GameStatus.Won)
  })
})
