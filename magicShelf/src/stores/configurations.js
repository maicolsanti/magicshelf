import { page } from '@/models/page'
import { UserType } from '@/models/user-type'
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
    login(username, password) {
      //TODO: implement login and remove test user
      if (username == 'test' && password == 'test') {
        this.configurations.logged = true;
        this.configurations.userData = {
          name: "Gianni",
        surname: "Colo",
        companyName: null,
        vatNumber: null,
        fiscalCode: "BGNMGH01A51C5573T",
        email: "margheritabagnoliniunibo@gmail.it",
        phoneNumber: "3342625441",
        cap: "47020",
        town: "Longiano",
        }
      } else {

      }
    },
    logout() {
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
  },
  actions: {
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
  }
});