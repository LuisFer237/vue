<template>
  <div class="w-full pl-6 pt-4">
    <section>
      <BreadCrumbs :name="project?.name ?? 'No name'"></BreadCrumbs>
    </section>
    <section>
      <div class="overflow-x-auto mt-4">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th class="w-14">Completada</th>
              <th>Nombre</th>
              <th>Completada en</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in tasks" :key="task.id" class="hover:bg-base-300">
              <th>
                <input
                  type="checkbox"
                  :checked="!!task.completedAt"
                  class="checkbox checkbox-primary"
                  @change="projectStore.toggleTask(props.id, task.id)"
                />
              </th>
              <td>{{ task.name }}</td>
              <td>{{ task.completedAt }}</td>
            </tr>
            <tr class="hover:bg-base-300">
              <th></th>
              <td>
                <form method="" @submit.prevent="submitTask">
                  <input
                    type="text"
                    class="input input-primary w-full opacity-60 transition-all hover:opacity-100 focus:opacity-100"
                    placeholder="Nueva tarea"
                    v-model="taskName"
                  />
                </form>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue';
import { useProjectsStore } from '../store/projects.store';
import { watch, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

interface Props {
  id: string;
}

const router = useRouter();
const props = defineProps<Props>();
const projectStore = useProjectsStore();
const project = computed(() => projectStore.getProjectById(props.id));
const tasks = computed(() => project.value?.tasks ?? []);
const taskName = ref();

watch(
  () => props.id,
  () => {
    if (!project.value) {
      router.replace('/');
    }
  },
  {
    immediate: true,
  },
);

const submitTask = () => {
  console.log(taskName.value);
  if (!taskName.value) {
    return;
  }

  projectStore.addTaskToProject(taskName.value, props.id);
  taskName.value = '';
};
</script>
