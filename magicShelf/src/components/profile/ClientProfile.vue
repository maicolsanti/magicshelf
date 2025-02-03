<template>
  <div class="profile-container">
    <div class="profile-card">
      <!-- Header with profile image -->
      <div class="profile-header">
        <div class="profile-image">
          <i class="fa fa-user-circle"></i>
        </div>
      </div>

      <!-- If a message exist show custom style -->
      <div 
        v-if="alertMessage" 
        class="custom-alert"
        :class="alertType"
      >
        {{ alertMessage }}
      </div>

      <!-- Data form -->
      <form @submit.prevent="saveProfileChanges">
        <div class="form-section">
          <h2>Anagrafici e di contatto</h2>
          <div class="form-row">
            <div class="form-field">
              <label for="nome">Nome</label>
              <input type="text" id="nome" v-model="profile.name" placeholder="Nome" />
            </div>
            <div class="form-field">
              <label for="cognome">Cognome</label>
              <input type="text" id="cognome" v-model="profile.surname" placeholder="Cognome" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="profile.email" placeholder="Email" />
            </div>
            <div class="form-field">
              <label for="telefono">Telefono</label>
              <input type="tel" id="telefono" v-model="profile.phoneNumber" placeholder="Telefono" />
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-field">
            <label for="cap">CAP</label>
            <input type="text" id="cap" v-model="profile.cap" placeholder="CAP" />
          </div>
          <div class="form-field">
            <label for="comune">Comune</label>
            <select id="comune" v-model="profile.locality">
              <option v-for="locality in localities" :key="locality" :value="locality">
                {{ locality }}
              </option>
            </select>
          </div>
        </div>

        <!-- Save profile button -->
        <div class="save-profile-button">
          <button type="button" class="btn-save" @click="saveProfileChanges">Salva dati anagrafici</button>
        </div>
      </form>

      <!-- Password form -->
      <form @submit.prevent="savePasswordChanges">
        <div class="form-section">
          <h2>Password</h2>
          <div class="form-row">
            <!-- Old password field with toggle button -->
            <div class="form-field">
              <label for="vecchiaPassword">Inserire vecchia password</label>
              <div class="input-with-button">
                <input
                  :type="passwordVisibility.old ? 'text' : 'password'"
                  id="vecchiaPassword"
                  v-model="passwords.oldPassword"
                />
                <button type="button" class="btn-toggle" @click="toggleVisibility('old')">
                  {{ passwordVisibility.old ? 'Hide' : 'Show' }}
                </button>
              </div>
            </div>

            <!-- New password field with toggle button -->
            <div class="form-field">
              <label for="nuovaPassword">Inserire nuova password</label>
              <div class="input-with-button">
                <input
                  :type="passwordVisibility.new ? 'text' : 'password'"
                  id="nuovaPassword"
                  v-model="passwords.newPassword"
                />
                <button type="button" class="btn-toggle" @click="toggleVisibility('new')">
                  {{ passwordVisibility.new ? 'Hide' : 'Show' }}
                </button>
              </div>
            </div>

            <!-- Confirm password field with toggle button -->
            <div class="form-field">
              <label for="confermaPassword">Reinserire nuova password</label>
              <div class="input-with-button">
                <input
                  :type="passwordVisibility.confirm ? 'text' : 'password'"
                  id="confermaPassword"
                  v-model="passwords.confirmPassword"
                />
                <button type="button" class="btn-toggle" @click="toggleVisibility('confirm')">
                  {{ passwordVisibility.confirm ? 'Hide' : 'Show' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Save password button -->
        <button type="button" class="btn-save" @click="savePasswordChanges">Salva password</button>
      </form>

      <!-- Delete profile link -->
      <p class="delete-profile">
        <a href="#" @click.prevent="deleteProfile">Desideri eliminare il tuo profilo?</a>
      </p>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useConfigurationStore } from "@/stores/configurations";
import { useProfileStore } from "@/stores/profile";
import router from "@/router";

export default {
  name: "ClientProfile",
  setup() {
    const configurationStore = useConfigurationStore();
    const profileStore = useProfileStore();
    const router = useRouter();

    const profile = ref({
      id: null,
      name: "",
      surname: "",
      email: "",
      phoneNumber: "",
      cap: "",
      locality: "",
      istatCode: null,
    });

    const passwords = ref({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    const localities = ref([]);

    // Alert variables
    const alertMessage = ref('');
    const alertType = ref('');

    // Each password field has its own visibility state
    const passwordVisibility = ref({
      old: false,
      new: false,
      confirm: false,
    });

    // Toggle visibility for a specific field
    const toggleVisibility = (field) => {
      passwordVisibility.value[field] = !passwordVisibility.value[field];
    };

    // Fetch localities by CAP
    const fetchLocalities = async (cap) => {
      try {
        localities.value = await profileStore.getLocalityByCap(cap);
      } catch (error) {
        console.error(error);
        localities.value = [];
      }
    };

    // Retrieve ISTAT code by CAP and locality
    const fetchIstatCode = async (cap, locality) => {
      try {
        const istatCodes = await profileStore.GetLocalityByCapDenominazione(cap, locality);
        return istatCodes;
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    // Save profile changes
    const saveProfileChanges = async () => {
      try {
        // Get ISTAT code before saving
        if (profile.value.cap && profile.value.locality) {
          profile.value.istatCode = await fetchIstatCode(profile.value.cap, profile.value.locality);
        }

        if (!profile.value.istatCode) {
          alertMessage.value = "Errore: impossibile recuperare il codice ISTAT.";
          alertType.value = "error";
          return;
        }

        // Save the profile
        await profileStore.saveChanges("clienti", profile.value);
        alertMessage.value = "Modifiche salvate con successo.";
        alertType.value = "success";
      } catch (error) {
        console.error(error);
        alertMessage.value = "Errore durante il salvataggio delle modifiche al profilo.";
        alertType.value = "error";
      }
    };

    // Watch CAP changes to update localities
    watch(
      () => profile.value.cap,
      (newCap) => {
        if (newCap && newCap.length === 5) {
          fetchLocalities(newCap);
        } else {
          localities.value = [];
        }
      }
    );

    // Function to load the profile
    const fetchProfile = async () => {
      try {
        await configurationStore.getProfile();
        Object.assign(profile.value, configurationStore.configurations.userData);
      } catch (error) {
        console.error(error);
      }
    };

    // Save password changes
    const savePasswordChanges = async () => {
      if (passwords.value.newPassword === passwords.value.confirmPassword) {
        try {

          await profileStore.changePassword(passwords.value);

          alertMessage.value = "Password cambiata con successo.";
          alertType.value = "success";

          passwords.value.oldPassword = "";
          passwords.value.newPassword = "";
          passwords.value.confirmPassword = "";
        } catch (error) {
          console.error(error);
          alertMessage.value = "Errore durante il salvataggio della password.";
          alertType.value = "error";
        }
      } else {
        alertMessage.value = "Le password non corrispondono.";
        alertType.value = "error";
      }
    };

    // Delete profile
    const deleteProfile = () => {
      try {
        profileStore.deleteProfile("clienti", profile.value.id);
        alertMessage.value = "Profilo utente eliminato con successo."
        alertType.value = "success";
        configurationStore.logout().then(() => {
          setTimeout(() => {
            router.push("/");
          }, 2000);
        });
      } catch (error) {
        alertMessage.value = "Errore durante la cancellazione del profilo.";
        alertType.value = "error";
      }
    };

    onMounted(fetchProfile);

    return {
      profile,
      passwords,
      localities,
      passwordVisibility,
      toggleVisibility,
      alertMessage,
      alertType,
      saveProfileChanges,
      savePasswordChanges,
      deleteProfile,
    };
  },
};
</script>

<style scoped>

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
.btn-toggle {
  background: #000;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}
.btn-toggle:hover {
  background: #444;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.btn-save {
  background: #000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}
.btn-save:hover {
  background: #444;
}

.save-profile-button {
  margin-bottom: 20px;
}
.delete-profile {
  text-align: center;
  margin-top: 20px;
}
.delete-profile a {
  color: #721c24;
  text-decoration: none;
}
</style>
