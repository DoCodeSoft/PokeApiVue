import Vue from 'vue'
import VueRouter from 'vue-router'

import Demo from '../components/Demo/Demo.vue'
import Home from '../components/Home.vue'
import Login from '../components/Login/Login.vue'
import Tablez from '../components/Table.vue'
import Pokeapi from '../components/Pokeapi/Pokeapi.vue'
import Loginp from '../components/Loginp/Loginp.vue'
import PokeapiH from '../components/PokeapiH/PokeapiH.vue'
import Detalle from '../components/Detalle.vue'
import Tabla from '../components/Tabla.vue'

import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(VueRouter)

const routes = [
  {path: '/',name: 'PokeapiH',component: PokeapiH, meta: {autenticado: true}},
  {path: '/pokedex',name: 'Pokeapi',component: Pokeapi, meta: {autenticado: true}},
  {path: '/detalle',name: 'Detalle',component: Detalle, meta: {autenticado: true}},
  {path: '/loginp',name: 'Loginp',component: Loginp},
  {path: '/demo',name: 'Demo',component: Demo},
  {path: '/login',name: 'Login',component: Login},
  {path: '/table',name: 'Table',component: Tablez},
  {path: '/tabla',name: 'Tabla',component: Tabla}

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