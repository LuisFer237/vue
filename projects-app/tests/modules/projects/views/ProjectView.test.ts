import { useProjectsStore } from '@/modules/projects/store/projects.store';
import ProjectView from '@/modules/projects/views/ProjectView.vue';
import { mount } from '@vue/test-utils';
import type { Mock } from 'vitest';
import { useRouter } from 'vue-router';
import { projectsFake } from '../../../mocks/projects.fake';

vi.mock('vue-router');
vi.mock('@/modules/projects/store/projects.store');

describe('Project View', () => {
  test('should be render with a project', () => {
    const project = projectsFake[0];

    (useProjectsStore as unknown as Mock).mockReturnValue({
      getProjectById: vi.fn().mockReturnValue(project),
      toggleTask: vi.fn(),
      addTaskToProject: vi.fn(),
    });

    const wrapper = mount(ProjectView, {
      props: { id: '1' },
      global: { stubs: ['RouterLink'] },
    });

    const checkboxes = wrapper.findAll('input[type="checkbox"]');
    expect(checkboxes.length).toBe(projectsFake[0]?.tasks.length);
  });

  test('should redicrect to projects if projectId not found', () => {
    const replaceSpy = vi.fn();

    (useRouter as Mock).mockReturnValue({ replace: replaceSpy });
    (useProjectsStore as unknown as Mock).mockReturnValue({
      getProjectById: vi.fn().mockReturnValue(undefined),
      toggleTask: vi.fn(),
      addTaskToProject: vi.fn(),
    });

    mount(ProjectView, {
      props: { id: 'no-existe' },
      global: { stubs: ['RouterLink'] },
    });

    expect(replaceSpy).toHaveBeenCalledWith('/');
  });
});
