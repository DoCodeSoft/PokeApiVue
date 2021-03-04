<template>
    <div>
        <header class="header">
            <nav class="nav">
                <ul class="menu">
                    <li class="item"><a href="/" class="link">Inicio</a></li>
                    <li class="item"><a href="/pokedex" class="link" id="pokeli">Pokedex</a></li>
                    <li class="item"><a href="#" class="link">Sobre Nosotros</a></li>
                    <li class="item"><button @click="logout" class="btn btn-danger">Cerrar Sesion</button></li>
                    <li class="item"><a href="/tabla">Tabla</a></li>
                </ul>
            </nav>
        </header>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

    export default {
        name: "Head",
        data() {
            return {
                titulo: "Head"
            }
        },
        methods: {
            logout() {
                firebase.auth().signOut()
                this.$router.replace('/loginp')
            }
        }
    }
</script>

<style lang="scss" scoped>
.header{
    width: 100%;
    height: 60px;
    background: #000;
}

.nav{
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.menu{
    display: flex;
    width: 50%;
    justify-content: space-around;
    list-style: none;
    margin-bottom: 0;
}

.link{
    display: inline-block;
    text-decoration: none;
    color: white;
    width: 100%;
    padding: 0.5rem 0.75rem;
}

.link:hover{
    background-color: grey;
}
</style>