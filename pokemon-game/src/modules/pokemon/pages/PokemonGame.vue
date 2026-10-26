<template>
  <main
    v-if="isLoading || !randomPokemon"
    class="flex flex-col items-center justify-center gap-4 p-4 text-center"
  >
    <h1 class="text-xl font-bold text-balance sm:text-3xl">Espere por favor</h1>
    <div class="progress-bar-container w-full max-w-64">
      <label for="loading-progress">Cargando</label>
      <progress id="loading-progress" class="primary" :value="progress" max="100"></progress>
    </div>
  </main>

  <main
    v-else
    class="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center gap-3 p-4 sm:gap-5"
  >
    <gameCounter :best-score="bestScore" :game-counter="gameCounter" />
    <h1 class="text-center text-md text-balance text-gbc-dark sm:text-lg md:text-xl">
      ¿Quién es este Pokémon?
    </h1>
    <span v-if="isRoundOver" class="capitalize">Es {{ randomPokemon.name }}!</span>

    <!-- Capa que oscurece el fondo y centra el contenido -->
    <div
      v-if="isRoundOver"
      class="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="round-result"
    >
      <div class="framed neutral round-modal flex flex-col items-center gap-3 text-center">
        <span v-if="gameStatus === GameStatus.Lost">Has perdido!</span>
        <span v-if="gameStatus === GameStatus.Lost">Puntuación final: {{ gameCounter }}</span>
        <button type="button" @click="getNextRound(4)">
          {{ gameStatus === GameStatus.Won ? 'Continuar' : 'Intentar de nuevo' }}
        </button>
      </div>
    </div>

    <!-- Pokemon picture -->
    <PokemonPicture :pokemon-id="randomPokemon.id" :show-pokemon="isRoundOver" />

    <!-- Pokemon Options -->
    <PokemonOptions
      :pokemon-options="pokemonOptions"
      :block-selection="blockSelection"
      @selected-option="checkAnswer"
      :correct-answer="randomPokemon.id"
    />

    <PixelConfetti v-if="gameStatus === GameStatus.Won" />
  </main>
</template>

<script setup lang="ts">
import PixelConfetti from '@/modules/pokemon/components/PixelConfetti.vue'
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue'
import PokemonOptions from './PokemonOptions.vue'
import GameCounter from '../components/GameCounter.vue'
import { usePokemonGame } from '../composables/usePokemonGame.ts'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { GameStatus } from '../interfaces/game-status.enum.ts'

const PROGRESS_STEP = 10
const PROGRESS_INTERVAL_MS = 150

const {
  gameStatus,
  isLoading,
  randomPokemon,
  pokemonOptions,
  checkAnswer,
  blockSelection,
  getNextRound,
  gameCounter,
  bestScore,
} = usePokemonGame()

const isRoundOver = computed(
  () => gameStatus.value === GameStatus.Won || gameStatus.value === GameStatus.Lost,
)

const progress = ref(0)

let progressTimer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  progressTimer = setInterval(() => {
    progress.value = (progress.value + PROGRESS_STEP) % (100 + PROGRESS_STEP)
  }, PROGRESS_INTERVAL_MS)
})

onBeforeUnmount(() => clearInterval(progressTimer))
</script>

<style scoped>
/* `.framed` (CSS Game Boy, sin capa) fuerza width/max-width 100% y un margin-top que ganan a las
   utilidades de Tailwind: el modal se ajusta a su contenido y queda centrado por el flex padre. */
.round-modal {
  width: fit-content;
  max-width: 100%;
  margin: 0;
  /* Fuente fluida: a 16px "Puntuación final: 0" no cabe en una línea en un celular */
  font-size: clamp(0.7rem, 0.55rem + 1.1vw, 1rem);
}

@media (max-width: 500px) {
  .round-modal {
    border-width: 14px;
  }
}

.next-button:hover::before {
  top: calc(50% - 7px);
}

.next-button {
  font-size: clamp(0.75rem, 0.6rem + 1.2vw, 1rem);
}

@media (max-width: 480px) {
  .next-button {
    border-width: 14px;
  }
}
</style>
