// Node 25 expone un `localStorage` global sin métodos (Web Storage experimental, sin archivo),
// que tapa al de jsdom. Se reemplaza por uno en memoria para que los tests sean deterministas.
const createMemoryStorage = (): Storage => {
  const store = new Map<string, string>()

  return {
    get length() {
      return store.size
    },
    clear: () => store.clear(),
    getItem: (key) => store.get(key) ?? null,
    key: (index) => [...store.keys()][index] ?? null,
    removeItem: (key) => {
      store.delete(key)
    },
    setItem: (key, value) => {
      store.set(key, String(value))
    },
  }
}

vi.stubGlobal('localStorage', createMemoryStorage())

// Cada test empieza sin datos guardados por otros tests
beforeEach(() => {
  localStorage.clear()
})
