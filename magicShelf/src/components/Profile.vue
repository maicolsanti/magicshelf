<template>
  <div class="profile-view">

    <!-- Stato di caricamento -->
    <div v-if="isLoading" class="loading">
      <p>Caricamento...</p>
    </div>

    <!-- Stato di errore -->
    <div v-else-if="error" class="error">
      <p>Si è verificato un errore durante il caricamento del profilo.</p>
    </div>

    <!-- Stato con il profilo -->
    <div v-else>
      <!-- Mostra il profilo corretto in base al tipo -->
      <ClienteProfile v-if="profileType === 'CUSTOMER'" />
      <FornitoreProfile v-else-if="profileType === 'SUPPLIER'" />
    </div>
  </div>
</template>

<script>
import { useConfigurationStore } from "@/stores/configurations"; // Import dello store Pinia
import ClienteProfile from "@/components/profile/ClientProfile.vue";
import FornitoreProfile from "@/components/profile/SupplierProfile.vue";

export default {
  name: "ProfileComponent",
  components: {
    ClienteProfile,
    FornitoreProfile,
  },
  data() {
    return {
      isLoading: true, // Stato iniziale: caricamento
      error: false,    // Stato iniziale: nessun errore
      profileType: "", // Tipo di profilo (CLIENTE o FORNITORE)
    };
  },
  methods: {
    async fetchProfile() {
      const configurationStore = useConfigurationStore();
      try {
        await configurationStore.getProfile(); // Usa l'azione dello store per recuperare il profilo
        this.profileType = configurationStore.configurations.userData.userType;
        console.log(this.profileType);
      } catch (error) {
        console.error("Errore durante il caricamento del profilo:", error);
        this.error = true; // Imposta lo stato di errore
      } finally {
        this.isLoading = false; // Fine del caricamento
      }
    },
  },
  mounted() {
    this.fetchProfile(); // Chiamata API tramite store quando il componente è montato
  },
};
</script>

<style scoped>
.profile-view {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
}
.loading,
.error {
  text-align: center;
  font-size: 1.2rem;
  color: gray;
  margin-top: 50px;
}
.error {
  color: red;
}
</style>
