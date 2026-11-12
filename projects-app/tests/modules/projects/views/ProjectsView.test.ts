import FabButton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import { useProjectsStore } from '@/modules/projects/store/projects.store';
import ProjectsView from '@/modules/projects/views/ProjectsView.vue';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { projectsFake } from '../../../mocks/projects.fake';

describe('ProjectsView', () => {
  const mountView = () => {
    const pinia = createTestingPinia({ stubActions: false });

    // El store se crea con el pinia de testing y se llena antes de montar
    const store = useProjectsStore(pinia);
    store.$patch({ projects: structuredClone(projectsFake) });

    const wrapper = mount(ProjectsView, {
      global: { plugins: [pinia] },
    });

    return { wrapper, store };
  };

  beforeEach(() => {
    localStorage.clear();
  });

  test('should be render with projects', () => {
    const tableRows = mountView().wrapper.findAll('tbody tr');

    expect(tableRows.length).toBe(3);

    tableRows.forEach((row, index) => {
      const project = projectsFake[index];
      const cell = row.findAll('td');
      expect(cell[0]?.text()).toBe(project?.name);
      expect(cell[1]?.text()).toBe(project?.tasks.length.toString());
    });
  });

  test('should call addProject method on modal', () => {
    const { wrapper, store } = mountView();
    const inputModal = wrapper.findComponent({ name: 'InputModal' });
    const newProjectName = 'New Project';

    inputModal.vm.$emit('value', newProjectName);

    expect(store.addProject).toHaveBeenCalledWith(newProjectName);
  });

  test('should', () => {});
});
