import { Costumer } from '@/models/costumer';
import { page } from '@/models/page'
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
        email: "",
        phoneNumber: "",
        cap: "",
        town: ""
      },
      authToken: ''
    }
  }),
  actions: {
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
        await axios.post('/auth/clienti/login', {
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
        await axios.post('/auth/fornitori/login', {
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
    async fetchUserData(userType) {

      if (userType == UserType.COSTUMER) {
        try {
          this.configurations.userData = await axios.get('/api/clienti/getProfifle').then(res => res.data.map((costumer: any) => new Costumer(
            costumer.CODICE_CLIENTE,
            costumer.NOME,
            costumer.COGNOME,
            costumer.CAP,
            costumer.CODICE_ISTAT,
            costumer.EMAIL,
            costumer.PHONE_NUMBER
          )));

          console.log("fetched customer profile");
        }
        catch (error) {
          alert(error);
          console.log(error);
        }

      } else if (userType == UserType.SUPPLIER) {
        try {
          this.configurations.userData = await axios.get('/api/fornitori/getProfifle').then(res => res.data.map((supplier: any) => new Supplier(
            supplier.CODICE_FORNITORE,
            supplier.NOME,
            supplier.COGNOME,
            supplier.RAGIONE_SOCIALE,
            supplier.PARTITA_IVA,
            supplier.CODICE_FISCALE,
            supplier.PHONE_NUMBER,
            null,
            null,
            supplier.CAP,
            supplier.CODICE_ISTAT,
            
          )));

          console.log("fetched supplier profile");
        }
        catch (error) {
          alert(error);
          console.log(error);
        }

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