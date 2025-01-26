<template>
  <div class="cliente-profile">
    <div class="profile-card">
      <!-- Header with profile image -->
      <div class="profile-header">
        <div class="profile-image">
          <i class="fa fa-user-circle"></i>
        </div>
      </div>

      <!-- Data form -->
      <form @submit.prevent="saveProfileChanges">
        <!-- Anagrafica section -->
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

        <!-- Locality section -->
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
            <div class="form-field">
              <label for="vecchiaPassword">Inserire vecchia password</label>
              <input type="password" id="vecchiaPassword" v-model="passwords.oldPassword" />
            </div>
            <div class="form-field">
              <label for="nuovaPassword">Inserire nuova password</label>
              <input type="password" id="nuovaPassword" v-model="passwords.newPassword" />
            </div>
            <div class="form-field">
              <label for="confermaPassword">Reinserire nuova password</label>
              <input type="password" id="confermaPassword" v-model="passwords.confirmPassword" />
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
  name: "ClientProfile",
  setup() {
    const configurationStore = useConfigurationStore();
    const profileStore = useProfileStore();

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

    // Funzione per aggiornare le località basate sul CAP
    const fetchLocalities = async (cap) => {
      try {
        localities.value = await profileStore.getLocalityByCap(cap);
      } catch (error) {
        console.error("Errore nel caricamento delle località:", error);
        localities.value = [];
      }
    };

    // Recupera il codice ISTAT basato su CAP e località
    const fetchIstatCode = async (cap, locality) => {
      try {
        const istatCodes = await profileStore.GetLocalityByCapDenominazione(cap, locality);
        return istatCodes;
      } catch (error) {
        console.error("Errore nel recupero del codice ISTAT:", error);
        return null;
      }
    };

    // Salva le modifiche al profilo
    const saveProfileChanges = async () => {
      try {
        // Recupera il codice ISTAT prima di salvare
        if (profile.value.cap && profile.value.locality) {
          profile.value.istatCode = await fetchIstatCode(profile.value.cap, profile.value.locality);
        }

        if (!profile.value.istatCode) {
          alert("Errore: non è stato possibile recuperare il codice ISTAT.");
          return;
        }

        // Salva il profilo
        await profileStore.saveChanges("clienti", profile.value);
        alert("Modifiche salvate con successo.");
      } catch (error) {
        console.error("Errore durante il salvataggio del profilo:", error);
        alert("Si è verificato un errore durante il salvataggio.");
      }
    };

    // Osserva il cambiamento del CAP per aggiornare le località
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

    // Funzione per caricare il profilo
    const fetchProfile = async () => {
      try {
        await configurationStore.getProfile();
        Object.assign(profile.value, configurationStore.configurations.userData);
      } catch (error) {
        console.error("Errore durante il caricamento del profilo:", error);
      }
    };

    // Salva le modifiche alla password
    const savePasswordChanges = () => {
      if (passwords.value.newPassword === passwords.value.confirmPassword) {
        profileStore.changePassword(passwords.value);
      } else {
        alert("Le password non corrispondono.");
      }
    };

    // Elimina il profilo
    const deleteProfile = () => {
      profileStore.deleteProfile("clienti", profile.value.id);
    };

    onMounted(fetchProfile);

    return {
      profile,
      passwords,
      localities,
      saveProfileChanges,
      savePasswordChanges,
      deleteProfile,
    };
  },
};
</script>

<style scoped>
.cliente-profile {
  max-width: 800px;
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
  color: #d9534f;
  text-decoration: none;
}
</style>
