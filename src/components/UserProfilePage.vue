<template>
    <div class="flex items-center justify-center h-screen bg-gray-200">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 class="text-2xl font-bold mb-4 text-blue-600">User Profile</h2>
        <img :src="userProfile.avatarUrl" alt="Avatar" class="w-24 h-24 rounded-full mx-auto mb-4"/>
        <input type="file" @change="uploadAvatar" class="mb-4" />
        <button @click="updateProfile" class="w-full p-3 bg-blue-600 text-white rounded-lg">Update Profile</button>
        <router-link to="/chat" class="block mt-4 text-blue-500">Back to Chat</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { getAuth } from 'firebase/auth';
  import { getFirestore, doc, updateDoc } from 'firebase/firestore';
  import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
  
  export default {
    data() {
      return {
        userProfile: {
          avatarUrl: '',
        },
        selectedFile: null,
      };
    },
    methods: {
      async uploadAvatar(event) {
        const file = event.target.files[0];
        if (file) {
          const storage = getStorage();
          const avatarRef = storageRef(storage, `avatars/${file.name}`);
          const snapshot = await uploadBytes(avatarRef, file);
          const downloadURL = await getDownloadURL(snapshot.ref);
  
          this.userProfile.avatarUrl = downloadURL;
        }
      },
      async updateProfile() {
        const auth = getAuth();
        const user = auth.currentUser;
  
        const db = getFirestore();
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          avatarUrl: this.userProfile.avatarUrl,
        });
      },
    },
  };
  </script>
  