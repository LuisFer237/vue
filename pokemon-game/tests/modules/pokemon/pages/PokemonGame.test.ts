import PokemonGame from '@/modules/pokemon/pages/PokemonGame.vue'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame'
import type { Mock } from 'vitest'
import { GameStatus } from '@/modules/pokemon/interfaces'

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
  usePokemonGame: vi.fn(),
}))

const pokemonOptions = [
  {
    name: 'bulbasaur',
    id: 1,
  },
  {
    name: 'ivysaur',
    id: 2,
  },
  {
    name: 'venusaur',
    id: 3,
  },
  {
    name: 'charmander',
    id: 4,
  },
]

describe('Pokemon Game', () => {
  test('should initialize with defult values', () => {
    ;(usePokemonGame as Mock).mockReturnValue({
      gameStatus: GameStatus.Playing,
      isLoading: true,
      randomPokemon: null,
      pokemonOptions: [],
      checkAnswer: vi.fn(),
      blockSelection: false,
      getNextRound: vi.fn(),
      gameCounter: 0,
      bestScore: 0,
    })

    const wrapper = mount(PokemonGame)

    expect(wrapper.get('h1').text()).toBe('Espere por favor')
    expect(wrapper.get('h1').classes()).toContain('text-xl')

    expect(wrapper.get('label').text()).toBe('Cargando')
  })

  test('should render pokemon picture and pokemon options', () => {
    ;(usePokemonGame as Mock).mockReturnValue({
      gameStatus: GameStatus.Playing,
      isLoading: false,
      randomPokemon: pokemonOptions.at(0),
      pokemonOptions: pokemonOptions,
      checkAnswer: vi.fn(),
      blockSelection: false,
      getNextRound: vi.fn(),
      gameCounter: 0,
      bestScore: 0,
    })

    const wrapper = mount(PokemonGame)
    const imageUrl =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg'
    const pokemons = pokemonOptions.map((p) => p.name)
    // console.log(wrapper.html())

    expect(wrapper.find('img').attributes('src')).toBe(imageUrl)

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(4)

    buttons.forEach((button) => {
      expect(pokemons).toContain(button.text())
    })
  })

  test('should render button for a new game', () => {
    ;(usePokemonGame as Mock).mockReturnValue({
      gameStatus: ref(GameStatus.Won),
      isLoading: false,
      randomPokemon: pokemonOptions.at(0),
      pokemonOptions: pokemonOptions,
      checkAnswer: vi.fn(),
      blockSelection: false,
      getNextRound: vi.fn(),
      gameCounter: 0,
      bestScore: 0,
    })

    const wrapper = mount(PokemonGame)
    // console.log(wrapper.html())

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(5)
    expect(wrapper.get('[role="dialog"] button').text()).toBe('Continuar')
  })

  test('should call the getNextRound function when the button is clicked', async () => {
    const getNextRoundMock = vi.fn()

    ;(usePokemonGame as Mock).mockReturnValue({
      gameStatus: ref(GameStatus.Won),
      isLoading: false,
      randomPokemon: pokemonOptions.at(0),
      pokemonOptions: pokemonOptions,
      checkAnswer: vi.fn(),
      blockSelection: false,
      getNextRound: getNextRoundMock,
      gameCounter: 0,
      bestScore: 0,
    })

    const wrapper = mount(PokemonGame)
    const button = wrapper.find('[data-test-id="btn-new-game"]')

    await button.trigger('click')

    expect(getNextRoundMock).toHaveBeenCalledTimes(1)
    expect(getNextRoundMock).toHaveBeenCalledWith(4)
  })
})
