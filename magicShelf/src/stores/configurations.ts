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
        id: null,
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
        await axios.get('/api/auth/general/getProfile').then(res => {
          const user = res.data;
          this.configurations.userData = new Profile(
          user.ID = user.RUOLO === "CLIENTE" ? user.CODICE_CLIENTE : user.CODICE_FORNITORE,
          user.NOME,
          user.COGNOME,
          user.RAGIONE_SOCIALE,
          user.PARTITA_IVA,
          user.CODICE_FISCALE,
          user.CAP.toString(),
          user.CODICE_ISTAT,
          user.INDIRIZZO,
          user.EMAIL,
          user.PHONE_NUMBER,
          user.RUOLO == "CLIENTE" ? UserType.COSTUMER : UserType.SUPPLIER
          );
        });

        if (this.configurations.userData.id != null) {
          this.configurations.logged = true;
        }

        console.log(`Profilo recuperato con successo.`);
      }
      catch (error) {
        console.error("Errore nella richiesta del profilo: ", error);
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
            console.log("Cliente loggato con successo.");
          })

          this.getProfile();
          this.configurations.logged = true;
      }
      catch (error) {
        console.error("Errore nel login: ", error);
      }

    },
    async loginSupplier(fiscalCode, password) {

      try {
        await axios.post('/api/auth/fornitori/login', {
          CODICE_FISCALE: fiscalCode,
          PASSWORD_HASH: password,
        })
          .then(function (response) {
            console.log("Fornitore loggato con successo.");
          })

          this.getProfile();
          this.configurations.userType = UserType.SUPPLIER;
          this.configurations.logged = true;
      }
      catch (error) {
        console.error("Errore nel login: ", error);
      }

    },
    async logout() {
      try {
        await axios.post('/api/auth/general/logout')
          .then(function (response) {
            console.log("Logout effettuato con successo.");
          })

          this.userData = {
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
          this.configurations.logged = false;
      }
      catch (error) {
        console.error("Errore nel logout del profilo: ", error);
      }

    },
    setUserType(userType) {
      this.configurations.userType = userType;
    }
  },
  getters: {
    isLoggedIn() {
      return this.configurations.logged;
    },
    getUserData() {
      return this.configurations.userData;
    },
    isSupplier() {
      return this.configurations.userType === UserType.SUPPLIER;
    },
  }
});
