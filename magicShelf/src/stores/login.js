import { defineStore } from 'pinia'

export const useLoginStore = defineStore('loginStore', {
  state: () => ({
    infos: {
      showPassword: false,
      inputPasswordType: 'password',
      authToken: '',
    }
  }),
  actions: {
    toggleShowPassword() {
      this.infos.showPassword = !this.infos.showPassword;
    }
  },
  getters: {
    getPasswordType() {
      return this.infos.showPassword ? 'text' : 'password';
    }
  },
});