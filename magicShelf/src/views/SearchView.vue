<script setup>
import { useConfigurationStore } from '@/stores/configurations';
import { useSearchStore } from '@/stores/search';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { PriceRange } from '@/models/prince-ranges';
import { DistanceRange } from '@/models/distance-range';

const confStore = useConfigurationStore();
const searchStore = useSearchStore();
const { priceRangeOptions, distanceRangeOptions, getPriceRange } = storeToRefs(searchStore);

const isLoggedIn = computed(() => confStore.isLoggedIn);
const priceRangeSelected = computed(() => getPriceRange.value);

let priceString = "Fascia di prezzo";
let distanceString = "Zona di ricerca";

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
    priceString = findPriceString(priceRange);
    searchStore.changePriceRange(priceRange);
}

function changeDistanceRange(distanceRange) {
    searchFilters.distanceRange = distanceRange;
    distanceString = findDistanceString(distanceRange);
    searchStore.changeDistanceRange(distanceRange);
}

function findPriceString(priceRange) {
    switch (priceRange) {
        case PriceRange.NOTSELECTED:
            return 'Nessun range'
        case PriceRange.ZEROTEN:
            return '0-10'
        case PriceRange.TENTWENTYFIVE:
            return '10-25'
        case PriceRange.TWENTYFIVEFIFTY:
            return '25-50'
        case PriceRange.FIFTYHUNDRED:
            return '50-100'
    }
}

function findDistanceString(distanceRange) {
    switch (distanceRange) {
        case DistanceRange.NOTSELECTED:
            return 'Nessun range'
        case DistanceRange.LESSTHENFIVE:
            return '< 5km'
        case DistanceRange.LESSTHENTWENTY:
            return '< 20km'
        case DistanceRange.LESSTHENFIFTY:
            return '< 50km'
        case DistanceRange.LESSTHENHUNDRED:
            return '< 100km'
        default:
            return 'Seleziona'
    }
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
                            <input type="text" class="form-control mb-3" id="productInput" v-model="searchFilters.product"
                                placeholder="prodotto" required />
                            <div class="row d-flex justify-content-center">

                                <div id="firstColumn" class="col-2 form-column small">
                                    <div class="dropdown small d-flex justify-content-center mb-3">
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
                                                    :class="{ 'disabled': searchFilters.priceRange == priceRange }"
                                                    @click="changePriceRange(priceRange)" href="#">
                                                    {{ findPriceString(priceRange) }}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div id="secondColumn" class="col-2 form-column small">
                                    <div class="dropdown small d-flex justify-content-center mb-3">
                                        <button
                                            class="btn dropdown-toggle cap-dropdown d-flex justify-content-between align-items-center"
                                            type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                            aria-expanded="true">
                                            <span class="dropdown-text" :class="{ 'not-selected': distanceRange == '' }">{{
                                                distanceString }}</span>
                                            <span class="dropdown-icon"></span>
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" role="menu">
                                            <li>
                                                <a v-for="   distanceRange    in    distanceRangeOptions   "
                                                    v-bind:key="searchFilters.distanceRange" class="dropdown-item"
                                                    :class="{ 'disabled': searchFilters.distanceRange == distanceRange }"
                                                    @click="changeDistanceRange(distanceRange)" href="#">
                                                    {{ findDistanceString(distanceRange) }}</a>
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
                </div>
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
    border-color: var(--bs-primary);
    border-radius: 6px;
    padding-left: 10px;
}

.cap-dropdown {
    max-width: 350px;
    width: 350px;
    align-content: start;
    align-items: start;
    justify-items: stretch;
    border-color: var(--bs-primary);
}

.not-selected {
    color: var(--bs-primary);
    opacity: 0.5;
}

.small {
    max-width: 165px;
}
</style>