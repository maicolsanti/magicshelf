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
          <button type="reset" @click="supplierStore.closeDeleteProductDialog()" class="btn btn-secondary dialog-button">Annulla</button>
          <button type="submit" @click="supplierStore.deleteMaterialSituation(props.productId);" class="btn btn-primary dialog-button">Elimina</button>
        </div>
          
    </div>
    </div>
</template>

<style scoped>

.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog .dialog-content {
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px
}
</style>
