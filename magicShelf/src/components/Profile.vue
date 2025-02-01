<template>
  <div class="profile-content">
    <!-- Loading status -->
    <div v-if="isLoading" class="loading">
      <p>Caricamento...</p>
    </div>

    <!-- Error status -->
    <div v-else-if="error" class="error">
      <p>Si è verificato un errore durante il caricamento del profilo.</p>
    </div>

    <!-- Profile status -->
    <div v-else>
      <!-- Show correct profile based on type -->
      <ClienteProfile v-if="profileType === 2" />
      <FornitoreProfile v-else-if="profileType === 3" />
    </div>
  </div>
</template>

<script>
import { useConfigurationStore } from "@/stores/configurations";
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
      isLoading: true,
      error: false,
      profileType: "",
    };
  },
  methods: {
    async fetchProfile() {
      const configurationStore = useConfigurationStore();
      try {
        await configurationStore.getProfile(); // Retrieve profile
        this.profileType = configurationStore.configurations.userData.role;
        console.log(configurationStore.configurations.userData);
      } catch (error) {
        console.error("Errore durante il caricamento del profilo:", error);
        this.error = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.fetchProfile();
  },
};
</script>

<style scoped>
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
