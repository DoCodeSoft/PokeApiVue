
<style lang="scss" src="./Loginp.scss" scoped></style>
<template src="./Loginp.html"></template>

<script>
// @ is an alias to /src
import firebase from 'firebase/app'
import 'firebase/auth'

    export default {
        name: 'LoginP',
        data() {
            return {
                titulo: "Loginp",
                usuario: {
                    user: "",
                    pass: ""
                }
            }
        },
        methods: {
            login() {
                firebase.auth().signInWithEmailAndPassword(this.usuario.user,this.usuario.pass)
                .then((user) => {
                    this.$router.replace('/') // Home
                },(error) => {
                    let msj = error.code.split('/')[1]
                    if(msj == 'wrong-password'){
                        this.$swal("Error!!","Contraseña Incorrecta", "warning")
                    }
                    if(msj == 'too-many-requests'){
                        this.$swal("Error!!","Demasiados intentos incorrectos", "warning")
                    }
                })
            }
        },
    }
</script>