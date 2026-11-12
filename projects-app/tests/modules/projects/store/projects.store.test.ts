import { useProjectsStore } from '@/modules/projects/store/projects.store';
import { createPinia, setActivePinia } from 'pinia';
import { projectsFake } from '../../../mocks/projects.fake';

describe('Projects Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  test('should return default values', () => {
    const {
      noProjects,
      addProject,
      addTaskToProject,
      projectList,
      projects,
      taskList,
      tasks,
      projectsWithCompletion,
      toggleTask,
    } = useProjectsStore();

    expect(noProjects).toBe(true);
    expect(projectList).toEqual([]);
    expect(projects).toEqual([]);
    expect(taskList).toEqual([]);
    expect(projectsWithCompletion).toEqual([]);
    expect(toggleTask).toBeInstanceOf(Function);
    expect(addTaskToProject).toBeInstanceOf(Function);
    expect(addProject).toBeInstanceOf(Function);
  });

  test('add a project - action', () => {
    const store = useProjectsStore();

    store.addProject('New Project');

    expect(store.projects.length).toBe(1);
    expect(store.projects[0]).toEqual({
      id: expect.any(String),
      name: 'New Project',
      tasks: [],
    });
  });

  test('should load from local storage', () => {
    localStorage.setItem('projects', JSON.stringify(projectsFake));

    const store = useProjectsStore();
    const [project1, project2] = store.projects;

    expect(project1).toEqual(JSON.parse(JSON.stringify(projectsFake[0])));
    expect(project2).toEqual(JSON.parse(JSON.stringify(projectsFake[1])));
  });

  test('add task to a project', () => {
    const store = useProjectsStore();
    store.addProject('New project');
    const project = store.projects[0];
    const taskName = 'New task';

    store.addTaskToProject(taskName, project.id);

    expect(project?.tasks.length).toBe(1);
    expect(project.tasks[0]).toEqual({
      id: expect.any(String),
      name: taskName,
      completedAt: undefined,
    });
  });

  test('toggles a task', () => {
    const store = useProjectsStore();
    store.addProject('New project');
    const project = store.projects[0];
    const taskName = 'New task';

    store.addTaskToProject(taskName, project.id);
    const task = project?.tasks[0]!;

    store.toggleTask(project?.id, task.id);

    expect(project.tasks[0]).toEqual({
      id: expect.any(String),
      name: taskName,
      completedAt: expect.any(Date),
    });

    expect(task.completedAt).toBeInstanceOf(Date);
  });

  test('should return the projects with completion', () => {
    const store = useProjectsStore();
    store.$patch((state) => {
      state.projects = projectsFake;
    });

    expect(store.projectsWithCompletion).toEqual([
      {
        ...projectsFake[0],
        taskCount: 4,
        completedCount: 2,
        completion: 50,
      },
      {
        ...projectsFake[1],
        taskCount: 0,
        completedCount: 0,
        completion: 0,
      },
      {
        ...projectsFake[2],
        taskCount: 2,
        completedCount: 1,
        completion: 50,
      },
    ]);
  });
});
