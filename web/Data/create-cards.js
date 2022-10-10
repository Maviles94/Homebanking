const app = Vue.createApp({
    data() {
        return {
            type: "",
            color: "",
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData() {
            axios.get("/api/clients/current")
                .then((response) => {
                    this.accounts = response.data.accounts
                    this.name = response.data.name
                    this.cards = response.data.card
                })
        },
        createNewCard() {
            console.log(this.type, this.color);
            axios.post(`/api/clients/current/cards?type=${this.type}&color=${this.color}`) // le paso dos varibles que son el tipo y el color ya que en el back le solicito esos dos parametros, la cual debo concatenar con el signo $ y la variable dentro de llaves
                .then(response => window.location.href = "./cards.html") // despues de hacer la peticion le digo que me redireccione a Card.html
        }
    },
    logOut() {
        axios.post('/api/logout').then(response => console.log('signed out!!!'))
    },
},

).mount('#app')