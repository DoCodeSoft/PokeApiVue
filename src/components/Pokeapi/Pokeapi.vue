
<style lang="scss" src="./Pokeapi.scss" scoped></style>
<template src="./Pokeapi.html"></template>

<script>
// @ is an alias to /src
import axios from "axios"
import firebase from 'firebase/app'
import 'firebase/auth'
import Head from '@/components/Head.vue'

import { mapActions } from 'vuex'

    export default {
        name: 'Pokeapi',
        data() {
            return {
                titulo: "Pokeapi - Demo",
                pokemones: []
            }
        },
        mounted() {
        },
        created() {
            this.obtenerApi()
        },
        methods: {
            ...mapActions([
                'POKEMON',
                'CARGANDO'
            ]),
            verMas(p) {
                this.POKEMON(p)
                this.$router.replace('/detalle') // Detalle
            },
            obtenerApi() {
                this.CARGANDO(true)
                let url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=250'
                axios.get(url)
                .then((result) => {
                    let urls = []
                    result.data.results.forEach(el => {
                        urls.push(el.url)
                    })
                    this.nuevoObtener(urls)
                })
                .catch((err) => {
                    console.log(err)
                })
            },
            nuevoObtener(urls) {
                let respuesta = []
                urls.forEach( url =>{
                    respuesta.push(axios.get(url))
                })
                Promise.all(respuesta).then((valores)=>{
                    this.obtenerDetalle(valores)
                    this.CARGANDO(false)
                })
            },
            obtenerDetalle(valores) {
                valores.forEach((poketodo)=>{
                    let pokemon = poketodo.data
                    let obj = {
                            id: pokemon.id,
                            nombre: pokemon.name,
                            peso: pokemon.weight,
                            imgFront: pokemon.sprites.front_default,
                            imgBack: pokemon.sprites.back_default,
                            moves: this.obtenerTecnicas(pokemon.moves)
                        }
                    this.pokemones.push(obj)
                })
            },obtenerTecnicas(moves) {
                let movesFinal = []
                let i = 0
                for (i; i < 4; i++) {
                    let id = Math.floor(Math.random() * moves.length)
                    movesFinal.push(moves[id].move.name)
                }
                return movesFinal
            }
        },
        components: {
            Head
        }
    }

</script>