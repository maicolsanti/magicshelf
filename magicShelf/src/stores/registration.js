import { defineStore } from 'pinia'
import { UserType } from '@/models/user-type'

export const useRegistrationStore = defineStore('registrationStore', {
  state: () => ({
    registration: {
      step: 0,
      userType: UserType.NOTSELECTED,
      registrationData: {},
      authToken: '',
    }
  }),
  actions: {
    nextStep(){
      this.registration.step++;
    },
    setSelectedUserType(userType) {
      this.registration.userType = userType;
    }
  },
  getters: {
    getDropdownString(){
      switch (this.registration.userType) {
        case UserType.NOTSELECTED:
          return 'Seleziona'
        case UserType.COSTUMER:
          return 'Cliente'
        case UserType.SUPPLIER:
          return 'Fornitore'
        default:
          return 'Seleziona'
      }
    }
  },
});