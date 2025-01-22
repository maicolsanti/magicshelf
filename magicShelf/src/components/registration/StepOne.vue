<script setup lang="ts">
import { useRegistrationStore } from '@/stores/registration'
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { UserType } from '@/models/user-type'

const registrationStore = useRegistrationStore();
const { registration, getDropdownString } = storeToRefs(registrationStore);

const dropDownString = computed(() => getDropdownString.value);

</script>

<template>
    <main>
        <div class="d-flex justify-content-center mb-3">
            <h5 class="mt-5 step-instruction">Seleziona il tipo di utente</h5>
        </div>
        <div class="dropdown d-flex justify-content-center mb-5">
            <button class="btn dropdown-toggle user-type-dropdown d-flex justify-content-between align-items-center"
                type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                <span class="dropdown-text">{{ dropDownString }}</span>
                <span class="dropdown-icon"></span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" role="menu">
                <li>
                    <a class="dropdown-item" :class="{ 'disabled': registration.userType == UserType.COSTUMER }"
                        @click="registrationStore.setSelectedUserType(UserType.COSTUMER)" href="#">Cliente</a>
                    <a class="dropdown-item" :class="{ 'disabled': registration.userType == UserType.SUPPLIER }"
                        @click="registrationStore.setSelectedUserType(UserType.SUPPLIER)" href="#">Fornitore</a>
                </li>
            </ul>
        </div>
        <div class="d-flex justify-content-center">
            <button @click="registrationStore.nextStep()" class="btn btn-primary form-button mb-2"
                :class="{ 'disabled': registration.userType == UserType.NOTSELECTED }">
                Continua
            </button>
        </div>
        <RouterLink to="/login" class="nav-link inactive-page" active-class="active-page">
            <p class="form-alternative">
                Hai già un account?<br /><span class="form-alternative-a">Accedi</span>
            </p>
        </RouterLink>
    </main>
</template>
  
  
<style scoped>
.step-instruction {
    font-weight: lighter;
}

.dropdown-menu {
    width: 200px;
}

.user-type-dropdown {
    width: 200px;
    align-content: start;
    align-items: start;
    justify-items: stretch;
    border-color: var(--bs-primary);
    border-width: 2px;
}
</style>