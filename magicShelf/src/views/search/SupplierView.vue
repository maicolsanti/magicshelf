<script setup lang="ts">
import { useSupplierStore } from '@/stores/supplier';
import { useConfigurationStore } from '@/stores/configurations';
import { computed } from 'vue';
import { addIcons} from 'oh-vue-icons';
import { HiLocationMarker, IoArrowBackCircleOutline, IoArrowBackCircle } from 'oh-vue-icons/icons';

addIcons(HiLocationMarker, IoArrowBackCircleOutline, IoArrowBackCircle);

const props = defineProps({
    supplierId: {
        type: Number,
        required: true
    },
    productId: {
        type: Number,
        required: true
    },
    filterCap: {
        type: String,
        required: true
    }
});

const supplierStore = useSupplierStore();
const confStore = useConfigurationStore();

confStore.getProfile();

const products = computed(() => supplierStore.supplierFetchedProducts);
const supplier = computed(() => supplierStore.supplier);
const location = computed(() => supplierStore.location);
const materialSituations = computed(() => supplierStore.materialSituations);

let selectedProduct = products.value.find(product => product.materialId === props.productId);

function setSelectedProduct(productId, supplierId) {
    supplierStore.setSelectedProduct(productId, supplierId);
    selectedProduct = products.value.find(product => product.materialId === productId);
}
</script>

<template>
  <div class="row align-items-end">
        <div class="col d-flex flex-column align-items-start">
            <button @click="supplierStore.setSupplierIdNull()"><v-icon name="io-arrow-back-circle" scale="2.3" class="navigation-icon" /></button>
        </div>
        <div class="col sub-page-title d-flex flex-column align-items-end">
            <h4>Dettaglio fornitore</h4>
        </div>
    </div>
  <main class="width mt-5">
    <div class="col-auto supplier-header">
      <h2 class="text-center bold">{{ supplier.companyName }}</h2>
      <div class="row justify-content-center align-items-center">
        <div class="col-1 supplier-icon">
            <v-icon name="hi-location-marker"
            class="visibility-icon" />
        </div>
        <p class="col-auto text-center font-lighter">{{ supplier.address }}<br>{{ location.municipality }} {{ location.cap }} {{ location.district }}</p>
      </div>
      <div v-if="supplier.cap == props.filterCap">
        <p class="text-center bold">Nelle tue vicinanze</p>
      </div>
      <div class="row product-highlight justify-content-between align-items-center mx-1 px-4 py-1">
        <div class="m-1">
          <img  v-if="selectedProduct.imageBase64 != null" v-bind:src="'data:image/jpeg;base64,'+selectedProduct.imageBase64" class="selected-product-image"/>
        </div>
        <div class="col-6">
          <span class="text-dark bold">{{ selectedProduct.materialDescription  }}</span>
        </div>
        <div class="col-6 badge my-1 d-flex justify-content-center align-items-center">
          <span class="price">€ {{ selectedProduct.materialUnitPrice }}</span>
        </div>
        <div class="d-flex justify-content-between my-1">
          <span class="text-dark light">{{ selectedProduct.materialBrand  }}</span>
          <span class="text-dark light">{{ selectedProduct.materialUnitOfMeasure  }}</span>
        </div>
      </div>
    </div>
    <section class="supplier-products mt-5">
      <h3 class="font-lighter">Tutti i prodotti del fornitore</h3>
        <li v-for="product in products" :key="product.materialId" class="product-item" @click="setSelectedProduct(product.materialId, props.supplierId)">
        <div v-if="materialSituations.find(materialSituation => materialSituation.materialId === product.materialId).materialQuantity > 0">
          <img  v-if="product.imageBase64 != null" v-bind:src="'data:image/jpeg;base64,'+product.imageBase64" class="product-image"/>
          <span class="bold product-description">{{ product.materialDescription }}</span>
          <span class="light product-description">{{ product.materialBrand }}</span>
        </div>
          <div class="badge d-flex justify-content-center align-items-center">
            <span class="price text-light">€ {{ product.materialUnitPrice }}</span>
          </div>
        </li>
    </section>
  </main>
</template>

<style scoped>
.navigation-icon {
    color: var(--bs-primary);
}

.sub-page-title {
    align-items: end;
    align-content: end;
}

button {
    background-color: unset;
    border: unset;
}

.width {
  max-width: 500px;
  min-width: 350px;
}

.supplier-header {
  background-color: var(--bs-primary);
  padding: 20px;
  border-radius: 30px;
  color: #fff;
  justify-content: space-between;
  align-items: center;
}

.supplier-info {
  display: flex;
  align-items: center;
  gap: 5px;
}

.supplier-icon img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
}

.product-highlight {
  background-color: #fff;
  border-radius: 30px;
}

.price {
  font-weight: bold;
  color: #fff;
}

.supplier-products {
  margin-top: 20px;
}

.supplier-products h3 {
  margin-bottom: 10px;
}

.font-lighter {
  font-weight: lighter;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid var(--bs-secondary);
  border-radius: 8px;
  margin-bottom: 10px;
}

.product-item .price {
  color: var(--bs-secondary);
  font-weight: bold;
}

.badge {
    max-width: 50px;
    font-weight: normal;
    height: 25px;
    background-color: var(--bs-secondary);
}

.bold {
  font-weight: bold;
}

.product-description {
  margin-left: 10px;
}

.selected-product-image {
  display: block;
  margin: 0 auto 10px auto; /* Centra l'immagine e aggiunge un margine inferiore */
  max-width: 100px; /* Adatta la dimensione secondo necessità */
  height: auto;
  border-radius: 8px; /* Opzionale per angoli arrotondati */
}

</style>
