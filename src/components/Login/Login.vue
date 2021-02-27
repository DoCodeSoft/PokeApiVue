
<style lang="scss" src="./Login.scss" scoped></style>
<template src="./Login.html"></template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

    export default {
        name: 'Login',
        data() {
            return {
                titulo: "Login",
                usuario: "",
                pass: ""
            }
        },
        methods: {
            // Metodo para mostrar Alertas Exito
            alerta_correcto(msj) {
                this.mostrarAgenda = false
                this.$swal("Listo!", msj, "success")
            },
            alerta_alert(msj) {
                this.mostrarAgenda = false
                this.$swal("Alerta!", msj, "warning")
            },
            login() {
                firebase.auth().signInWithEmailAndPassword(this.usuario + '@docode.com.mx', this.pass)
                .then((user) => {
                    //this.$router.replace('base')
                    this.usuario = ""
                    this.pass = ""
                    this.alerta_correcto("Credenciales Correctas")
                },(error) => {
                    var msj = error.code.split('/')
                    if(msj[1] == "network-request-failed")
                        this.alerta_alert("Verifique Conexión a Internet")
                    else
                        this.usuario = ""
                        this.pass = ""
                        this.alerta_alert("Usuario/Contraseña Incorrectos")
                });
            }
        }
    }
</script>