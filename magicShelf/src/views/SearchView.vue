<script setup>
import { useConfigurationStore } from '@/stores/configurations';
import { useSearchStore } from '@/stores/search';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { PriceRange } from '@/models/prince-ranges';

const confStore = useConfigurationStore();
const searchStore = useSearchStore();
const { priceRangeOptions, getPriceRangeString } = storeToRefs(searchStore);

const isLoggedIn = computed(() => confStore.isLoggedIn);
const priceString = computed(() => searchStore.getPriceRangeString.value);

let searchFilters = {
    product: "",
    brand: "",
    supplier: "",
    cap: "",
    priceRange: "",
    distanceRange: ""
};

function changePriceRange(priceRange) {
    searchFilters.priceRange = priceRange;
    searchStore.changePriceRange(priceRange);
}

function findString(priceRange) {
    let s = searchStore.getPriceRangeString(priceRange);
    return s;
}

</script>

<template>
    <main class="margin-content">
        <div class="d-grid gap-2 mb-1" v-if="!isLoggedIn">
            <RouterLink to="/login" class="login-link login-button">
                <button type="button" class="btn btn-primary py-2 login-button">
                    Accedi per iniziare la ricerca
                </button>
            </RouterLink>
        </div>
        <div v-if="isLoggedIn">
            <h4 class="welcome d-flex my-5">
                Cerca qui, gli articoli
            </h4>


            <form id="searchFilters" class="form-g mb-5" action="" method="post">
                <div class="container">
                    <div class="row form-group  d-flex justify-content-center">
                        <div class="col-4 mb-3 form-column">
                            <label for="">Cosa cerchi?</label>
                            <input type="text" class="form-control" id="productInput" v-model="searchFilters.product"
                                placeholder="prodotto" required />
                            <div class="row form-group">

                                <div class="col-4 mb-3 form-column">
                                    <label for="">Prezzo</label>
                                    <div class="dropdown d-flex justify-content-center mb-3">
                                        <button
                                            class="btn dropdown-toggle cap-dropdown d-flex justify-content-between align-items-center"
                                            type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                            aria-expanded="true">
                                            <span class="dropdown-text"
                                                :class="{ 'town-not-selected': priceRange == '' }">{{
                                                    priceString }}</span>
                                            <span class="dropdown-icon"></span>
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" role="menu">
                                            <li>
                                                <a v-for="   priceRange    in    priceRangeOptions   "
                                                    v-bind:key="searchFilters.priceRange" class="dropdown-item"
                                                    @click="changePriceRange(priceRange)" href="#">
                                                    inserire prezzo</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-4 mb-3 form-column">
                            <label for="">Marca</label>
                            <input type="text" class="form-control" id="brandInput" v-model="searchFilters.brand"
                                placeholder="marca" required />
                        </div>
                        <div class="col-4 mb-3 form-column">
                            <label for="">Fornitore</label>
                            <input type="text" class="form-control" id="supplierInput" v-model="searchFilters.supplier"
                                placeholder="fornitore" required />
                        </div>
                    </div>
                    <div class="row form-group d-flex  d-flex justify-content-center">
                        <div class="col-4 mb-3 form-column">
                            <label for="">CAP</label>
                            <input type="text" class="form-control" id="capInput" v-model="searchFilters.cap"
                                placeholder="il tuo cap" required />
                        </div>
                    </div>
                    <!-- <div class="row form-group">
                        <div class="col-4 mb-3 form-column">
                            <label for="">Email</label>
                            <input type="email" class="form-control" id="emailInput" v-model="formData.emailInput"
                                placeholder="indirizzo email" required />
                        </div>
                        <div class="col-4 mb-3 form-column">
                            <label for="">Telefono</label>
                            <input type="tel" class="form-control" id="phoneInput" v-model="formData.phoneInput"
                                placeholder="numero di telefono" required />
                        </div>
                    </div>
                    <h5 class="form-section-title mt-2">Località</h5>
                    <div class="row form-group">
                        <div class="col-4 mb-3 form-column">
                            <label for="">CAP</label>
                            <input type="text" class="form-control" id="CAPInput" v-model="formData.CAPInput"
                                placeholder="cap" required @change="registrationStore.changeCAP(formData.CAPInput)" />
                        </div>
                        <div class="col-4 mb-3 form-column">
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
                                    <li>
                                        <a v-if="towns.length == 0" class="dropdown-item disabled"
                                            @click="registrationStore.setSelectedTown(town.name)" href="#">Inserisci il
                                            cap</a>
                                        <a v-if="towns.length > 0" v-for="   town in towns   " v-bind:key="town.name"
                                            class="dropdown-item" @click="registrationStore.setSelectedTown(town.name)"
                                            href="#">{{
                                                town.name }}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div> -->
                    <!-- <h5 class="form-section-title mt-1">Account</h5>
                    <div class="row form-group">
                        <div class="col-4 mb-3 form-column">
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
                    </div> -->
                </div>
                <!-- <div class="d-flex justify-content-center">
                    <button @click="submit" class="btn btn-primary form-button mb-2">
                        Registrati
                    </button>
                </div> -->

            </form>


        </div>
    </main>
</template>


<style scoped>
input {
    border-color: var(--bs-primary);
    border-width: 1px;
    height: 40px;
    max-width: 350px;
}

::placeholder {
    color: var(--bs-primary);
    opacity: 0.4;
}

label {
    color: var(--bs-primary);
}

.input-group {
    max-width: 350px;
}

.dropdown {
    max-width: 350px;
    height: 40px;
}

.dropdown-select {
    max-width: 350px;
    height: 36px;
    border-color: var(--bs-secondary);
    border-radius: 6px;
    padding-left: 10px;
}

.cap-dropdown {
    max-width: 350px;
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
</style>