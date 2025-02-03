<script setup lang="ts">
import { useRegistrationStore } from '@/stores/registration'
import { useConfigurationStore } from '@/stores/configurations'
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';
import { addIcons } from 'oh-vue-icons'
import { MdVisibilityoffRound, MdVisibilityRound } from 'oh-vue-icons/icons'
import { useRouter } from 'vue-router'
import { UserType } from '@/models/user-type';

addIcons(MdVisibilityRound, MdVisibilityoffRound);
const registrationStore = useRegistrationStore();
const configurationStore = useConfigurationStore();
const { registration, getPasswordType, getVatEquivalence, getTowns, getTown, getTownString } = storeToRefs(registrationStore);

onMounted(() => {
    registrationStore.fetchTowns();
});

const passwordInputType = computed(() => getPasswordType.value);
const dropDownString = computed(() => getTownString.value);
const towns = computed(() => getTowns.value);
const townData = computed(() => getTown.value);
const isVatEquivalent = computed(() => getVatEquivalence.value);
let isVatSame = false;

const router = useRouter()

registrationStore.clearRegistrationData();
registrationStore.clearVatSameAsFiscalCode();

function checkDataValidity() {
    let valid = true;
    const inputs = document.querySelectorAll("#costumerRegistration input");
    inputs.forEach(input => {
        if (input instanceof HTMLInputElement && !input.checkValidity()) {
            valid = false;
        }
    });
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
    address: "",
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
    registrationStore.registerSupplier(formData.nameInput, formData.surnameInput, formData.companyNameInput, formData.vatNumberInput, formData.fiscalCodeInput, formData.emailInput, formData.phoneInput, formData.address, formData.passwordInput).then(() => {
        configurationStore.setUserType(UserType.SUPPLIER);
        configurationStore.getProfile();
    });
    router.push('/');
}
</script>

<template>
    <main>
        <h4 class="welcome d-flex my-5">
            Ciao fornitore,<br />inserisci i tuoi dati per completare la registrazione
        </h4>
        <form id="supplierRegistration" class="form-g mb-5" v-on:submit.prevent="checkDataValidity()" action=""
            method="post">
            <div class="">
                <h5 class="form-section-title">Anagrafici e di contatto</h5>
                <div class="row form-group">
                    <div class="col-8 mb-3 form-column">
                        <label for="">Nome</label>
                        <input type="text" class="form-control" id="nameInput" v-model="formData.nameInput"
                            placeholder="nome" required />
                    </div>
                    <div class="col-8 mb-3 form-column">
                        <label for="">Cognome</label>
                        <input type="text" class="form-control" id="surnameInput" v-model="formData.surnameInput"
                            placeholder="cognome" required />
                    </div>
                    <div class="col-8 mb-3 form-column">
                        <label for="">Ragione Sociale</label>
                        <input type="text" class="form-control" id="companyNameInput" v-model="formData.companyNameInput"
                            placeholder="ragione sociale" required />
                    </div>
                </div>
                <div class="row form-group">
                    <div class="col-8 mb-2 form-column">
                        <label for="">Partita Iva</label>
                        <input type="text" class="form-control" id="vatNumberInput" v-model="formData.vatNumberInput"
                            placeholder="p. iva" required />
                        <div class="form-check mb-1 d-flex align-items-center">
                            <input type="checkbox" id="checkbox" v-model="isVatSame" class="form-check-input vat-checkbox"
                                @click="setFiscalCodeWithVatNumber" />
                            <label for="checkbox" class="form-check-label vat-checkbox-label ms-2">La partita iva
                                corrisponde al
                                codice fiscale</label>
                        </div>
                    </div>
                    <div class="col-8 mb-3 form-column">
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

                </div>
                <div class="row form-group">
                    <div class="col-8 mb-3 form-column">
                        <label for="">Email</label>
                        <input type="email" class="form-control" id="emailInput" v-model="formData.emailInput"
                            placeholder="indirizzo email" required />
                    </div>
                    <div class="col-8 mb-3 form-column">
                        <label for="">Telefono</label>
                        <input type="tel" class="form-control" id="phoneInput" v-model="formData.phoneInput"
                            placeholder="numero di telefono" required />
                    </div>
                </div>
                <h5 class="form-section-title mt-2">Località</h5>
                <div class="row form-group">
                    <div class="col-8 mb-3 form-column">
                        <label for="">Indirizzo</label>
                        <input type="text" class="form-control" id="AddressInput" v-model="formData.address" placeholder="indirizzo"
                            required />
                    </div>
                    <div class="col-8 mb-3 form-column">
                        <label for="">CAP</label>
                        <input type="text" class="form-control" id="CAPInput" v-model="formData.CAPInput" placeholder="cap"
                            required @change="registrationStore.changeCAP(formData.CAPInput)" />
                    </div>
                    <div class="col-8 mb-3 form-column">
                        <label for="">Comune</label>
                        <div class="dropdown d-flex justify-content-center mb-3">
                            <button
                                class="btn dropdown-toggle cap-dropdown d-flex justify-content-between align-items-center"
                                type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                                <span class="dropdown-text" :class="{ 'town-not-selected': townData == '' }">{{
                                    dropDownString }}</span>
                                <span class="dropdown-icon"></span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" role="menu">
                                <li v-if="towns.length == 0">
                                    <a class="dropdown-item disabled"
                                        @click="registrationStore.setSelectedTown('', '')" href="#">Inserisci il cap</a>
                                </li>
                                <li v-if="towns.length > 0">
                                    <a v-for="   town    in    towns   " v-bind:key="town.istatCode"
                                        class="dropdown-item" @click="registrationStore.setSelectedTown(town.municipality, town.istatCode)" 
                                        href="#">{{
                                            town.municipality }}</a>
                                </li>
                            </ul>
                        </div>
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

label {
    color: var(--bs-secondary);
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

</style>