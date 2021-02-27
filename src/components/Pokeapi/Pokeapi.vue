
<style lang="scss" src="./Pokeapi.scss" scoped></style>
<template src="./Pokeapi.html"></template>

<script>
// @ is an alias to /src
import axios from "axios"

    export default {
        name: 'Pokeapi',
        data() {
            return {
                titulo: "Pokeapi - Demo",
                mostrar: false,
                pokemones: []
            }
        },
        created() {
            this.obtenerApi()
        },
        methods: {
            obtenerApi() {
                let url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10'
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
                    this.obtenerDetalle2(valores)
                })
            },
            obtenerDetalle2(valores) {
                valores.forEach((poketodo)=>{
                    let pokemon = poketodo.data
                    let obj = {
                            id: pokemon.id,
                            nombre: pokemon.name,
                            peso: pokemon.weight,
                            imgFront: pokemon.sprites.front_default,
                            imgBack: pokemon.sprites.back_default,
                            moves: this.obtenerTecnicas2(pokemon.moves)
                        }
                    this.pokemones.push(obj)
                })
                
                
            },obtenerTecnicas2(moves) {
                let movesFinal = []
                try {
                    let i = 0
                    for (i; i < 4; i++) {
                        let id = Math.floor(Math.random() * moves.length)
                        movesFinal.push(moves[id].move.name)
                    }
                } catch (error) {
                console.error(error)
                }
                return movesFinal
            }
        },
    }

</script>