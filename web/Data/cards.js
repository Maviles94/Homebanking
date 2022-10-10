const app = Vue.createApp({
    data() {
        return {
            accounts: {
            },
            name: "",
            cards: [],
            creditCards: [],
            debitCards: [],
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
                    this.name = response.data
                    this.cards = response.data.card.filter(card => card.cardDelete == false)
                    this.creditCards = response.data.card.filter(card => card.type == "CREDIT").filter((card => card.cardDelete == false));
                    this.debitCards = response.data.card.filter(card => card.type == "DEBIT").filter((card => card.cardDelete == false));
                    console.log(this.creditCards);
                })
        },
        logOut() {
            axios.post('/api/logout').then(response => console.log('signed out!!!'))
        },
        deleteCard(cards) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).
                then((result) => {
                    if (result.isConfirmed) {
                        this.cardNumber = cards.number
                        console.log(this.cardNumber);
                        axios.patch('/api/clients/current/cards/delete', `cardNumber=${this.cardNumber}`)
                            .catch(error => Swal.fire(error.response.data))

                            .then(res => Swal.fire({
                                toast: true,
                                position: 'top-end',
                                icon: 'success',
                                title: 'your card has been successfully deleted',
                                showConfirmButton: false,
                                timerProgressBar: true,
                                timer: 2500
                            }))


                            .then(response => {
                                window.location.reload()
                            })
                    }
                })
        },
    },
},

).mount('#app')
