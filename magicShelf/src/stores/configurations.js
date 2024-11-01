import { page } from '@/models/page'
import { UserType } from '@/models/user-type'
import { defineStore } from 'pinia'

export const useConfigurationStore = defineStore('configurationsStore', {
  state: () => ({
    configurations: {
      pageCode: page.HOME,
      pageString: '',
      isLoggedIn: false,
      userType: UserType.COSTUMER,
    }
}),
actions: {
    updatePage(newPageCode) {
      this.configurations.pageCode = newPageCode
      this.updatePageName
    }
},
getters: {
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
    }
},
});