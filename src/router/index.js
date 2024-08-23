import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import ChatPage from '../components/ChatPage.vue';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import UserProfilePage from '../components/UserProfilePage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/chat', component: ChatPage },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/profile', component: UserProfilePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
