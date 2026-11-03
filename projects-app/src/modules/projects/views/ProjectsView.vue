<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Proyecto</th>
          <th>Tareas</th>
          <th>Avance</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-base-300">
          <th>2</th>
          <td>Hart Hagerty</td>
          <td>Desktop Support Technician</td>
          <td>Purple</td>
        </tr>
      </tbody>
    </table>
  </div>

  <InputModal
    :open="modalOpen"
    @close="modalOpen = false"
    title="Crear proyecto"
    subtitle="Momento de crear el proyecto!"
    placeholder="Ingresa el nombre del proyecto"
  >
  </InputModal>

  <CustomModal :open="customModalOpen">
    <template #header> <h1>Header</h1> </template>

    <template #body>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo dolore numquam saepe fugiat
        inventore culpa nostrum voluptates distinctio ab! Voluptatibus reprehenderit labore
        architecto nesciunt, exercitationem omnis. Quidem voluptatibus neque quia.
      </p>
    </template>

    <template #footer>
      <div class="flex justify-end space-x-2">
        <button @click="customModalOpen = false" class="btn">Cerrar</button>
        <button class="btn btn-primary">Aceptar</button>
      </div>
    </template>
  </CustomModal>

  <FabButton position="bottom-right" @click="modalOpen = true">
    <AddCircle />
  </FabButton>

  <FabButton position="bottom-left" @click="customModalOpen = true">
    <ModalIcon />
  </FabButton>
</template>

<script lang="ts" setup>
import CustomModal from '@/modules/common/components/CustomModal.vue';
import FabButton from '@/modules/common/components/FabButton.vue';
import AddCircle from '@/modules/common/components/icons/AddCircle.vue';
import ModalIcon from '@/modules/common/components/icons/ModalIcon.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import { ref } from 'vue';

const modalOpen = ref(false);
const customModalOpen = ref(false);
</script>
