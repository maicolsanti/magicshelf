<script setup lang="ts">
import '@/assets/scss/custom-css.css'
import { useConfigurationStore } from '@/stores/configurations';
import { useSupplierStore } from '@/stores/supplier';
import { computed, reactive } from 'vue';

const supplierStore = useSupplierStore();
const configStore = useConfigurationStore();

const openNewDialog = computed(() => supplierStore.shouldBeOpen);

let formData = reactive({
  description: "",
  brand: "",
  unitOfMeasure: "",
  unitPrice: 0,
  quantity: 0,
  image: null
})

function onFilePicked (event) {

  const image = event.target.files[0];
  this.formData.image = image;
}

function addProduct() {
  supplierStore.insertNewProduct(formData.description, formData.brand, formData.unitOfMeasure, formData.unitPrice, formData.quantity, formData.image, configStore.getUserData.id);
}

function closeDialog() {
 supplierStore.closeNewProductDialog();
}

</script>

<template>
<div
      :visible="openNewDialog"
      title="Aggiungi un nuovo prodotto"
      @close="supplierStore.closeNewProductDialog()"
      class=" dialog justify-content-center align-items-center"
    >
    <div class="dialog-content">
        <form @submit.prevent="supplierStore.closeNewProductDialog()">
        <div class="mb-3">
          <label for="productDescription">Descrizione</label>
          <input type="text" class="form-control" id="description" v-model="formData.description"
          placeholder="descrizione" required />
        </div>
        <div class="mb-3">
          <label for="productName" class="form-label">Marca</label>
          <input type="text" class="form-control" id="brand" v-model="formData.brand"
          placeholder="marca" required />
        </div>
        <div class="row-group">
          <div class="mb-3 flex-item">
          <label for="price" class="form-label">Unità di misura</label>
          <input type="text" class="form-control" id="unitOfMeasure" v-model="formData.unitOfMeasure"
          placeholder="1 pz" required />
        </div>
          <div class="mb-3 flex-item">
          <label for="price" class="form-label">Prezzo</label>
          <input type="number" step=".01" class="form-control" id="unitPrice" v-model="formData.unitPrice"
          placeholder="0" required/>
        </div>
      </div>
        <div class="mb-3">
          <label for="price" class="form-label">Quantità in magazzino</label>
          <input type="number" class="form-control" id="quantity" v-model="formData.quantity"
          placeholder="0" required/>
        </div>
        <div class="mb-3">
        <label for="image">Immagine del prodotto</label>
        <input
          type="file"
          id="image"
          @change="onFilePicked($event)"
          class="form-control"
          accept="image/*"
        />
      </div>
        <div class="button-group">
          <button type="reset" @click="closeDialog()" class="btn btn-secondary primary-button">Annulla</button>
          <button type="submit" @click="addProduct()" class="btn btn-primary primary-button">Salva</button>
        </div>
          
      </form>
    </div>
    </div>
</template>

<style scoped>

.row-group {
  display: flex;
  gap: 15px;
}

.flex-item {
  flex: 1;
}

.primary-button {
  max-width: 100px;
}
</style>
