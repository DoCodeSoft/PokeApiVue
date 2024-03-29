import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        docode: "Proyecto DoCode Vue! [Uso-Vuex]",
        loading: false,
        usuarios_docode: {
            1:'Mario',
            2:'Elias',
            3: "Alex",
            4:'Bruno',
            5:'Daniel',
            6:'Marijo',
            7:'Rodrigo',
        },
        username: 0,
        pokemon: {}
    },
    mutations: {
        SET_USERNAME(state,username){
            state.username = username
        },
        SET_LOADING(state,status){
            state.loading = status
        },
        SET_POKEMON(state, obj){
            state.pokemon = obj
        }
    },
    actions: {
        GET_USERNAME(context, id) {
            let username = this.state.usuarios_docode[id] + " [Uso-Vuex]"
            context.commit('SET_USERNAME', username)
        },
        CARGANDO(context,estatus){
            context.commit('SET_LOADING', estatus)
        },
        POKEMON(context, obj){
            context.commit('SET_POKEMON',obj)
        }
    },
    getters: {
        docode: state => state.docode,
        username: state => state.username,
        //===================================
        loading: state => state.loading,
        pokemon: state => state.pokemon
    }
})
