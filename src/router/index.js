import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import Albums from "@/views/Albums";
import Artists from "@/views/Artists";
import SingleAlbum from "@/views/SingleAlbum";
import SingleArtist from "@/views/SingleArtist";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/albums',
    name: 'Albums',
    component: Albums
  },
  {
    path: '/artists',
    name: 'Artists',
    component: Artists
  },
  {
    path: '/album/:id',
    name: 'SingleAlbum',
    component: SingleAlbum
  },
  {
    path: '/artist/:id',
    name: 'SingleArtist',
    component: SingleArtist
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   component:
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
