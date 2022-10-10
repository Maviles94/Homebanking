const app = Vue.createApp({
    data() {
        return {
            accounts: {
            },
            name: "",
            number: "",
            loans: [],
            ammount: 0,
            description: "",
            accountNumberDestiny: "",
            transferType: "",
            originAccount: "",
        }
    },

    created() {
        this.loadData();
        console.log(this.accounts);
    },
    methods: {
        loadData() {
            axios.get("/api/clients/current") //imprimo a Melba con sus cuentas
                .then((response) => {
                    this.accounts = response.data.accounts
                    this.name = response.data
                    this.loans = response.data.loans
                    console.log(this.loans);
                })
        },
        createAccount() {
            axios.post("/api/clients/current/accounts").then(() => {
                this.loadData()
            })

        },
        sendTransaction() {
            let amount = this.ammount
            let numberOrigin = this.originAccount
            let accountDestiny = this.accountNumberDestiny
            let description = this.description
            //Le da clase a los botones
            const swalWithBootstrapButtons = Swal.mixin({ // es una variable que define las clases que van a tener los botones. 
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
            })
            //Se crea la alerta
            swalWithBootstrapButtons.fire({ // el punto fire es para que se ejecute el modal. 
                title: 'Are you sure?', //dife un titulo 
                text: `You are going to send $${amount} from this account ${numberOrigin} to this account ${accountDestiny}`, // el texto de la alerta
                icon: 'question', //define el icono que va a tener la alerta
                showCancelButton: true, //va a definir si se ve el boton para cancelar
                confirmButtonText: 'Accept',//boton de aceptar 
                cancelButtonText: 'Cancel',//boton de cancelar 
                reverseButtons: true //??
            })
                .then((result) => { //despues va a obtener un resultado,
                    //Si se confirma el resultado se 
                    if (result.isConfirmed) { // si la respuesta que obtenes después
                        axios.post('/api/transactions', "amount=" + amount + "&description=" + description + "&numberOrigin=" + numberOrigin + "&numberDestiny=" + accountDestiny, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
                            .then(() => {
                                this.ammount = "" //aca vaciamos los campos para que el formulario quede vacio. 
                                this.originAccount = ""
                                this.numberAccountDestiny = ""
                                this.description = ""
                                swalWithBootstrapButtons.fire({ //mostrar al cliente que es lo que hizo
                                    title: 'Well done!',
                                    text: `You send $${amount} from this account ${numberOrigin} to this account ${accountDestiny}`,
                                    icon: 'success',
                                    showCancelButton: true,
                                    confirmButtonText: 'Accept',
                                    cancelButtonText: 'Cancel',
                                    reverseButtons: true
                                })
                            }).catch(response => { //en caso que haya un error, se ejecute lo siguiente. 
                                const swalWithBootstrapButtons = Swal.mixin({
                                    customClass: {
                                        cancelButton: 'btn btn-danger'
                                    },
                                    buttonsStyling: false
                                })
                                swalWithBootstrapButtons.fire({
                                    title: "We detected an error",
                                    text: response.response.data, //en base a la respuesta que te da el error, queremos mostrar el mensaje que viene del bac
                                    icon: "error",
                                    showConfirmButton: false,
                                    showCancelButton: true,
                                    cancelButtonText: 'Accept',
                                })
                            })
                    }
                })
        },
        logOut() {
            axios.post('/api/logout').then(response => console.log('signed out!!!'))
        },


    },
},

).mount('#app')