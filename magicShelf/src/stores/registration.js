import { defineStore } from 'pinia'
import { UserType } from '@/models/user-type'

export const useRegistrationStore = defineStore('registrationStore', {
  state: () => ({
    registration: {
      step: 0,
      userType: UserType.NOTSELECTED,
      registrationData: {
        name: "",
        surname: "",
        companyName: "",
        vatNumber: "",
        // companyName: userType == UserType.SUPPLIER ? "" : null,
        // vatNumber: userType == UserType.SUPPLIER ? "" : null,
        fiscalCode: "",
        email: "",
        phoneNumber: "",
        cap: "",
        town: "",
        password: ""
      },
      towns: [
        {
          name: "Cesena",
          caps: [47520, 47521]
        },
        {
          name: "Longiano",
          caps: [47020]
        },
        {
          name: "Bologna",
          caps: [47120, 47121, 47122, 47123]
        },
        {
          name: "Cisterna di Latina",
          caps: [47020]
        },
        {
          name: "Como",
          caps: [40130, 40131]
        }
      ],
      showPassword: false,
      inputPasswordType: 'password',
      authToken: '',
    }
  }),
  actions: {
    nextStep(){
      this.registration.step++;
    },
    previousStep(){
      this.registration.step--;
    },
    setSelectedUserType(userType) {
      this.registration.userType = userType;
    },
    toggleShowPassword() {
      this.registration.showPassword = !this.infos.showPassword;
    },
    setSelectedTown(townName) {
      this.registration.registrationData.town = townName;
    },
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
    },
    getStep() {
      return this.registration.step;
    },
    getPasswordType() {
      return this.registration.showPassword ? 'text' : 'password';
    },
    getTowns() {
      return this.registration.towns.filter(town => town.caps.includes(this.registration.registrationData.cap));
    }
  },
});