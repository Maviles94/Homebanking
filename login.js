const { createApp } = Vue

createApp({
    data() {
        return {
            name:"",
            lastName:"",
            email: "",
            password: "",
            register: false,
            loginForm: true,
        }

    },
    created() {

    },
    mounted() {

    },
    methods: {
        login() {
            axios.post('/api/login',`email=${this.email}&password=${this.password}`,{headers:{'content-type':'application/x-www-form-urlencoded'}}).then(response => console.log('signed in!!!'))
                .then(() => window.location.href = '/web/accounts.html')
                .catch(error => console.log(error))
        },
        signUp(){
            axios.post('/api/clients',`first=${this.name}&lastName=${this.lastName}&email=${this.email}&password=${this.password}`,{
                headers:{'content-type':'application/x-www-form-urlencoded'}})
                .then(() => alert("Registration Successful"))
                
                /* => axios.post('/api/login', `email=${this.emailSignUp}&password=${this.passwordSignUp}`) */
                .catch(error => console.log(error))
        },
        showForm(){
            if (!this.register){
                this.register = true
                this.loginForm = false
            } else {
                this.register = false
                this.loginForm = true
            }
        },

        sendData() {


        },
    },
},
).mount('#app')

