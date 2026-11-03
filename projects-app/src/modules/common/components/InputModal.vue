<template>
  <dialog id="my_modal_1" class="modal" :open="props.open">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ title ?? 'Titulo' }}</h3>
      <p class="">{{ subtitle ?? 'Subtitle' }}</p>
      <div class="modal-action flex flex-col">
        <form method="dialog" @submit.prevent="submitValue">
          <input
            ref="inputRef"
            v-model="inputValue"
            type="text"
            :placeholder="placeholder ?? 'Ingresa un valor'"
            class="input input-bordered input-primary w-full flex-1"
          />
          <!-- if there is a button in form, it will close the modal -->
          <div class="flex justify-end mt-5 space-x-2">
            <button @click="emits('close')" class="btn">Cerrar</button>
            <button class="btn btn-primary">Aceptar</button>
          </div>
        </form>
      </div>
    </div>
  </dialog>

  <div
    v-if="props.open"
    class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-50 w-screen h-screen"
  ></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface Props {
  open: boolean;
  placeholder: string;
  title: string;
  subtitle?: string;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  close: [void];
  value: [text: string];
}>();

const inputValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

const submitValue = () => {
  console.log(inputValue.value);
  if (!inputValue.value) {
    inputRef.value?.focus();
    return;
  }

  emits('value', inputValue.value.trim());
  emits('close');

  inputValue.value = '';
};
</script>
