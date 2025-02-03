<script setup lang="ts">
import '@/assets/scss/custom-css.css'
import { useSupplierStore } from '@/stores/supplier';
import { computed } from 'vue';

const supplierStore = useSupplierStore();

const props = defineProps({
    productId: {
        type: Number,
        required: true
    }
})

const openDeleteDialog = computed(() => supplierStore.deleteShouldBeOpen);

</script>

<template>
<div
      :visible="openDeleteDialog"
      title="Prodotto"
      @close="supplierStore.closeDeleteProductDialog()"
      class="dialog justify-content-center align-items-center"
    >
    <div class="dialog-content">
        <h3 class="mb-4">Sei sicuro di volere eliminare questo prodotto?</h3>
        <div class="button-group">
          <button type="reset" @click="supplierStore.closeDeleteProductDialog()" class="btn btn-secondary primary-button">Annulla</button>
          <button type="submit" @click="supplierStore.deleteMaterialSituation(props.productId);" class="btn btn-primary primary-button">Elimina</button>
        </div>
          
    </div>
    </div>
</template>

<style scoped>
.primary-button {
  max-width: 100px;
}
</style>