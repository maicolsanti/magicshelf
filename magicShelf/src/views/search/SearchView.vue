<script setup lang="ts">
import { useConfigurationStore } from '@/stores/configurations';
import { useSearchStore } from '@/stores/search';
import { useProductsStore } from '@/stores/product';
import { useSupplierStore } from '@/stores/supplier';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { PriceRange } from '@/models/prince-ranges';
import { DistanceRange } from '@/models/distance-range';
import SearchedProductCard from '../../components/search/SearchedProductCard.vue'
import SupplierView from './SupplierView.vue';

const confStore = useConfigurationStore();
const searchStore = useSearchStore();
const productStore = useProductsStore();
const supplierStore = useSupplierStore();
const { priceRangeOptions, distanceRangeOptions } = storeToRefs(searchStore);

// Get or Update user data
confStore.getProfile();

const isLoggedIn = computed(() => confStore.isLoggedIn);
const selectedSupplierId = computed(() => supplierStore.selectedSupplierId);
const selectedProductId = computed(() => supplierStore.selectedProductId);
const user = computed(() => confStore.getUserData);

// Defaults dropdowns strings
let priceString = "Fascia di prezzo";
let distanceString = "Nel tuo comune";

// Filters
let searchFilters = {
    product: "",
    brand: "",
    supplier: "",
    cap: user.value.cap,
    priceRange: null,
    distanceRange: DistanceRange.SAMEISTATCODE
};

// Set Price Range
function changePriceRange(priceRange) {
    searchFilters.priceRange = priceRange;
    priceString = findPriceString(priceRange);
    searchStore.changePriceRange(priceRange);
}

// Set Distance Range
function changeDistanceRange(distanceRange) {
    searchFilters.distanceRange = distanceRange;
    distanceString = findDistanceString(distanceRange);
    searchStore.changeDistanceRange(distanceRange);
}

// Get price range string
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

// Get distance range string
function findDistanceString(distanceRange) {
    switch (distanceRange) {
        case DistanceRange.SAMEISTATCODE:
            return 'Nel tuo comune'
        case DistanceRange.NOTSAMEISTATCODE:
            return 'Fuori dal tuo comune'
    }
}

// Search
function submit() {
    productStore.setFilters(searchFilters.product, searchFilters.brand, searchFilters.supplier, searchFilters.cap, searchStore.searchAttributes.priceRange, searchStore.searchAttributes.distanceRange).then(() => {
        productStore.getFilteredProducts();
        supplierStore.fetchAllMaterialSituations();
    });
}
</script>

<template>
    <main class="margin-content">
        <div class="d-grid gap-2 mb-1" v-if="!isLoggedIn">
            <RouterLink to="/loginCostumer" class="login-link login-button">
                <button type="button" class="btn btn-primary py-2 login-button">
                    Accedi per iniziare la ricerca
                </button>
            </RouterLink>
        </div>
        <div v-if="isLoggedIn && selectedSupplierId == null">
            <h4 class="welcome d-flex my-5">
                Cerca qui, gli articoli
            </h4>
            <form id="searchFilters" class="form-g mb-5" action="" method="post">
                <div class="container">
                    <div class="row form-group  d-flex justify-content-center">
                        <div class="col-4 mb-3 form-column">
                            <label for="">Cosa cerchi?</label>
                            <input type="text" class="form-control mb-3" id="productInput"
                                v-model="searchFilters.product" placeholder="prodotto" required />
                            <div class="row d-flex">
                                <div id="firstColumn" class="col-2 form-column small">
                                    <div class="dropdown d-flex mb-3">
                                        <button
                                            class="btn dropdown-toggle cap-dropdown d-flex justify-content-between align-items-center"
                                            type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                            aria-expanded="true">
                                            <span class="dropdown-text"
                                                :class="{ 'not-selected': searchFilters.priceRange == null }">{{
                                                    priceString }}</span>
                                            <span class="dropdown-icon"></span>
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" role="menu">
                                            <li>
                                                <a v-for="   priceRange in priceRangeOptions   "
                                                    v-bind:key="priceRange" class="dropdown-item"
                                                    :class="{ 'disabled': searchFilters.priceRange == priceRange }"
                                                    @click="changePriceRange(priceRange)" href="#">
                                                    {{ findPriceString(priceRange) }}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div id="secondColumn" class="col-2 form-column small">
                                    <div class="dropdown d-flex mb-3">
                                        <button
                                            class="btn dropdown-toggle cap-dropdown d-flex justify-content-between align-items-center"
                                            type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown">
                                            <span class="dropdown-text"
                                                :class="{ 'not-selected': searchFilters.distanceRange == null }">{{
                                                    distanceString }}</span>
                                            <span class="dropdown-icon"></span>
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" role="menu">
                                            <li>
                                                <a v-for="   distanceRange in distanceRangeOptions   "
                                                    v-bind:key="distanceRange" class="dropdown-item"
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
                    <div class="row form-group d-flex justify-content-center">
                        <div class="col-4 mb-3 form-column">
                            <label for="">CAP</label>
                            <input type="text" class="form-control" id="capInput" v-model="searchFilters.cap"
                                placeholder="il tuo cap" required />
                        </div>
                    </div>
                </div>
            </form>
            <div class="row d-flex justify-content-between my-5">
                <div class="col-9">
                    <h4 class="welcome d-flex">
                        Puoi trovare il prodotto che cerchi presso...
                    </h4>
                </div>
                <div class="col-3 d-flex justify-content-end">
                    <button @click="submit" type="submit" class="btn btn-primary py-2 primary-button">Cerca</button>
                </div>
            </div>
            <SearchedProductCard :cap="searchFilters.cap" />
        </div>
        <div v-if="isLoggedIn && selectedSupplierId != null && selectedProductId != null">
            <SupplierView :supplierId="selectedSupplierId" :productId="selectedProductId" :filterCap="searchFilters.cap" />
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

label {
    color: var(--bs-primary);
}

.dropdown-select {
    padding-left: 0px;
}

.cap-dropdown {
    max-width: 350px;
    width: 350px;
    border-color: var(--bs-primary);
}

.not-selected {
    color: var(--bs-primary);
    opacity: 0.5;
}

.small {
    max-width: 175px;
}

.dropdown-text {
    font-size: small;
}
</style>