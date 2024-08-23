<template>
  <div class="flex items-center justify-center h-screen bg-blue-600 text-white">
    <div class="text-center">
      <h1 class="text-5xl font-bold mb-4">Welcome to Let's Chat</h1>
      <p class="text-lg mb-8">A modern chat application built with Vue, Firebase, and Tailwind CSS.</p>
      <router-link to="/login" class="bg-white text-blue-600 py-2 px-4 rounded-full shadow-lg sm:mr-4">Login</router-link>
      <router-link to="/signup" class="bg-white text-blue-600 py-2 px-4 rounded-full shadow-lg">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>
