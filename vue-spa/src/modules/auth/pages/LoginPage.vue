<template>
  <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
    <h1 class="text-2xl font-semibold mb-4">Login</h1>
    <form>
      <!-- Username Input -->
      <div class="mb-4">
        <label for="username" class="block text-gray-600">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autocomplete="off"
        />
      </div>
      <!-- Password Input -->
      <div class="mb-4">
        <label for="password" class="block text-gray-600">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autocomplete="off"
        />
      </div>
      <!-- Remember Me Checkbox -->
      <div class="mb-4 flex items-center">
        <input type="checkbox" id="remember" name="remember" class="text-blue-500" />
        <label for="remember" class="text-gray-600 ml-2">Remember Me</label>
      </div>
      <!-- Login Button -->
      <button
        @click="onLogin"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
      >
        Login
      </button>
    </form>
    <!-- Sign up  Link -->
    <div class="mt-6 text-blue-500 text-center">
      <RouterLink :to="{ name: 'register' }" class="hover:underline">Sign up Here</RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const onLogin = () => {
  localStorage.setItem('userId', 'ABC-123');

  const lastPath = localStorage.getItem('lastPath') ?? '/';

  router.replace(lastPath);
};
</script>
