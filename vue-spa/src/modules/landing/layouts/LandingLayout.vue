<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <header
      class="flex items-center h-14 px-4 py-2 border-b border-gray-300 sm:h-20 sm:py-3 md:px-6 lg:px-8"
    >
      <div>
        <a class="flex items-center gap-2 font-semibold" href="#">
          <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="40" height="40" />
        </a>
      </div>
      <nav class="ml-auto space-x-2 flex items-center h-10 sm:space-x-3">
        <div class="space-x-2">
          <RouterLink :to="{ name: 'home' }"> Home </RouterLink>
          <RouterLink to="/features"> Features </RouterLink>
          <RouterLink to="/pricing"> Pricing </RouterLink>
          <RouterLink to="/contact"> Contact </RouterLink>
          <RouterLink to="/pokemon/1"> Pokemons </RouterLink>
        </div>
        <div class="border-4 border-blue-500 rounded-3xl px-3 py-2">
          <RouterLink to="/login"> Login </RouterLink>
        </div>
      </nav>
    </header>
    <!-- Fin Header -->

    <!-- Main -->
    <main class="flex-1 flex items-center justify-center">
      <RouterView />
    </main>
    <!-- Fin Main -->

    <!-- Footer -->
    <footer class="flex items-center h-14 px-4 border-t border-gray-300 sm:h-16 md:px-6 lg:px-8">
      <p class="flex-1 text-sm text-gray-500 text-center">
        © {{ new Date().getFullYear() }} Acme Corporation. Derechos reservados
      </p>
    </footer>
    <!-- Fin Footer -->
  </div>
</template>
