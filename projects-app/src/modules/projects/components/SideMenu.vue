<template>
  <aside class="bg-base-200 w-fit min-h-screen">
    <h2 class="text-lg font-bold mx-4">Proyectos</h2>
    <p class="text-sm text-gray-500 mx-4">No hay proyectos</p>

    <!-- Menu -->
    <ul class="menu bg-base-200 rounded-box">
      <li><a>Item 1</a></li>
      <li>
        <details open>
          <summary>Parent</summary>
          <ul>
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
            <li>
              <details open>
                <summary>Parent</summary>
                <ul>
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </details>
      </li>
      <li><a>Item 3</a></li>
    </ul>
  </aside>
</template>

<script lang="ts" setup></script>
