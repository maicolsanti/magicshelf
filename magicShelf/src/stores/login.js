import { defineStore } from 'pinia'

export const useLoginStore = defineStore('loginStore', {
  state: () => ({
    infos: {
      logged: false,
      showPassword: false,
      inputPasswordType: 'password',
      authToken: '',
    }
  }),
  actions: {
    toggleShowPassword() {
      this.infos.showPassword = !this.infos.showPassword;
    },
    login() {
      this.infos.logged = true;
    }
  },
  getters: {
    getPasswordType() {
      return this.infos.showPassword ? 'text' : 'password';
    }
  },
});