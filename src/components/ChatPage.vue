<template>
    <div class="flex flex-col h-screen bg-gray-200">
      <header class="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold">Chat</h1>
        <router-link to="/profile" class="text-white">Profile</router-link>
      </header>
  
      <div class="flex-1 overflow-y-auto p-4">
        <div v-for="message in messages" :key="message.id" class="mb-4">
          <div class="p-3 rounded-lg bg-white shadow-md max-w-xs">
            <p class="text-gray-900">{{ message.text }}</p>
            <img v-if="message.imageUrl" :src="message.imageUrl" alt="Image" class="mt-2 rounded-lg" />
          </div>
        </div>
      </div>
  
      <div class="flex items-center p-4 border-t bg-white">
        <input 
          v-model="newMessage" 
          @keyup.enter="sendMessage" 
          placeholder="Type a message" 
          class="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input type="file" @change="uploadImage" class="ml-4" />
        <button @click="sendMessage" class="ml-4 p-3 bg-blue-600 text-white rounded-lg">Send</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { getFirestore, collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
  import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
  
  export default {
    data() {
      return {
        messages: [],
        newMessage: '',
        selectedFile: null,
      };
    },
    methods: {
      async sendMessage() {
        if (this.newMessage.trim() === '') return;
  
        const db = getFirestore();
        await addDoc(collection(db, 'messages'), {
          text: this.newMessage,
          createdAt: new Date(),
        });
        this.newMessage = '';
      },
      async uploadImage(event) {
        const file = event.target.files[0];
        if (file) {
          const storage = getStorage();
          const storageRef = storageRef(storage, `images/${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(snapshot.ref);
  
          const db = getFirestore();
          await addDoc(collection(db, 'messages'), {
            imageUrl: downloadURL,
            createdAt: new Date(),
          });
        }
      },
    },
    mounted() {
      const db = getFirestore();
      const q = query(collection(db, 'messages'), orderBy('createdAt'));
      onSnapshot(q, (snapshot) => {
        this.messages = snapshot.docs.map(doc => doc.data());
      });
    },
  };
  </script>
  