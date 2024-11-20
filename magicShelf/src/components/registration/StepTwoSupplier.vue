<script setup>
import { useRegistrationStore } from '@/stores/registration'
import { useConfigurationStore } from '@/stores/configurations'
import { storeToRefs } from 'pinia';
import { watch, computed } from 'vue';
import { addIcons } from 'oh-vue-icons'
import { MdVisibilityoffRound, MdVisibilityRound } from 'oh-vue-icons/icons'
import { useRouter } from 'vue-router'

addIcons(MdVisibilityRound, MdVisibilityoffRound);
const registrationStore = useRegistrationStore();
const configurationStore = useConfigurationStore();
const { registration, getPasswordType, getVatEquivalence, getTowns, getTown, getTownString, getRegistrationDataError } = storeToRefs(registrationStore);
const { login } = storeToRefs(configurationStore);

const passwordInputType = computed(() => getPasswordType.value);
const dropDownString = computed(() => getTownString.value);
const towns = computed(() => getTowns.value);
const townData = computed(() => getTown.value);
const getDataError = computed(() => getRegistrationDataError.value);
const isVatEquivalent = computed(() => getVatEquivalence.value);
let isVatSame = false;

const router = useRouter()

registrationStore.clearRegistrationData();
registrationStore.clearVatSameAsFiscalCode();

function checkDataValidity() {
    let valid = true;
    const inputs = document.querySelectorAll("#costumerRegistration input");
    inputs.forEach(input => {
        if (!input.checkValidity()) {
            valid = false;
        }
    });
    console.log(valid);
    registrationStore.setRegistrationDataError(!valid);
}

let formData = {
    nameInput: "",
    surnameInput: "",
    companyNameInput: "",
    vatNumberInput: "",
    fiscalCodeInput: "",
    emailInput: "",
    phoneInput: "",
    CAPInput: "",
    selectedTown: "",
    passwordInput: "",
};


function setFiscalCodeWithVatNumber() {
    registrationStore.toggleVatCheckbox();
    if (isVatEquivalent.value) {
        isVatSame = true;
        formData.fiscalCodeInput = formData.vatNumberInput;
    } else {
        isVatSame = false;
        formData.fiscalCodeInput = "";
    }
}

function submit() {
    registrationStore.setSupplierFormData(formData.nameInput, formData.surnameInput, formData.companyNameInput, formData.vatNumberInput, formData.fiscalCodeInput, formData.emailInput, formData.phoneInput, formData.passwordInput);
    configurationStore.login();
    router.push('/');
}
</script>

