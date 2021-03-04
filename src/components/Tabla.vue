<template>
    <div>
        <Head></Head>
        <h2>{{ titulo }}</h2>
        <hr>
        <div class="tabla">
            <vue-bootstrap4-table :rows="registros" :columns="columns" :config="config" :actions="actions" @editar="editar" @eliminar="eliminarEntrenador">

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
import Head from '@/components/Head.vue'

    export default {
        name: "Tabla",
        data() {
            return {
                titulo: "Tabla",
                registros: [
                    {id:45, nombre:"Mario", nivel:"90"},
                    {id:67, nombre:"Alex", nivel:"95"},
                    {id:22, nombre:"Ash K.", nivel:"100"},
                ],
                // Tabla
                columns: [
                    {label: "Folio",name: "id"},
                    {label: "Nombre",name: "nombre"},
                    {label: "Nivel",name: "nivel"},
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
                    card_title: "Entrenadores Pokemon",
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
                // Tabla
            }
        },
        methods: {
            eliminarEntrenador(payload) {
                    if(payload.selectedItems.length){
                        this.$swal({
                        title: "Alerta!!",
                        text: "Deseas eliminar registros seleccionados",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            payload.selectedItems.forEach(el => {
                                this.registros.splice(this.registros.findIndex((item) => {
                                    item.id === el.id
                                }),1)
                            })
                            this.$swal("Exito!","Registros eliminados",'success')
                        }
                    })
                }else{
                    this.$swal("Alerta!!","Seleccionar registros",'warning')
                }
            },
            editar(){}
        },
        components: {
            Head,
            VueBootstrap4Table
        }
    }
</script>

<style lang="scss" scoped>

</style>