import Vue from 'vue'
import VueRouter from 'vue-router'

import Demo from '../components/Demo/Demo.vue'
import Home from '../components/Home.vue'
import Login from '../components/Login/Login.vue'
import Tablez from '../components/Table.vue'
import Pokeapi from '../components/Pokeapi/Pokeapi.vue'
import Loginp from '../components/Loginp/Loginp.vue'

import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(VueRouter)

const routes = [
  {path: '/',name: 'Pokeapi',component: Pokeapi, meta: {autenticado: true}},
  {path: '/loginp',name: 'Loginp',component: Loginp},
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

router.beforeEach((to,from,next) => {
  let usuario = firebase.auth().currentUser
  let autorizacion = to.matched.some(record => record.meta.autenticado)
  
  if(autorizacion && !usuario){
    next('loginp')
  }
  else if(!autorizacion && usuario){
    next()
  }else{
    next()
  }
  
})

export default router