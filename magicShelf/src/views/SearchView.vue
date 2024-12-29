<script setup lang="ts">
import { useConfigurationStore } from '@/stores/configurations';
import { useSearchStore } from '@/stores/search';
import { useProductsStore } from '@/stores/product';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { PriceRange } from '@/models/prince-ranges';
import { DistanceRange } from '@/models/distance-range';

const confStore = useConfigurationStore();
const searchStore = useSearchStore();
const productStore = useProductsStore();
const { priceRangeOptions, distanceRangeOptions } = storeToRefs(searchStore);

const isLoggedIn = computed(() => confStore.isLoggedIn);
const products = computed(() => productStore.products);

let user = confStore.getUserData;

let priceString = "Fascia di prezzo";
let distanceString = "Zona di ricerca";

let searchFilters = {
    product: "",
    brand: "",
    supplier: "",
    cap: user.cap,
    priceRange: null,
    distanceRange: null
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

function submit() {
    productStore.setFilters(searchFilters.product, searchFilters.brand, searchFilters.supplier, searchFilters.cap, searchFilters.priceRange, searchFilters.distanceRange);
    //TODO: aggiorna lista prodotti trovati
    productStore.fetchSearchedProducts();
    console.log("products --> ", products);
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
                            <input type="text" class="form-control mb-3" id="productInput"
                                v-model="searchFilters.product" placeholder="prodotto" required />
                            <div class="row d-flex justify-content-center">

                                <div id="firstColumn" class="col-2 form-column small">
                                    <div class="dropdown small d-flex justify-content-center mb-3">
                                        <button
                                            class="btn dropdown-toggle cap-dropdown d-flex justify-content-between align-items-center"
                                            type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                            aria-expanded="true">
                                            <span class="dropdown-text"
                                                :class="{ 'town-not-selected': searchFilters.priceRange == null }">{{
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
                                    <div class="dropdown small d-flex justify-content-center mb-3">
                                        <button
                                            class="btn dropdown-toggle cap-dropdown d-flex justify-content-between align-items-center"
                                            type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                            aria-expanded="true">
                                            <span class="dropdown-text"
                                                :class="{ 'not-selected': searchFilters.distanceRange == '' }">{{
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
                    <div class="row form-group d-flex  d-flex justify-content-center">
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
            <div class="product-list">
                <div v-for="product in products" :key="product.id">
                <div class="product-card">
                    <div class="row align-items-center">
                        <div class="col-7">
                            <div class="row">
                                <div class="col-12 bolder-text">
                                    <!-- TODO: add institution -->
                                    <span>{{ product.product.supplier.companyName }}</span> <span class="address">{{ product.product.supplier.address }}</span>
                                </div>
                                <div class="col-12 bolder-text">
                                    {{ product.product.description }}
                                </div>
                            </div>
                        </div>
                        <div class="col-5">
                            <div class="row">
                                <div class="col-6">
                                    <span class="badge">{{ product.distanceInKm }} km</span>
                                </div>
                                <div class="col-6">
                                    <span class="badge">€{{ product.product.unitPrice }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <!-- <div class="col-md-4" v-for="prodotto in prodotti" :key="prodotto.id">
                <div class="card">
                    <img src="https://via.placeholder.com/150" class="card-img-top" alt="Immagine prodotto">
                    <div class="card-body">
                        <h5 class="card-title">{{ prodotto.nome }}</h5>
                        <p class="card-text">{{ prodotto.descrizione }}</p>
                        <p class="card-text"><strong>€{{ prodotto.prezzo.toFixed(2) }}</strong></p>
                    </div>
                </div>
            </div> -->
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
.product-card {
    border: solid;
    border-color: var(--bs-secondary);
    border-radius: 6px;
    border-width: 2px;
    padding: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.badge {
    max-width: 300px;
    font-weight: normal;
    background-color: var(--bs-secondary);
}
.bolder-text {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.2;
}
.address {
    font-weight: lighter;
    font-size: 14px;
    line-height: 1.2;
}
</style>