import { defineStore } from 'pinia'

export const useLoginStore = defineStore('loginStore', {
  state: () => ({
    infos: {
      showPassword: false,
      inputPasswordType: 'password',
    }
  }),
  actions: {
    toggleShowPassword() {
      this.infos.showPassword = !this.infos.showPassword;
    },
    login() {
      this.infos.logged = true;
    },
    logout() {
      this.infos.logged = false;
      this.infos.authToken = '';
    }
  },
  getters: {
    getPasswordType() {
      return this.infos.showPassword ? 'text' : 'password';
    }
  },
});