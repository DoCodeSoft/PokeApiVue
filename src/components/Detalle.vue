<template>
    <div>
        <Head></Head>
        <div class="row">
            <div class="col-3">
                <h4>ID: {{obtenerDetalle}} </h4>
                <h3>{{ pokemon.nombre }}</h3>
                <img :src="pokemon.imgFront" alt="Pokemon">
            </div>
            <div v-for="stat in stats" :key="stat.nombre" class="col-3">
                <div class="card-deck">
                    <h3>{{ stat.nombre }}</h3>
                    <ul>
                        <li>{{ stat.esfurezo }}</li>
                        <li>{{ stat.valor }}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Head from '@/components/Head.vue'
import axios from 'axios'

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

    export default {
        name: "Detalle",
        data() {
            return {
                pokemonDetalle: null,
                stats: []
            }
        },
        created() {},
        methods: {
            ...mapActions([
                'POKEMON'
            ])
        },
        computed: {
            ...mapGetters([
                'pokemon'
            ]),
            obtenerDetalle() {
                let id = this.pokemon.id
                let url = 'https://pokeapi.co/api/v2/pokemon/' + id
                axios.get(url)
                .then((result) => {
                    this.pokemonDetalle = result.data
                    this.ajustarStats()
                })
                .catch((err) => {
                    console.log(err)
                })
                return id
            },
            ajustarStats(){
                let stats = this.pokemonDetalle.stats
                stats.forEach(s => {
                    let obj = {
                        nombre: s.stat.name,
                        esfuerzo: s.effort,
                        valor: s.base_stat
                    }
                    this.stats.push(obj)
                });
                console.log(this.stats)
            }
        },
        components: {
            Head
        }
    }
</script>

<style lang="scss" scoped></style>