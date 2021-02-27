<template>
  <div id="app">
    <img width="100px" src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <!-- Las variables username y miTitulo son getters de vuex -->
    <h2>{{miTitulo}}</h2>
    <h3>Hola {{username}}</h3>
    <hr>
    <button class="btn btn-info">
      <router-link to="/login">Login</router-link>
    </button>
    <button class="btn btn-info">
      <router-link to="/demo">Demo</router-link>
    </button>
    <button class="btn btn-info">
      <router-link to="/table">Table</router-link>
    </button>
    <button @click="spinner" class="btn btn-info">Spinner</button>
    <Prueba></Prueba>
    <button @click="exito" class="btn btn-success">Alerta Exito</button>
    <button @click="alerta" class="btn btn-warning">Alerta - Alerta</button>

    <div id="datos_funciones">
      <h4>Font-Awesome</h4>
      <button class="btn btn-danger">fas fa-air-freshener = <span class="fas fa-air-freshener"></span></button>
      <button class="btn btn-success"><span class="fas fa-charging-station"></span></button>
      <button class="btn btn-danger"><span class="fas fa-angle-double-left"></span></button>
      <button class="btn btn-danger"><span class="fas fa-angle-double-right"></span></button>
      <h4>Toggle</h4>
      <bootstrap-toggle v-model="activo" data-width="20%" data-height="40" :options="{ on: '<i class=&quot;fa fa-check&quot;></i>', off: '<i class=&quot;fa fa-times&quot;></i>' }"/>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex' // Mapear Getter de Vuex
import { mapActions } from 'vuex' // Mapear Actions de Vuex

import Prueba from '@/components/Prueba.vue'
import BootstrapToggle from 'vue-bootstrap-toggle'

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Bienvenido a Vue.js',
      activo: true
    }
  },
  mounted() {
    // Monta un intervalo inicia en 1 hasta 6
    if(this.username == 0){
      let i = 1
      setInterval(() => {
        this.GET_USERNAME(i % 6 + 1) // Se actualiza el state
        ++i
      }, 1000)
    }
  },
  methods: {
    ...mapActions([
      'GET_USERNAME',
      'CARGANDO'
    ]),
    spinner() {
      this.CARGANDO(true)
      setInterval(() => {
        location.reload();
      }, 3000)
    },
    exito() {
      this.alerta_correcto("Información Correcta")
    },
    alerta() {
      this.alerta_alert("Información Incompleta")
    },
    // Metodo para mostrar Alertas Exito
    alerta_correcto(msj) {
    this.$swal("Listo!", msj, "success")
  },
  // Metodo para mostrar Alertas - Alerta
  alerta_alert(msj) {
    this.$swal("Alerta!", msj, "warning")
  },
  },
  computed: {
    ...mapGetters({
      miTitulo: 'docode'
    }),
    ...mapGetters([
      'username'
    ])
  },
  components: {
    Prueba,
    BootstrapToggle
  }
}
</script>

<style lang="scss" scope>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #000000;
}
</style>