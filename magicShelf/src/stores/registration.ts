import { defineStore } from 'pinia'
import { UserType } from '@/models/user-type'
import axios from "axios"
import { LocationDetails } from '@/models/location-details';

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
      towns:  [] as LocationDetails[],
      showPassword: false,
      inputPasswordType: 'password',
      vatSameAsFiscalCode: false,
      registrationDataError: false,
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
    async fetchTowns() {
        try {
          console.log("fetching towns begins");
          this.registration.towns = await axios.get('/api/localita/getAll').then(res => res.data.map((locality: any) => new LocationDetails(
            locality.CODICE_ISTAT,
            locality.CAP,
            locality.PROVINCIA,
            locality.REGIONE,
            locality.LOCALITA
        )));

            console.log("fetching towns ended");
            console.log("towns: " + JSON.stringify(this.registration.towns));
          }
          catch (error) {
            alert(error);
            console.log(error);
        }
    },
    setSelectedTown(townName) {
      this.registration.registrationData.town = townName;
    },
    changeCAP(CAPInput) {
      this.registration.registrationData.town = "";
      this.setSelectedTown("");
      this.registration.registrationData.cap = CAPInput;
    },
    setCostumerFormData(nameInput, surnameInput, emailInput, phoneInput, passwordInput) {
      this.registration.registrationData.name = nameInput;
      this.registration.registrationData.surname = surnameInput;
      this.registration.registrationData.email = emailInput;
      this.registration.registrationData.phoneNumber = phoneInput;
      // this.registration.registrationData.cap = CAPInput,
      // this.registration.registrationData.town = townInput,
      this.registration.registrationData.password = passwordInput;
    },
    setSupplierFormData(nameInput, surnameInput, companyNameInput, vatNumberInput, fiscalCodeInput, emailInput, phoneInput, passwordInput) {
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
      console.log("requested getTowns");
      if(this.registration.towns.length > 0) {
        console.log("towns.cap = " + this.registration.towns[0].cap);
        console.log("equal caps " + JSON.stringify(this.registration.towns.filter(town => town.cap == this.registration.registrationData.cap)));
        return this.registration.towns.filter(town => town.cap == this.registration.registrationData.cap);
      } else {
        console.log("towns is empty");
        return  [] as LocationDetails[];
      }
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