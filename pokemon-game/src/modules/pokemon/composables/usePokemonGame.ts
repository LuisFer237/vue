import { GameStatus, type Pokemon, type PokemonListResponse } from '@/modules/pokemon/interfaces'
import { computed, onMounted, ref } from 'vue'
import { pokemonApi } from '../api/pokemonApi'

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing)
  const gameCounter = ref(0)
  const pokemons = ref<Pokemon[]>([])
  const pokemonOptions = ref<Pokemon[]>([])
  const blockSelection = computed(() => gameStatus.value !== GameStatus.Playing)
  const bestScoreKey = 'pokemon-game:best-score'

  const loadBestScore = (): number => {
    const stored = Number(localStorage.getItem(bestScoreKey))
    return Number.isFinite(stored) ? stored : 0
  }

  const bestScore = ref(loadBestScore())

  const saveBestCore = (score: number) => {
    if (score <= bestScore.value) return
    bestScore.value = score
    localStorage.setItem(bestScoreKey, String(score))
  }

  const randomPokemon = ref<Pokemon | null>(null)
  const isLoading = computed(() => pokemons.value.length === 0)

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=1025')

    const pokemonsArray = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/')
      const id = urlParts.at(-2) ?? 0
      return {
        name: pokemon.name,
        id: +id,
      }
    })

    return pokemonsArray.sort(() => Math.random() - 0.5)
  }

  const getNextRound = (howMany: number = 4) => {
    if (gameStatus.value === GameStatus.Lost) {
      gameCounter.value = 0
    }
    gameStatus.value = GameStatus.Playing

    const options = pokemons.value.slice(0, howMany)
    pokemonOptions.value = options
    randomPokemon.value = options[Math.floor(Math.random() * options.length)] ?? null
    pokemons.value = pokemons.value.slice(howMany)
  }

  const checkAnswer = (id: number) => {
    if (!randomPokemon.value) return

    const hasWon = randomPokemon.value.id === id

    if (hasWon) {
      gameStatus.value = GameStatus.Won
      gameCounter.value++
      saveBestCore(gameCounter.value)
      return
    }

    gameStatus.value = GameStatus.Lost
  }

  onMounted(async () => {
    pokemons.value = await getPokemons()
    getNextRound()
    console.log(pokemonOptions.value)
  })

  return {
    gameStatus,
    isLoading,
    pokemonOptions,
    randomPokemon,
    gameCounter,
    bestScore,

    getNextRound,
    checkAnswer,
    blockSelection,
  }
}
