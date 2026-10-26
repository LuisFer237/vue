import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame'
import { withSetup } from '../../../utils/with-setup'
import { GameStatus } from '@/modules/pokemon/interfaces'
import { flushPromises } from '@vue/test-utils'
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi'

const mockPokemonApi = new MockAdapater(pokemonApi)

describe('usePokemonGame', () => {
  test('should initialize with the correct default values', async () => {
    const [results, app] = withSetup(usePokemonGame)

    expect(results.gameStatus.value).toBe(GameStatus.Playing)
    expect(results.isLoading.value).toBe(true)
    expect(results.pokemonOptions.value).toEqual([])
    expect(results.randomPokemon.value).toBe(null)

    await new Promise((r) => setTimeout(r, 2000))
    await flushPromises()

    expect(results.pokemonOptions.value.length).toBe(4)
    expect(results.randomPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    })
  })
})
