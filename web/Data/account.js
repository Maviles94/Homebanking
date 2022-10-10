const app = Vue.createApp({
    data() {
        return {
            accounts: {},
            name: "",
            id: "",
            filterAccount: {},
            transaction: [],
        }
    },

    created() {
        this.loadData(); //cada vez que se cargue la pagina 
    },


    methods: { //defino los metodos 
        loadData() {
            axios.get("/api/clients/current")
                .then((response) => {
                    this.accounts = response.data.accounts
                    console.log(response);
                    this.name = response.data
                    this.getTransactions()
                })
        },
        getTransactions() {
            /* var idURL = window.location.search.split("?id=").join("") */
            let idURL = new URL(window.location).searchParams.get("id") // location es la pestaña del navegador 
            console.log(idURL);
            axios.get(`/api/accounts/${idURL}`).then((response) => {
                this.transaction = response.data.transactions
                console.log(this.transaction);
            })
        },
    },
},

).mount('#app')