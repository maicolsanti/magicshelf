import { defineStore } from "pinia";
import { ref } from "vue";
import axios from 'axios';
import { Costumer } from "@/models/costumer";
import { Supplier } from "@/models/supplier";
import { useConfigurationStore } from '@/stores/configurations';

export const useProfileStore = defineStore("profile", () => {
  // Profile status
  const customerProfile = ref<Costumer | null>(null);
  const supplierProfile = ref<Supplier | null>(null);

  const configurationStore = useConfigurationStore();

  // Profile value change function
  const saveChanges = async (profileType: "clienti" | "fornitori", profileData: Costumer | Supplier) => {
    try {
      const endpoint = `/api/${profileType}/update/${profileData.id}`;
      const data = {
        custom_data: {
          NOME: profileData.name,
          COGNOME: profileData.surname,
          CAP: profileData.cap,
          CODICE_ISTAT: profileData.istatCode,
          EMAIL: profileData.email,
          PHONE_NUMBER: profileData.phoneNumber
        }
      };
      console.log(data);
      const response = await axios.put(endpoint, data);

      if (response.status != 200) {
        throw new Error(`Errore durante il salvataggio del profilo ${profileType}`);
      }

      console.log(`Profilo ${profileType} salvato con successo.`);
    } catch (error) {
      console.error("Errore durante il salvataggio:", error);
    }
  };

  const getLocalityByCap = async (cap) => {
    try {
      const endpoint = `/api/localita/getByCap/${cap}`;
      const response = await axios.get(endpoint);
  
      if (response.status !== 200) {
        throw new Error(`Errore durante il recupero delle località per il CAP ${cap}`);
      }
  
      // Mappa i dati per estrarre solo i nomi delle località
      const localities = response.data.map((item) => item.DENOMINAZIONE_LOCALITA);
  
      return localities;
    } catch (error) {
      console.error("Errore durante il caricamento delle località:", error);
      throw error;
    }
  };  

  const GetLocalityByCapDenominazione = async (cap: number, denominazione: string) => {
    try {
      const endpoint = `/api/localita/getByCapDenominazione/${cap}/${denominazione}`;
      const response = await axios.get(endpoint);
      console.log(response);

      if (response.status !== 200) {
        throw new Error('Errore durante il recupero del codice istat');
      }

      const istat_code = response.data.CODICE_ISTAT;
      console.log(istat_code);

      return istat_code;
    } catch (error) {
      console.error('Errore durante il caricamento del codice istat:', error);
      throw error;
    }
  };

  // Delete profile function
  const deleteProfile = async (profileType: "clienti" | "fornitori", id: number) => {
    try {
      const endpoint = `/api/${profileType}/remove/${id}`;
      const response = await axios.delete(endpoint);

      console.log(response);

      if (response.status != 200) {
        throw new Error(`Errore durante l'eliminazione del profilo ${profileType}`);
      }

      // Reset state
      if (profileType === "clienti") {
        customerProfile.value = null;
      } else {
        supplierProfile.value = null;
      }

      alert(`Profilo ${profileType} eliminato con successo.`);

      configurationStore.logout();
    } catch (error) {
      console.error("Errore durante l'eliminazione:", error);
    }
  };

  const changePassword = async (passwordData) => {
    try {
      const endpoint = `api/auth/general/changePassword`;
      console.log(passwordData);
      const data = {
        "OLD_PASSWORD": passwordData.oldPassword,
        "NEW_PASSWORD": passwordData.newPassword
      };
      console.log(data);
      const response = await axios.post(endpoint, data);

      if (response.status != 200) {
        throw new Error('Errore durante il cambio password');
      }

      console.log('Password aggiornata correttamente')
    } catch (error) {
      console.log('Errore durante il cambio della password:', error);
    }
  };

  return {
    customerProfile,
    supplierProfile,
    getLocalityByCap,
    GetLocalityByCapDenominazione,
    saveChanges,
    deleteProfile,
    changePassword
  };
});
