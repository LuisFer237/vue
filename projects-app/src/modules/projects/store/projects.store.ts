import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Project, Task } from '../interfaces/project.interface';
import { v4 as uuid } from 'uuid';
import { useLocalStorage } from '@vueuse/core';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', []));
  const tasks = ref(useLocalStorage<Task[]>('tasks', []));

  const addProject = (name: string) => {
    if (name.length === 0) return;

    projects.value.push({
      id: uuid(),
      name: name,
      tasks: [],
    });
  };

  const getProjectById = (id: string) => {
    return projects.value.find((project) => project.id === id);
  };

  const addTaskToProject = (name: string, id: string) => {
    if (name.length === 0) return;

    const project = getProjectById(id);
    if (!project) return;

    project.tasks.push({
      id: uuid(),
      name,
      completedAt: undefined,
    });
  };

  const toggleTask = (projectId: string, taskId: string) => {
    const project = projects.value.find((p) => p.id === projectId);
    if (!project) return;

    const task = project.tasks.find((t) => t.id === taskId);
    if (!task) return;

    task.completedAt = task.completedAt ? undefined : new Date();
  };

  return {
    // Properties
    projects,
    tasks,

    //Getters
    projectList: computed(() => [...projects.value]),
    taskList: computed(() => [...tasks.value]),

    noProjects: computed(() => projects.value.length === 0),
    projectsWithCompletion: computed(() => {
      return projects.value.map((project) => {
        const taskCount = project.tasks.length;
        const completedCount = project.tasks.filter((task) => !!task.completedAt).length;
        const completion = taskCount === 0 ? 0 : (completedCount / taskCount) * 100;

        return { ...project, taskCount, completedCount, completion };
      });
    }),

    //Actions
    addProject,
    addTaskToProject,
    getProjectById,
    toggleTask,
  };
});
