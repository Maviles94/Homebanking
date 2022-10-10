const app = Vue.createApp({
    data() {
        return {
            loans: [],
            loanSelect: "",
            loanType: "",
            idLoanType: 0,
            paymentLoanType: 0,
            amountLoanType: 0,

            inputAmount: 0,
            inputPayments: 0,
            inputAccount: "",

            getAccounts: "",
            loanData: {
                "loanId": 0,
                "amount": 0,
                "payments": 0,
                "accountNumber": '',
            }

        }
    },

    created() {
        this.loadData();
        this.getAllAccounts();
    },
    methods: {
        loadData() {
            axios.get("/api/loans")
                .then((response) => {
                    this.loans = response.data //guarda la informacion de todos los prestamos en la variable loans 
                })
        },
        getLoan() {
            this.loanSelect = this.loans.filter((loan) => loan.name == this.loanType) //en esta nueva variable loanSelect va a traer un prestamo, el mismo que selecciona el cliente. 
            this.idLoanType = this.loanSelect[0].id
            this.paymentLoanType = this.loanSelect[0].payments
            this.amountLoanType = this.loanSelect[0].maxAmmount
        },
        getAllAccounts() {
            axios.get("/api/clients/current") //Con Axios hago una solicitud asociando una ruta, en esta ruta nos trae la informacion del cliente actual 
                .then((response) => { //Obtengo una respuesta 
                    this.getAccounts = response.data.accounts //y de esta respuesta obtengo las cuentas que las estoy guardando en una variable (getAccounts)
                    console.log(this.getAccounts);
                })
        },
        sendLoan() {
            this.loanData.loanId = this.idLoanType
            this.loanData.amount = this.inputAmount
            this.loanData.payments = this.inputPayments
            this.loanData.accountNumber = this.inputAccount
            console.log(this.loanData)
            axios.post("/api/loans", this.loanData)
                .then((response) => {
                    window.alert("created")
                })
                .catch((error) => {
                    window.alert(error.response.data)
                })
        },
        logOut() {
            axios.post('/api/logout').then(response => console.log('signed out!!!'))
        },
    },
},

).mount('#app')