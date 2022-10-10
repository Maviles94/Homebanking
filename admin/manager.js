const { createApp } = Vue

createApp({
    data() {
        return {
            loansInfo: [],
            newLoanName: "",
            loanAmmount: "",
            loanPayments: "",
            loanInterest: "",


        }
    },
    created() {
        this.loadLoansInfo();


    },
    methods: {
        async loadLoansInfo() {


            await axios.get("/api/loans").then(response => {

                this.loansInfo = response.data;


            })

            .catch(error => console.log(error));
        },

        openMenu: function() {
            let openMenuIcon = document.getElementById("open-menu-icon");
            let closeMenuIcon = document.getElementById("close-menu-icon");
            let navigate = document.getElementById("navigate");

            openMenuIcon.style.display = "none";
            closeMenuIcon.style.display = "block";
            navigate.style.display = "flex";
        },

        closeMenu: function() {
            let openMenuIcon = document.getElementById("open-menu-icon");
            let closeMenuIcon = document.getElementById("close-menu-icon");
            let navigate = document.getElementById("navigate");

            openMenuIcon.style.display = "block";
            closeMenuIcon.style.display = "none";
            navigate.style.display = "none";

        },
        showLogout: function() {
            Swal.fire({
                title: 'Do you want to log out?',
                text: "you will be redirected to the index",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: "Cancel",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Log out!'
            }).then((result) => {
                if (result.isConfirmed) {

                    this.logOut();
                }
            })

        },
        hideForm: function() {
            var loginFormContainer = document.querySelector(".login-form-container");

            loginFormContainer.style.display = "none";
        },
        logOut: function() {
            axios.post('/api/logout').then(response => window.location.href = "../index.html")
        },




        createLoanRequest: function() {

            this.newLoanName = this.newLoanName.charAt(0).toUpperCase() + this.newLoanName.slice(1);

            let formManagerError = document.querySelector(".form-manager-error");
            let duplicatedName = false;
            for (let i = 0; i < this.loansInfo.length; i++) {
                if (this.loansInfo[i].name === this.newLoanName) {
                    duplicatedName = true;
                }
            }

            if (this.newLoanName === "" || this.loanAmmount === "" || this.loanPayments === "" || this.loanInterest === "") {
                formManagerError.textContent = "There is empty fields";
                formManagerError.style.display = "block";

            } else if (duplicatedName) {
                formManagerError.textContent = "Allready exist a loan with this name";
                formManagerError.style.display = "block";
            } else if (this.loanAmmount <= 0) {
                formManagerError.textContent = "The loan ammount can't be 0";
                formManagerError.style.display = "block";
            } else if (this.loanPayments <= 0) {
                formManagerError.textContent = "The payments options can't be 0";
                formManagerError.style.display = "block";
            } else if (this.loanInterest <= 0) {
                formManagerError.textContent = "The interest can't be 0";
                formManagerError.style.display = "block";
            }

            this.createNewLoan();

        },

        createNewLoan: function() {
            axios.post("/admin/newloan", `name=${this.newLoanName}&maxAmmount=${this.loanAmmount}&payments=${this.loanPayments}&fee=${this.loanInterest}`, {
                    headers: { 'content-type': 'application/x-www-form-urlencoded' }
                })
                .then(Swal.fire(
                    'Excelent!',
                    'The loan has been created!.',
                    'success'
                ))
                .then(window.location.href = "../admin/manager.html")

            .catch(error => console.log(error))
        }

    },
    computed: {}
}).mount('#app')