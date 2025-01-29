<script setup lang="ts">
import { useSupplierStore } from '@/stores/supplier';
import { useConfigurationStore } from '@/stores/configurations';
import { computed } from 'vue';
import { addIcons} from 'oh-vue-icons';
import { FaEdit, MdDeleteforeverOutlined } from 'oh-vue-icons/icons';
import AddProductDialog from '@/components/supplier-products/AddProductDialog.vue';
import EditProductDialog from '@/components/supplier-products/EditProductDialog.vue';
import DeleteProductDialog from '@/components/supplier-products/DeleteProductDialog.vue';

addIcons(FaEdit, MdDeleteforeverOutlined);

const supplierStore = useSupplierStore();
const configStore = useConfigurationStore();

const supplierId = configStore.isLoggedIn ? configStore.configurations.userData.id : null;

supplierStore.fetchSupplierById(supplierId);

const products = computed(() => supplierStore.supplierFetchedProducts);
const openNewDialog = computed(() => supplierStore.shouldBeOpen);
const openEditDialog = computed(() => supplierStore.editShouldBeOpen);
const openDeleteDialog = computed(() => supplierStore.deleteShouldBeOpen);

let productSelected = null;

function openNewPDialog() {
  supplierStore.openNewProductDialog();
}

function openEditPDialog(product) {
  productSelected = product;
  console.log("detail product id: ", productSelected.materialId);
  supplierStore.openEditProductDialog(productSelected.materialId);
}

function openDeletePDialog(product) {
  productSelected = product;
  console.log("FOR DELETE - detail product id: ", productSelected.materialId);
  supplierStore.openDeleteProductDialog(productSelected.materialId);
}

</script>

<template>
  <main class="mt-5 d-flex flex-grow justify-content-center">
    <section class="width supplier-products mt-5 w-100">
      <h3 class="font-lighter">Ecco la lista dei tuoi prodotti</h3>
      <button type="button" class="btn btn-primary py-2 mt-4 primary-button" @click="openNewPDialog()">
          Aggiungi un nuovo prodotto
        </button>
        <li v-for="product in products" :key="product.materialId" class="product-item mt-3">
          <div class="product-details">
            <img v-bind:src="'data:image/jpeg;base64,'+product.imageBase64" class="product-image"/>
            <span class="bold product-description">{{ product.materialDescription }}</span>
          </div>
          <div class="icons">
            <div class="badge d-flex justify-content-center align-items-center">
            <span class="price text-light">€ {{ product.materialUnitPrice }}</span>
          </div>
            <v-icon name="md-deleteforever-outlined" class="icon delete-icon" @click="openDeletePDialog(product)"/>
            <v-icon name="fa-edit" class="icon edit-icon" @click="openEditPDialog(product)"/>
          </div>
        </li>
    </section>
    <AddProductDialog v-if="openNewDialog"></AddProductDialog>
    <EditProductDialog v-if="openEditDialog" v-bind:product="productSelected"></EditProductDialog>
    <DeleteProductDialog v-if="openDeleteDialog" v-bind:productId="productSelected.materialId"></DeleteProductDialog>
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

.width {
  max-width: 500px;
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
  max-height: 60px;
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
  flex-wrap: wrap;
  min-width: 165px;
  justify-content: space-between;
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

.product-details {
  display: flex;
  align-items: center;
  gap: 10px;
}

.product-description {
  flex: 1;
}

.icons {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  height: 24px;
  width: 24px;
}

.edit-icon:active {
  color: var(--bs-primary);
}

.delete-icon:active {
  color: red;
}

</style>
