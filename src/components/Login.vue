<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-3xl font-bold mb-4 text-center text-blue-600">Login</h2>

      <!-- Email Input -->
      <input 
        v-model="email" 
        placeholder="Email" 
        class="mb-4 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <!-- Password Input -->
      <input 
        type="password" 
        v-model="password" 
        placeholder="Password" 
        class="mb-4 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <!-- Login Button -->
      <button @click="loginWithEmail" class="w-full p-3 bg-blue-600 text-white rounded-lg">Login</button>

      <!-- Sign Up Link -->
      <p class="text-center mt-4 text-gray-600">
        Don't have an account? <router-link to="/signup" class="text-blue-500">Sign Up</router-link>
      </p>

      <!-- Google Sign-In Button -->
      <div class="mt-6 text-center">
        <button @click="handleGoogleSignIn" class="w-full p-3 bg-red-600 text-white rounded-lg">
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { login, loginWithGoogle as googleLogin, getRedirectResult, auth } from '../firebase'; // Correct import

const email = ref('');
const password = ref('');
const store = useStore();
const router = useRouter();

// Function to handle email login
const loginWithEmail = async () => {
  try {
    await login(email.value, password.value);
    // Optionally dispatch a login action if needed
    
    router.push('/chat');
  } catch (error) {
    console.error('Error signing in with email and password:', error.message);
    alert('Error signing in with email and password: ' + error.message);
  }
};

// Function to handle Google sign-in
const handleGoogleSignIn = async () => {
  try {
    await googleLogin();
    // Handle the result of Google sign-in (e.g., redirect to chat page)
    router.push('/chat');
  } catch (error) {
    console.error('Error signing in with Google:', error.message);
    alert('Error signing in with Google: ' + error.message);
  }
};

// Handle Google sign-in redirect result
const handleGoogleRedirect = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result && result.user) {
      console.log('Google sign-in successful:', result.user);
      await store.dispatch('setUser', result.user);
      router.push('/chat');
    } else {
      console.log('No result from Google sign-in redirect.');
    }
  } catch (error) {
    console.error('Error during Google sign-in redirect:', error.message);
  }
};

// Call handleGoogleRedirect when the component is mounted
onMounted(handleGoogleRedirect);
</script>
