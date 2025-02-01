<template>
  <div class="fornitore-profile">
    <div class="profile-card">
      <!-- Profile image header -->
      <div class="profile-header">
        <div class="profile-image">
          <i class="fa fa-user-circle"></i>
        </div>
      </div>

      <!-- Data form -->
      <form @submit.prevent="saveProfileChanges">
        <!-- Anagrafica section -->
        <div class="form-section">
          <h2>Anagrafici e di azienda</h2>
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
              <label for="ragioneSociale">Ragione sociale</label>
              <input type="text" id="ragioneSociale" v-model="profile.companyName" placeholder="Ragione sociale" />
            </div>
            <div class="form-field">
              <label for="partitaIva">Partita Iva</label>
              <input type="text" id="partitaIva" v-model="profile.vatNumber" placeholder="Partita IVA" />
            </div>
            <div class="form-field">
              <label for="codiceFiscale">Codice fiscale</label>
              <input type="text" id="codiceFiscale" v-model="profile.fiscalCode" placeholder="Codice fiscale" />
            </div>
          </div>
        </div>

        <!-- Locality section -->
        <div class="form-section">
          <h2>Località</h2>
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
        </div>

        <!-- Contacts section -->
        <div class="form-section">
          <h2>Di contatto e utente</h2>
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
              <label for="confermaPassword">Re inserire nuova password</label>
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
import { useConfigurationStore } from "@/stores/configurations";
import { useProfileStore } from "@/stores/profile";

export default {
  name: "SupplierProfile",
  setup() {
    const configurationStore = useConfigurationStore();
    const profileStore = useProfileStore();

    const profile = ref({
      id: null,
      name: "",
      surname: "",
      companyName: "",
      vatNumber: "",
      fiscalCode: "",
      cap: "",
      locality: "",
      istatCode: null,
      email: "",
      phoneNumber: "",
    });

    const passwords = ref({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    const localities = ref([]);

    // Each password field has its own visibility state
    const passwordVisibility = ref({
      old: false,
      new: false,
      confirm: false,
    });

    // Method to toggle visibility for a specific field
    const toggleVisibility = (field) => {
      passwordVisibility.value[field] = !passwordVisibility.value[field];
    };

    // Fetch localities based on CAP
    const fetchLocalities = async (cap) => {
      try {
        localities.value = await profileStore.getLocalityByCap(cap);
      } catch (error) {
        console.error("Errore nel caricamento delle località:", error);
        localities.value = [];
      }
    };

    // Retrieve ISTAT code by CAP and locality
    const fetchIstatCode = async (cap, locality) => {
      try {
        const istatCodes = await profileStore.GetLocalityByCapDenominazione(cap, locality);
        return istatCodes;
      } catch (error) {
        console.error("Errore nel recupero del codice ISTAT:", error);
        return null;
      }
    };

    // Save profile changes
    const saveProfileChanges = async () => {
      try {
        // Retrieve ISTAT code before saving
        if (profile.value.cap && profile.value.locality) {
          profile.value.istatCode = await fetchIstatCode(profile.value.cap, profile.value.locality);
        }

        if (!profile.value.istatCode) {
          alert("Errore: non è stato possibile recuperare il codice ISTAT.");
          return;
        }

        // Save profile data
        await profileStore.saveChanges("fornitori", profile.value);
        alert("Modifiche salvate con successo.");
      } catch (error) {
        console.error("Errore durante il salvataggio del profilo:", error);
        alert("Si è verificato un errore durante il salvataggio.");
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

    // Load profile data
    const fetchProfile = async () => {
      try {
        await configurationStore.getProfile();
        Object.assign(profile.value, configurationStore.configurations.userData);
      } catch (error) {
        console.error("Errore durante il caricamento del profilo:", error);
      }
    };

    // Save password changes
    const savePasswordChanges = () => {
      if (passwords.value.newPassword === passwords.value.confirmPassword) {
        profileStore.changePassword(passwords.value);
      } else {
        alert("Le password non corrispondono.");
      }
    };

    // Delete profile
    const deleteProfile = () => {
      profileStore.deleteProfile("fornitori", profile.value.id);
    };

    onMounted(fetchProfile);

    return {
      profile,
      passwords,
      localities,
      passwordVisibility, // Visibility state
      toggleVisibility,    // Toggle method
      saveProfileChanges,
      savePasswordChanges,
      deleteProfile,
    };
  },
};
</script>

<style scoped>
.fornitore-profile {
  max-width: 1000px;
  margin: auto;
  background: #f7f7f7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.profile-header {
  text-align: center;
  margin-bottom: 20px;
}
.profile-image {
  font-size: 80px;
  color: #ccc;
}
.form-section {
  margin-bottom: 20px;
}
.form-row {
  display: flex;
  gap: 20px;
}
.form-field {
  flex: 1;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.input-with-button {
  display: flex;
  align-items: center;
}
.input-with-button input {
  flex: 1;
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
.btn-save {
  background: #000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
.btn-save:hover {
  background: #444;
}

.save-profile-button {
  margin-bottom: 40px;
}
.delete-profile {
  text-align: center;
  margin-top: 20px;
}
.delete-profile a {
  color: #d9534f;
  text-decoration: none;
}
</style>
