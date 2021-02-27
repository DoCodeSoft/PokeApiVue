<template>
    <div :key="componentKey">
        <!-- Modal  -->
        <div v-if="modalEliminar">
            <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Eliminar Datos</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" @click="modalEliminar = false">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h4>¿Deseas eliminar los elementos?</h4>
                        <hr>
                        <li v-for="sel in seleccion" :key="sel.id" >{{sel.Nombre_Cliente}}</li>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="modalEliminar = false">Cerrar</button>
                        <button type="button" class="btn btn-danger" @click="eliminar">Eliminar</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </transition>
        </div>
        <!-- Modal  -->

        <h2 class="centro">{{titulo}}</h2>
        <div class="tabla">
            <vue-bootstrap4-table :rows="registros" :columns="columns" :config="config" :actions="actions" @editar="editarR" @eliminar="eliminarR">
            
            <template slot="Estatus" slot-scope="props">
                <span v-if="props.cell_value == '1'" class="pros">Prospecto</span>
                <span v-if="props.cell_value == '2'" class="lead">Lead</span>
                <span v-if="props.cell_value == '3'" class="cliente">Cliente</span>
            </template>

            <template slot="pagination-info" slot-scope="props">
                Resultados {{props.filteredRowsLength}} |
                Registros Totales {{props.originalRowsLength}}
            </template>

            </vue-bootstrap4-table>
        </div>
    </div>
</template>

<script>
import VueBootstrap4Table from 'vue-bootstrap4-table'
import axios from "axios";

import { mapActions } from 'vuex' // Mapear Actions de Vuex

    export default {
        name: 'Table',
        data: function() {
            return {
                titulo: 'Table',
                componentKey: 1,
                modalEliminar: false,
                registros: [],
                seleccion: [],
                columns: [
                    {label: "Ingreso",name: "FechaIngreso"},
                    {label: "Encargado",name: "vendedor"},
                    {label: "Cliente",name: "Nombre_Cliente"},
                    {label: "Correo",name: "Correo"},
                    {label: "Estado",name: "Estatus"},
                ],
                actions: [
                    {
                        btn_text: "Editar",
                        event_name: "editar",
                        class: "btn btn-primary my-custom-class"
                    },
                    {
                        btn_text: "Eliminar",
                        event_name: "eliminar",
                        class: "btn btn-danger my-custom-class"
                    }
                ],
                config: {
                    checkbox_rows: true,
                    rows_selectable: true,
                    card_title: "Registros",
                    show_refresh_button: false,
                    show_reset_button: false,
                    per_page: 10, // default 10,
                    highlight_row_hover_color:"lightblue",
                    per_page_options: [10],
                    global_search: {
                        placeholder: "Buscar",
                        visibility: true,
                        case_sensitive: false
                    }
                }
            }
        },
        created() {
           this.obtenerDatos()
        },
        methods: {
            ...mapActions([
                'CARGANDO'
            ]),
            obtenerDatos() {
                this.CARGANDO(true)
                axios.get("https://dcam-cotizador.herokuapp.com/clientes", {
                    headers: {
                        'Authorization': 'Token d5f47214304548648fb66c88c58f6dabf8cccff8'
                    }
                }).then((result) => {
                    this.registros = result.data;
                    this.CARGANDO(false)
                }).catch(err => console.log(err));
            },
            editarR(payload) {
                if(payload.selectedItems.length > 0){
                    if(payload.selectedItems.length < 2){
                        this.seleccion = payload.selectedItems[0]
                        // Ajustar datos y abrir modal
                        console.log(this.seleccion)
                    }else{
                        this.$swal("Alerta!", "Seleccionar solo 1 registro", "warning")
                    }
                }else{
                    this.$swal("Sin Seleccion!", "Seleccione Registros", "warning")
                }
            },
            eliminarR(payload) {
                if(payload.selectedItems.length > 0){
                    this.seleccion = payload.selectedItems
                    this.modalEliminar = true
                }else{
                    this.$swal("Sin Seleccion!", "Seleccione Registros", "warning")
                }
            },
            eliminar() {
                // Proceso para eliminar registros
                this.modalEliminar = false
                this.tablaUpdate()
                this.$swal("Listo!", "Dato Eliminado (en realidad no!)", "success")
            },
            tablaUpdate(){
                this.seleccion = []
                this.obtenerDatos()
                this.componentKey += 1;
            },
        },
        components: {
            VueBootstrap4Table
        }
    }
</script>

<style lang="scss" scoped>
#titulo {
    text-align-last: center;
}
.centro {
    text-align-last: center;
}
.pros {
    color: blue;
}
.lead {
    color: orange;
}
.cliente {
    color: rgb(0, 199, 0);
}

// Estilos para el modal
.modal-mask {
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

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>