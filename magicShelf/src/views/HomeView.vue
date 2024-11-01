<script setup>
import SearchInstructions from '@/components/home/SearchInstructions.vue'
import SupplierLink from '@/components/home/SupplierLink.vue'
import { useConfigurationStore } from '@/stores/configurations'
import { storeToRefs } from 'pinia';

const confStore = useConfigurationStore();
const { configurations } = storeToRefs(confStore);
</script>

<template>
  <main>
    <h1 class="welcome mb-4">Benvenut*,<br>qui potrai trovare ciò che cerchi
    </h1>
    <div class="d-grid gap-2 mb-1" v-if="!configurations.isLoggedIn">
      <button type="button" class="btn btn-primary py-2 login-button">Accedi per iniziare la ricerca</button>
    </div>
    <SupplierLink v-if="!configurations.isLoggedIn" />
    <SearchInstructions v-if="!configurations.isLoggedIn" />
  </main>
</template>


<style scoped>
.login-button {
  max-width: 350px;
}
</style>