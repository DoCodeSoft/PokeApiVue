
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
            obtenerApiold() {
                let url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10'
                axios.get(url)
                .then((result) => {
                    let urls = []
                    result.data.results.forEach(el => {
                        urls.push(el.url)
                    })
                    this.obtenerDetalle(urls)
                })
                .catch((err) => {
                    console.log(err)
                })
            },
            obtenerApi() {
                let url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10'
                axios.get(url)
                .then((result) => {
                    let urls = []
                    result.data.results.forEach(el => {
                        urls.push(el.url)
                    })
                    this.obtenerDetalle(urls)
                })
                .catch((err) => {
                    console.log(err)
                })
            },
            nuevoObtener(urls) {
                let rt = []
                urls.forEach( url => {
                    this.obtenerDetalle2(url)
                })
                
            },
            obtenerDetalle2(url) {
                let respuesta = []
                respuesta.push(axios.get(url)).then(()=>{
                    Promise.all(respuesta).then((valores)=>{
                    let pokemon = valores[0].data
                    console.log(pokemon.id)
                    })
                })
                
            },
            obtenerDetalle(urls) {
                urls.forEach( url =>{
                     axios.get(url)
                    .then( result => {
                        let pokemon = result.data
                        let obj = {
                            id: pokemon.id,
                            nombre: pokemon.name,
                            peso: pokemon.weight,
                            imgFront: pokemon.sprites.front_default,
                            imgBack: pokemon.sprites.back_default,
                            moves: this.obtenerTecnicas(pokemon.moves)
                        }
                        this.pokemones.push(obj)
                        // Oredenar Pokemones
                        this.pokemones.sort((a, b) => (a.id > b.id) ? 1 : -1)
                    })
                    .catch((err) => {
                        console.log('error'+ err)
                    })
                })
            },
            obtenerTecnicas(moves) {
                let movesFinal = []
                try {
                    let i = 0
                    for (i; i < 4; i++) {
                        let id = Math.floor(Math.random() * moves.length) + 1
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