<template>
    <main class="margin-content">
        <b-alert v-if="registration.registrationDataError" variant="danger"
            class="d-flex justify-content-center alert">Compila correttamente i dati</b-alert>
        <h4 class="welcome d-flex my-5">
            Ciao fornitore,<br />inserisci i tuoi dati per completare la registrazione
        </h4>
        <form id="costumerRegistration" class="form-g mb-5" v-on:submit.prevent="checkDataValidity()" action=""
            method="post">
            <div class="container">
                <h5 class="form-section-title">Anagrafici e di contatto</h5>
                <div class="row form-group">
                    <div class="form-group mb-3">
                        <label for="">Nome</label>
                        <input type="text" class="form-control" id="nameInput" v-model="formData.nameInput"
                            placeholder="nome" required />
                    </div>
                    <div class="form-group mb-3">
                        <label for="">Cognome</label>
                        <input type="text" class="form-control" id="surnameInput" v-model="formData.surnameInput"
                            placeholder="cognome" required />
                    </div>
                </div>
                <div class="row form-group">
                    <div class="form-group mb-3">
                        <label for="">Ragione Sociale</label>
                        <input type="text" class="form-control" id="companyNameInput" v-model="formData.companyNameInput"
                            placeholder="ragione sociale" required />
                    </div>
                </div>
                <div class="row form-group">
                    <div class="form-group mb-1">
                        <label for="">Partita Iva</label>
                        <input type="text" class="form-control" id="vatNumberInput" v-model="formData.vatNumberInput"
                            placeholder="p. iva" required />
                    </div>
                    <div class="form-check mb-3 d-flex align-items-center">
                        <input type="checkbox" id="checkbox" v-model="isVatSame" class="form-check-input vat-checkbox"
                            @click="setFiscalCodeWithVatNumber" />
                        <label for="checkbox" class="form-check-label vat-checkbox-label ms-2">La partita iva corrisponde al
                            codice fiscale</label>
                    </div>
                    <div class="form-group mb-3" v-if="!isVatEquivalent">
                        <label for="">Codice Fiscale</label>
                        <input type="text" class="form-control" id="fiscalCodeInput" v-model="formData.fiscalCodeInput"
                            placeholder="codice fiscale" required />
                    </div>
                    <div class="form-group mb-3 disabled" v-if="isVatEquivalent">
                        <label for="">Codice Fiscale</label>
                        <input type="text" class="form-control disabled" :disabled="true" id="fiscalCodeInputSame"
                            v-model="formData.vatNumberInput" placeholder="codice fiscale" required />
                    </div>
                </div>
                <div class="row form-group">
                    <div class="form-group mb-3">
                        <label for="">Email</label>
                        <input type="email" class="form-control" id="emailInput" v-model="formData.emailInput"
                            placeholder="indirizzo email" required />
                    </div>
                    <div class="form-group mb-3">
                        <label for="">Telefono</label>
                        <input type="tel" class="form-control" id="phoneInput" v-model="formData.phoneInput"
                            placeholder="numero di telefono" required />
                    </div>
                </div>
                <h5 class="form-section-title mt-2">Località</h5>
                <div class="row form-group">
                    <div class="form-group mb-3">
                        <label for="">CAP</label>
                        <input type="text" class="form-control" id="CAPInput" v-model="formData.CAPInput" placeholder="cap"
                            required @change="registrationStore.changeCAP(formData.CAPInput)" />
                    </div>
                    <div class="dropdown d-flex justify-content-center mb-3">
                        <button class="btn dropdown-toggle cap-dropdown d-flex justify-content-between align-items-center"
                            type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                            <span class="dropdown-text" :class="{ 'town-not-selected': townData == '' }">{{
                                dropDownString }}</span>
                            <span class="dropdown-icon"></span>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" role="menu">
                            <li>
                                <a v-if="towns.length == 0" class="dropdown-item disabled"
                                    @click="registrationStore.setSelectedTown(town.name)" href="#">Inserisci il cap</a>
                                <a v-if="towns.length > 0" v-for="   town    in    towns   " v-bind:key="town.name"
                                    class="dropdown-item" @click="registrationStore.setSelectedTown(town.name)" href="#">{{
                                        town.name }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <h5 class="form-section-title mt-1">Account</h5>
                <div class="row form-group">
                    <label for="">Password</label>
                    <div class="col-md-13 input-group">
                        <input :type="passwordInputType" class="form-control mb-5" id="passwordInput"
                            v-model="formData.passwordInput" placeholder="password" required />
                        <div class="input-group-btn">
                            <button class="btn icon-button" @click="registrationStore.toggleShowPassword()">
                                <v-icon v-if="!registration.showPassword" name="md-visibility-round"
                                    class="visibility-icon" />
                                <v-icon v-if="registration.showPassword" name="md-visibilityoff-round"
                                    class="visibility-icon" />
                            </button>
                        </div>
                    </div>
                </div>


                <!-- <div class="form-g mb-5">
                    <div class="form-group mb-3">
                        <label for="">Nome</label>
                        <input type="text" class="form-control" id="nameInput" v-model="formData.nameInput"
                            placeholder="nome" required />
                    </div>
                    <div class="form-group mb-3">
                        <label for="">Cognome</label>
                        <input type="text" class="form-control" id="surnameInput" v-model="formData.surnameInput"
                            placeholder="cognome" required />
                    </div>
                    <div class="form-group mb-3">
                        <label for="">Ragione Sociale</label>
                        <input type="text" class="form-control" id="companyNameInput" v-model="formData.companyNameInput"
                            placeholder="ragione sociale" required />
                    </div>
                    <div class="form-group mb-1">
                        <label for="">Partita Iva</label>
                        <input type="text" class="form-control" id="vatNumberInput" v-model="formData.vatNumberInput"
                            placeholder="p. iva" required />
                    </div>
                    <div class="form-check mb-3 d-flex align-items-center">
                        <input type="checkbox" id="checkbox" v-model="isVatSame" class="form-check-input vat-checkbox"
                            @click="setFiscalCodeWithVatNumber" />
                        <label for="checkbox" class="form-check-label vat-checkbox-label ms-2">La partita iva corrisponde al
                            codice fiscale</label>
                    </div>
                    <div class="form-group mb-3" v-if="!isVatEquivalent">
                        <label for="">Codice Fiscale</label>
                        <input type="text" class="form-control" id="fiscalCodeInput" v-model="formData.fiscalCodeInput"
                            placeholder="codice fiscale" required />
                    </div>
                    <div class="form-group mb-3 disabled" v-if="isVatEquivalent">
                        <label for="">Codice Fiscale</label>
                        <input type="text" class="form-control disabled" :disabled="true" id="fiscalCodeInputSame"
                            v-model="formData.vatNumberInput" placeholder="codice fiscale" required />
                    </div>
                    <div class="form-group mb-3">
                        <label for="">Email</label>
                        <input type="email" class="form-control" id="emailInput" v-model="formData.emailInput"
                            placeholder="indirizzo email" required />
                    </div>
                    <div class="form-group mb-3">
                        <label for="">Telefono</label>
                        <input type="tel" class="form-control" id="phoneInput" v-model="formData.phoneInput"
                            placeholder="numero di telefono" required />
                    </div>
                    <div class="form-group mb-3">
                        <label for="">CAP</label>
                        <input type="text" class="form-control" id="CAPInput" v-model="formData.CAPInput" placeholder="cap"
                            required @change="registrationStore.changeCAP(formData.CAPInput)" />
                    </div>
                    <div class="dropdown d-flex justify-content-center mb-3">
                        <button class="btn dropdown-toggle cap-dropdown d-flex justify-content-between align-items-center"
                            type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                            <span class="dropdown-text" :class="{ 'town-not-selected': townData == '' }">{{
                                dropDownString }}</span>
                            <span class="dropdown-icon"></span>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" role="menu">
                            <li>
                                <a v-if="towns.length == 0" class="dropdown-item disabled"
                                    @click="registrationStore.setSelectedTown(town.name)" href="#">Inserisci il cap</a>
                                <a v-if="towns.length > 0" v-for="   town    in    towns   " v-bind:key="town.name"
                                    class="dropdown-item" @click="registrationStore.setSelectedTown(town.name)" href="#">{{
                                        town.name }}</a>
                            </li>
                        </ul>
                    </div>
                    <div class="form-group row">
                        <label for="">Password</label>
                        <div class="col-md-13 input-group">
                            <input :type="passwordInputType" class="form-control mb-5" id="passwordInput"
                                v-model="formData.passwordInput" placeholder="password" required />
                            <div class="input-group-btn">
                                <button class="btn icon-button" @click="registrationStore.toggleShowPassword()">
                                    <v-icon v-if="!registration.showPassword" name="md-visibility-round"
                                        class="visibility-icon" />
                                    <v-icon v-if="registration.showPassword" name="md-visibilityoff-round"
                                        class="visibility-icon" />
                                </button>
                            </div>
                        </div>
                    </div> -->
                <div class="d-flex justify-content-center">
                    <button @click="submit" class="btn btn-primary form-button mb-2">
                        Registrati
                    </button>
                </div>
            </div>

        </form>

    </main>
</template>


<style scoped>
/* .form-g {
    justify-self: center;
    justify-items: center;
    width: 350px;
} */

input {
    border-color: var(--bs-secondary);
    border-width: 1px;
    height: 40px;
    max-width: 350px;
}

::placeholder {
    color: var(--bs-secondary);
    opacity: 0.4;
}

label {
    color: var(--bs-secondary);
}

.visibility-icon {
    color: var(--bs-secondary);
}

.icon-button {
    height: 40px;
    border-color: var(--bs-secondary);
    border-width: 1px;
    border-top-left-radius: 0%;
    border-bottom-left-radius: 0%;
    border-left: none;
}

.form-check {
    display: flex;
    align-items: center;
    width: 350px;
}

.vat-checkbox {
    height: 20px;
    width: 20px;
    min-width: 20px;
    margin-right: 10px;
    box-sizing: border-box;
}

.vat-checkbox-label {
    font-size: small;
    color: var(--bs-dark);
}

.dropdown {
    max-width: 350px;
    height: 40px;
}

.dropdown-select {
    width: 350px;
    height: 36px;
    border-color: var(--bs-secondary);
    border-radius: 6px;
    padding-left: 10px;
}

.dropdown-menu {
    width: 350px;
}

.cap-dropdown {
    width: 350px;
    align-content: start;
    align-items: start;
    justify-items: stretch;
    border-color: var(--bs-secondary);
}

.town-not-selected {
    color: var(--bs-secondary);
    opacity: 0.5;
}

.alert {
    color: red;
}
</style>