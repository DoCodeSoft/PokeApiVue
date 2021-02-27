<template>
  <div>
    <!-- Spinner - Load -->
    <div v-if="loading" class="load-table-mask">
      <div class="load-table-wrap">
        <div class="d-flex justify-content-center">

          <!-- <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div> -->

          <div class="sk-chase">
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
          </div>
          
        </div>
      </div>
    </div>
    <!-- Spinner - Load -->
    <router-view/>
  </div>
</template>

<script>
// Import jQuery to use in all proyect
import * as jQuery from 'jquery';
window['jQuery'] = jQuery;

import { mapGetters } from 'vuex' // Mapear Getter de Vuex

export default {
  name: 'app',
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'loading'
    ])
  }
}
</script>

<style lang="scss">
// Load - Spinner
.load-table-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.load-table-wrap {
  display: table-cell;
  vertical-align: middle;
}
// Load - Spinner
.sk-chase {
  --sk-color: #d2ceff;
  --sk-size: 100px;
}
</style>
