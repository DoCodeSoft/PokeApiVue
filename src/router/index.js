import Vue from 'vue'
import VueRouter from 'vue-router'

import Demo from '../components/Demo/Demo.vue'
import Home from '../components/Home.vue'
import Login from '../components/Login/Login.vue'
import Tablez from '../components/Table.vue'
import Pokeapi from '../components/Pokeapi/Pokeapi.vue'

Vue.use(VueRouter)

  const routes = [
  {path: '/',name: 'Pokeapi',component: Pokeapi},
  {path: '/demo',name: 'Demo',component: Demo},
  {path: '/login',name: 'Login',component: Login},
  {path: '/table',name: 'Table',component: Tablez}
]

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  base: __dirname,
  routes
})
export default router