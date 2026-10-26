<template>
  <section class="framed neutral">
    <ul class="buttons">
      <li v-for="{ name, id } in pokemonOptions" :key="name">
        <button
          :key="id"
          type="button"
          :class="[
            'disabled:text-red-500',
            {
              correct: id === correctAnswer && blockSelection,
              incorrect: id !== correctAnswer && blockSelection,
            },
          ]"
          @click="$emit('selectedOption', id)"
          :disabled="blockSelection"
        >
          {{ name }}
        </button>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import type { Pokemon } from '../interfaces'

interface Props {
  pokemonOptions: Pokemon[]
  blockSelection: boolean
  correctAnswer: number
}

defineProps<Props>()

defineEmits<{
  selectedOption: [id: number]
}>()
</script>

<style scoped>
/* Estos estilos van aquí (no en utilidades de Tailwind) porque el CSS Game Boy no está en una
   capa y pisaría a las utilidades con la misma propiedad. */
section {
  width: 100%;
  /* Card compacto y centrado, sin ocupar todo el ancho */
  max-width: 20rem;
  margin-inline: auto;
}

ul.buttons {
  width: 100%;
}

ul.buttons li {
  margin: 0.25em;
}

/* Con padding-block la flecha del hover (top: 0) quedaría por encima del texto: se centra */
button:hover::before {
  top: calc(50% - 7px);
}

button {
  /* Área táctil cómoda y tipografía fluida; el padding-left de la flecha se conserva */
  padding-block: 0.3em;
  font-size: clamp(0.8125rem, 0.7rem + 1.1vw, 1rem);
  overflow-wrap: anywhere;
}

/* El marco de 21px come demasiado espacio en pantallas pequeñas */
@media (max-width: 480px) {
  section.framed {
    border-width: 14px;
    padding: 0.25em;
  }
}
</style>
