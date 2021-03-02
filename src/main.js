import Vue from 'vue'
import App from './App.vue'
import router from './router'
// Se agrega Vuex al proyecto
import store from './store'

// Notificaciones Swal (https://sweetalert.js.org/)
import VueSwal from 'vue-swal'
Vue.use(VueSwal)

// Libreria de Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/storage'
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyADI8UuZMGaHWeqnpSySA49sDCy06Ll4s4",
  authDomain: "pokeapi-db413.firebaseapp.com",
  projectId: "pokeapi-db413",
  storageBucket: "pokeapi-db413.appspot.com",
  messagingSenderId: "547932804114",
  appId: "1:547932804114:web:6969e7ec6d433bb46234cb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()

// Get Api Token (dcam-valleverde)
// import { _token, firebase_config } from './_main.js'

// Libreria bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// Libreria fontawesome
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

// Custom Spinners
import 'spinkit/spinkit.min.css'


firebase.auth().onAuthStateChanged(function (user){
  // Vue.prototype.$token = _token.replace(/ +/g, "")
  Vue.prototype.$storage = storage // Agregar firestore $fstorage
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })  
})
