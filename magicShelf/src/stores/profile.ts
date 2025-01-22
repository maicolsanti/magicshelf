import { defineStore } from "pinia";
import { ref } from "vue";
import { Costumer } from "@/models/costumer";
import { Supplier } from "@/models/supplier";

export const useProfileStore = defineStore("profile", () => {
  // Stato per i profili (opzionale per mantenere dati condivisi)
  const customerProfile = ref<Costumer | null>(null);
  const supplierProfile = ref<Supplier | null>(null);

  // Funzione per salvare le modifiche del profilo
  const saveChanges = async (profileType: "customer" | "supplier", profileData: Costumer | Supplier) => {
    try {
      const endpoint = `/api/${profileType}/profile`;
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error(`Errore durante il salvataggio del profilo ${profileType}`);
      }

      console.log(`Profilo ${profileType} salvato con successo.`);
    } catch (error) {
      console.error("Errore durante il salvataggio:", error);
    }
  };

  // Funzione per eliminare il profilo
  const deleteProfile = async (profileType: "customer" | "supplier") => {
    try {
      const endpoint = `/api/${profileType}/profile`;
      const response = await fetch(endpoint, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Errore durante l'eliminazione del profilo ${profileType}`);
      }

      // Resetta lo stato locale dopo l'eliminazione
      if (profileType === "customer") {
        customerProfile.value = null;
      } else {
        supplierProfile.value = null;
      }

      console.log(`Profilo ${profileType} eliminato con successo.`);
    } catch (error) {
      console.error("Errore durante l'eliminazione:", error);
    }
  };

  return {
    customerProfile,
    supplierProfile,
    saveChanges,
    deleteProfile,
  };
});
