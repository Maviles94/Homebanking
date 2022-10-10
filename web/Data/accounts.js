const app = Vue.createApp({
    data() {
        return {
            accounts: {},
            name: "",
            loans: [],
            inputType:"",
        
        }
    },

    created() {
        this.loadData();
    },
    methods: {
        loadData() {
            axios.get("/api/clients/current") 
                .then((response) => {
                    this.accounts = response.data.accounts.filter(accounts => accounts.deleteAccount == false)
                    this.name = response.data
                    this.loans = response.data.loans
                    
                })
        },
        createAccount() {
            axios.post(`/api/clients/current/accounts?typeAccount=${this.inputType}`).then(() => {
                this.loadData()
            })

        },
        logOut() {
            axios.post('/api/logout').then(response => console.log('signed out!!!'))
        },
        deleteAccount(accounts) {
            console.log(accounts);
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
                        this.accountNumber = accounts.number
                        console.log(this.accountNumber);
                        axios.patch('/api/clients/current/accounts/delete', `number=${this.accountNumber}`)
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