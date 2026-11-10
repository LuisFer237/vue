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
        <tr
          v-for="(project, index) in projectsStore.projectsWithCompletion"
          :key="project.id"
          class="hover:bg-base-300"
        >
          <th>{{ index + 1 }}</th>
          <td>{{ project.name }}</td>
          <td>{{ project.tasks.length }}</td>
          <td class="flex space-x-2">
            <progress
              class="progress progress-primary w-56"
              :value="project.completion"
              max="100"
            ></progress>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <InputModal
    :open="modalOpen"
    @close="modalOpen = false"
    @value="projectsStore.addProject"
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
import { useProjectsStore } from '../store/projects.store';

const modalOpen = ref(false);
const customModalOpen = ref(false);

const projectsStore = useProjectsStore();
</script>
