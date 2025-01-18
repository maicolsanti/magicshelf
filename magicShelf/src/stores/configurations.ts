import { Costumer } from '@/models/costumer';
import { page } from '@/models/page'
import { Profile } from '@/models/profile';
import { Supplier } from '@/models/supplier';
import { UserType } from '@/models/user-type'
import axios from 'axios';
import { defineStore } from 'pinia'

export const useConfigurationStore = defineStore('configurationsStore', {
  state: () => ({
    configurations: {
      pageCode: page.HOME,
      pageString: '',
      logged: false,
      userType: UserType.COSTUMER,
      userData: {
        name: "",
        surname: "",
        companyName: null,
        vatNumber: null,
        fiscalCode: "",
        cap: "",
        town: "",
        email: "",
        phoneNumber: "",
      },
      authToken: ''
    }
  }),
  actions: {
    async getProfile() {
      try {
        this.configurations.userData = await axios.get('/api/localita/getAll').then(res => res.data.map((user: any) => new Profile(
          user.NOME,
          user.COGNOME,
          user.RAGIONE_SOCIALE,
          user.PARTITA_IVA,
          user.CODICE_FISCALE,
          user.CAP,
          user.CODICE_ISTAT,
          user.INDIRIZZO,
          user.EMAIL,
          user.TELEFONO,
          user.RUOLO == "CLIENTE" ? UserType.COSTUMER : UserType.SUPPLIER
        )));

        this.configurations.logged = true;

        console.log("fetched user profile");
      }
      catch (error) {
        alert(error);
        console.log(error);
      }
    },
    updatePage(newPageCode) {
      this.configurations.pageCode = newPageCode
      this.updatePageName
    },
    updatePageName() {
      switch (this.configurations.pageCode) {
        case page.HOME:
          this.configurations.pageString = 'Home'
          break
        case page.SEARCH:
          this.configurations.pageString = 'Ricerca'
          break
        case page.PRODUCTS:
          this.configurations.pageString = 'Prodotti'
          break
        case page.PROFILE:
          this.configurations.pageString = 'Profilo'
          break
        case page.ABOUT:
          this.configurations.pageString = 'About us'
          break
        case page.LOGIN:
          this.configurations.pageString = 'Login'
          break
        default:
          break
      }
      return this.configurations.pageString
    },
    async loginCostumer(username, password) {

      try {
        await axios.post('/api/auth/clienti/login', {
          EMAIL: username,
          PASSWORD_HASH: password,
        })
          .then(function (response) {
            console.log("logged in");
            console.log("response - status: " + JSON.stringify(response.status) + " - message:" + JSON.stringify(response.data.message));

            this.configurations.logged = true;
            this.fetchUserData(UserType.COSTUMER);
          })
      }
      catch (error) {
        alert(error);
        console.log(error);
      }

    },
    async loginSupplier(fiscalCode, password) {

      try {
        await axios.post('/api/auth/fornitori/login', {
          CODICE_FISCALE: fiscalCode,
          PASSWORD_HASH: password,
        })
          .then(function (response) {
            console.log("logged in");
            console.log("response - status: " + JSON.stringify(response.status) + " - message:" + JSON.stringify(response.data.message));

            this.configurations.logged = true;
            this.fetchUserData(UserType.SUPPLIER);
          })
      }
      catch (error) {
        alert(error);
        console.log(error);
      }

    },
    logout() {
      //TODO: implement logout
      this.configurations.logged = false;
    }
  },
  getters: {
    isLoggedIn() {
      return this.configurations.logged;
    },
    getUserData() {
      return this.configurations.userData;
    }
  }
});