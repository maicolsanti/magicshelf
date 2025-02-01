<script setup lang="ts">
import '@/assets/scss/custom-css.css'
import { FoundProduct } from '@/models/found_product';
import { useSupplierStore } from '@/stores/supplier';
import { computed, reactive } from 'vue';

const supplierStore = useSupplierStore();

const props = defineProps({
    product: {
        type: FoundProduct,
        required: true
    }
})

const openEditDialog = computed(() => supplierStore.editShouldBeOpen);

let productQ = supplierStore.productMaterialSituation.materialQuantity;

let formData = reactive({
  description: props.product.materialDescription,
  brand: props.product.materialBrand,
  unitOfMeasure: props.product.materialUnitOfMeasure,
  unitPrice: props.product.materialUnitPrice,
  quantity: productQ,
  image: props.product.imageBase64
})

function onFilePicked (event) {
  const image = event.target.files[0];
  this.formData.image = image;
}

function editProduct() {
  supplierStore.editProduct(props.product.materialId, formData.description, formData.brand, formData.unitOfMeasure, formData.unitPrice, formData.quantity, formData.image, props.product);
}

function closeDialog() {
 supplierStore.closeEditProductDialog();
}

</script>

<template>
<div
      :visible="openEditDialog"
      title="Prodotto"
      @close="supplierStore.closeEditProductDialog()"
      class=" dialog justify-content-center align-items-center"
    >
    <div class="dialog-content">
        <form @submit.prevent="supplierStore.closeEditProductDialog()">
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
          <label for="unitOfMeasure" class="form-label">Unità di misura</label>
          <input type="text" class="form-control" id="unitOfMeasure" v-model="formData.unitOfMeasure"
          placeholder="1 pz" required />
        </div>
          <div class="mb-3 flex-item">
          <label for="unitPrice" class="form-label">Prezzo</label>
          <input type="number" class="form-control" id="unitPrice" v-model="formData.unitPrice"
          placeholder="0" required/>
        </div>
      </div>
        <div class="mb-3">
          <label for="quantity" class="form-label">Quantità in magazzino</label>
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
          <button type="reset" @click="closeDialog()" class="btn btn-secondary primary-button">Chiudi</button>
          <button type="submit" @click="editProduct()" class="btn btn-primary primary-button">Salva</button>
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
