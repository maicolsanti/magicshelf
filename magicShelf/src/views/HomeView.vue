<script setup>
import SearchInstructions from '@/components/home/SearchInstructions.vue'
import SupplierLink from '@/components/home/SupplierLink.vue'
import { useConfigurationStore } from '@/stores/configurations'
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const confStore = useConfigurationStore();
const { configurations } = storeToRefs(confStore);

const isLoggedIn = computed(() => confStore.isLoggedIn);

</script>

<template>
  <main>
    <h1 class="welcome mb-4">Benvenut*,<br>qui potrai trovare ciò che cerchi
    </h1>
    <div class="d-grid gap-2 mb-1" v-if="!isLoggedIn">
      <RouterLink to="/login" class="login-link primary-button">
        <button type="button" class="btn btn-primary py-2 primary-button">
          Accedi per iniziare la ricerca
        </button>
      </RouterLink>
    </div>
    <div class="d-grid gap-2 mb-1" v-if="isLoggedIn">
      <RouterLink to="/search" class="login-link primary-button">
        <button type="button" class="btn btn-primary py-2 primary-button">
          Vai alla ricerca
        </button>
      </RouterLink>
    </div>
    <SupplierLink v-if="!isLoggedIn" />
    <SearchInstructions v-if="!isLoggedIn" />
    <!-- TODO: add about us for when user is logged in -->
  </main>
</template>


<style scoped>

.login-link {
  color: var(--bs-dark);
  text-decoration: none;
}
</style>