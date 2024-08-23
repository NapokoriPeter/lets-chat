<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-3xl font-bold mb-4 text-center text-blue-600">Sign Up</h2>
      <input 
        v-model="email" 
        placeholder="Email" 
        class="mb-4 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input 
        type="password" 
        v-model="password" 
        placeholder="Password" 
        class="mb-4 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button @click="signup" class="w-full p-3 bg-blue-600 text-white rounded-lg">Sign Up</button>
      <p class="text-center mt-4 text-gray-600">
        Already have an account? <router-link to="/login" class="text-blue-500">Login</router-link>
      </p>
      <div class="mt-6 text-center">
        <button @click="signupWithGoogle" class="w-full p-3 bg-red-600 text-white rounded-lg">
          Sign up with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const email = ref('')
const password = ref('')
const store = useStore()
const router = useRouter()

async function signup() {
  try {
    await store.dispatch('signup', { email: email.value, password: password.value })
    router.push('/chat')
  } catch (error) {
    console.error('Signup failed:', error)
  }
}

async function signupWithGoogle() {
  try {
    await store.dispatch('loginWithGoogle')
    router.push('/chat')
  } catch (error) {
    console.error('Google signup failed:', error)
  }
}
</script>
