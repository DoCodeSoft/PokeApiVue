<template>
    <div>
        <Head></Head>
        
        <h3>{{ pokemon.nombre }}</h3>
        <img :src="pokemon.imgFront" alt="Pokemon">
    </div>
</template>

<script>
import Head from '@/components/Head.vue'

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

    export default {
        name: "Detalle",
        data() {
            return {

            }
        },
        created() {

        },
        methods: {
            ...mapActions([
                'POKEMON'
            ])
        },
        computed: {
            ...mapGetters([
                'pokemon'
            ])
        },
        components: {
            Head
        }
    }
</script>

<style lang="scss" scoped></style>