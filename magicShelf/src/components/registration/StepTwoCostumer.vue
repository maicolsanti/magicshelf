<script setup>
import { useRegistrationStore } from '@/stores/registration'
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { addIcons } from 'oh-vue-icons'
import { MdVisibilityoffRound, MdVisibilityRound } from 'oh-vue-icons/icons'

addIcons(MdVisibilityRound, MdVisibilityoffRound);
const registrationStore = useRegistrationStore();
const { registration, getPasswordType, getTowns, getTownString, getRegistrationDataError } = storeToRefs(registrationStore);

const passwordInputType = computed(() => getPasswordType.value);
const dropDownString = computed(() => getTownString.value);
const towns = computed(() => getTowns.value);
const getDataError = computed(() => getRegistrationDataError.value);

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

</script>

<template>
    <main>
        <b-alert v-if="registration.registrationDataError" variant="danger" class="d-flex justify-content-center alert">Compila correttamente i dati</b-alert>
        <h2 class="welcome d-flex justify-content-center my-5">
            Ciao cliente,<br />inserisci i tuoi dati per completare la registrazione
        </h2>
        <form id="costumerRegistration" v-on:submit.prevent="checkDataValidity()" action="" method="post">
            <div class="form-g mb-5">
                <div class="form-group mb-3">
                    <label for="">Nome</label>
                    <input type="text" class="form-control" id="nameInput" v-model="nameInput" placeholder="nome" required />
                </div>
                <div class="form-group mb-3">
                    <label for="">Cognome</label>
                    <input type="text" class="form-control" id="surnameInput" v-model="surnameInput" placeholder="cognome" required />
                </div>
                <div class="form-group mb-3">
                    <label for="">Email</label>
                    <input type="email" class="form-control" id="emailInput" v-model="emailInput" placeholder="indirizzo email" required />
                </div>
                <div class="form-group mb-3">
                    <label for="">Telefono</label>
                    <input type="tel" class="form-control" id="phoneInput" v-model="phoneInput" placeholder="numero di telefono" required />
                </div>
                <div class="form-group mb-3">
                    <label for="">CAP</label>
                    <input type="text" class="form-control" id="CAPInput" v-model="CAPInput" placeholder="cap" required
                        @change="registrationStore.changeCAP(this.CAPInput)" />
                </div>
                <div class="dropdown d-flex justify-content-center mb-3">
                    <button class="btn dropdown-toggle cap-dropdown d-flex justify-content-between align-items-center"
                        type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                        <span class="dropdown-text">{{ dropDownString }}</span>
                        <span class="dropdown-icon"></span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" role="menu">
                        <li>
                            <a v-if="towns.length == 0" class="dropdown-item disabled"
                                @click="registrationStore.setSelectedTown(town.name)" href="#">Inserisci il cap</a>
                            <a v-if="towns.length > 0" v-for="town in towns" v-bind:key="town.name"
                                class="dropdown-item" @click="registrationStore.setSelectedTown(town.name)"
                                href="#">{{ town.name }}</a>
                        </li>
                    </ul>
                </div>
                <div class="form-group row">
                    <label for="">Password</label>
                    <div class="col-md-13 input-group">
                        <input :type="passwordInputType" class="form-control mb-5" id="passwordInput" v-model="passwordInput"
                            placeholder="password" required />
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
                <button type="submit" class="btn btn-primary form-button mb-2">
                    Registrati
                </button>
            </div>
        </form>

    </main>
</template>


<style scoped>
.form-g {
    justify-self: center;
    justify-items: center;
    width: 350px;
}

input {
    border-color: var(--bs-secondary);
    border-width: 1px;
    height: 40px;
    min-width: 350px;
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

.alert {
    color: red;
}
</style>