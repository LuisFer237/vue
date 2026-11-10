<template>
  <aside class="bg-base-200 w-56 shrink-0 min-h-screen">
    <h2 class="text-lg font-bold mx-4 mt-2 mb-1">Proyectos</h2>
    <p v-if="projectsStore.noProjects" class="text-sm text-gray-500 mx-4">No hay proyectos</p>

    <!-- Menu -->
    <ul class="menu bg-base-200 rounded-box w-full" v-else>
      <li v-for="project in projectsStore.projectList" :key="project.id">
        <template v-if="project.tasks.length">
          <details>
            <summary>{{ project.name }}</summary>
            <ul>
              <li v-for="task in project.tasks" :key="task.id">
                <RouterLink :to="`/project/${project.id}`">
                  {{ task.name }}
                </RouterLink>
              </li>
            </ul>
          </details>
        </template>

        <RouterLink v-else :to="`/project/${project.id}`">
          {{ project.name }}
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { useProjectsStore } from '../store/projects.store';

const projectsStore = useProjectsStore();
</script>
