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
        companyName: null,
        vatNumber: null,
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
          caps: ["47520", "47521"]
        },
        {
          name: "Longiano",
          caps: ["47020"]
        },
        {
          name: "Bologna",
          caps: ["47120", "47121", "47122", "47123"]
        },
        {
          name: "Cisterna di Latina",
          caps: ["04012"]
        },
        {
          name: "Como",
          caps: ["40130", "40131"]
        }
      ],
      showPassword: false,
      inputPasswordType: 'password',
      vatSameAsFiscalCode: false,
      registrationDataError: false,
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
      if (userType === UserType.SUPPLIER) {
        this.registration.registrationData.companyName = "";
        this.registration.registrationData.vatNumber = "";
      }
    },
    toggleShowPassword() {
      this.registration.showPassword = !this.registration.showPassword;
    },
    toggleVatCheckbox() {
      this.registration.vatSameAsFiscalCode = !this.registration.vatSameAsFiscalCode;
      // if(this.registration.vatSameAsFiscalCode) {
      //   this.registration.registrationData.fiscalCode = this.registration.registrationData.vatNumber;
      // }
    },
    clearVatSameAsFiscalCode() {
      this.registration.vatSameAsFiscalCode = false;
    },
    setSelectedTown(townName) {
      this.registration.registrationData.town = townName;
    },
    changeCAP(CAPInput) {
      this.registration.registrationData.town = "";
      this.setSelectedTown("");
      this.registration.registrationData.cap = CAPInput;
    },
    setCostumerFormData(nameInput, surnameInput, emailInput, phoneInput, CAPInput, townInput, passwordInput) {
      this.registration.registrationData.name = nameInput;
      this.registration.registrationData.surname = surnameInput;
      this.registration.registrationData.email = emailInput;
      this.registration.registrationData.phoneNumber = phoneInput;
      // this.registration.registrationData.cap = CAPInput,
      // this.registration.registrationData.town = townInput,
      this.registration.registrationData.password = passwordInput;
    },
    setCostumerFormData(nameInput, surnameInput, companyNameInput, vatNumberInput, fiscalCodeInput, emailInput, phoneInput, CAPInput, townInput, passwordInput) {
      this.registration.registrationData.name = nameInput;
      this.registration.registrationData.surname = surnameInput;
      this.registration.registrationData.companyName = companyNameInput;
      this.registration.registrationData.vatNumber = vatNumberInput;
      this.registration.registrationData.fiscalCode = fiscalCodeInput;
      this.registration.registrationData.email = emailInput;
      this.registration.registrationData.phoneNumber = phoneInput;
      // this.registration.registrationData.cap = CAPInput,
      // this.registration.registrationData.town = townInput,
      this.registration.registrationData.password = passwordInput;
    },
    setRegistrationDataError(hasError) {
      this.registration.registrationDataError = hasError;
    },
    clearRegistrationData() {
      this.registration.registrationData = {
        name: "",
        surname: "",
        companyName: this.registration.UserType === UserType.SUPPLIER ? "" : null,
        vatNumber: this.registration.UserType === UserType.SUPPLIER ? "" : null,
        fiscalCode: "",
        email: "",
        phoneNumber: "",
        cap: "",
        town: "",
        password: ""
      };
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
    },
    getStep() {
      return this.registration.step;
    },
    getPasswordType() {
      return this.registration.showPassword ? 'text' : 'password';
    },
    getVatEquivalence() {
      return this.registration.vatSameAsFiscalCode;
    },
    getTowns() {
      return this.registration.towns.filter(town => town.caps.includes(this.registration.registrationData.cap));
    },
    getTown() {
      return this.registration.registrationData.town;
    },
    getTownString(){
      if(this.registration.registrationData.town == "") {
        return "Seleziona comune";
      } else {
        return this.registration.registrationData.town;
      }
    },
    getUserType() {
      return this.registration.userType;
    },
    getRegistrationDataError() {
      return this.registration.registrationDataError;
    }
  },
});