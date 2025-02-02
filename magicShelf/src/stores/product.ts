import { defineStore } from 'pinia'
import { Product } from '@/models/product';
import { Supplier } from '@/models/supplier';
import axios from 'axios';
import { PriceRange } from '@/models/prince-ranges';
import { DistanceRange } from '@/models/distance-range';
import { FoundProduct } from '@/models/found_product';

// for api calls see https://pinia.vuejs.org/core-concepts/actions.html

export const useProductsStore = defineStore('productStore', {
  state: () => ({
    products: [] as FoundProduct[], // Fetched products
    filters: {
      productName: "",
      brand: "",
      supplier: "",
      cap: "",
      priceRange: PriceRange.NOTSELECTED,
      distanceRange: DistanceRange.SAMEISTATCODE
    },
  }),
  actions: {
    async getFilteredProducts() {
      // GET FILTERED PRODUCTS

      // Clear previously fetched products
      this.products = [] as FoundProduct[];

      // Set price range
      var priceRange = [];
      switch (this.filters.priceRange) {
        case PriceRange.ZEROTEN:
          priceRange = [0, 10];
          break;
        case PriceRange.TENTWENTYFIVE:
          priceRange = [10, 25];
          break;
        case PriceRange.TWENTYFIVEFIFTY:
          priceRange = [25, 50];
          break;
        case PriceRange.FIFTYHUNDRED:
          priceRange = [50, 100];
          break;
        default:
          priceRange = [0, 100];
      }

      // Set distance range
      const distanceRange = this.filters.distanceRange == DistanceRange.SAMEISTATCODE ? "Dentro al Comune" : "Fuori dal Comune";

      // Create filters
      const filters = {
        "DESCRIZIONE_MATERIALE": this.filters.productName,
        "MARCA": this.filters.brand,
        "FORNITORE": this.filters.supplier,
        "PREZZO_UNITARIO": priceRange,
        "ZONA_DI_RICERCA": distanceRange,
        "ZONA_DI_PARTENZA": this.filters.cap
      };

      // Create request body
      const requestBodyFilters = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== "" && value !== null) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>);

      // Make request getFiltered
      try {
        this.products = await axios.post('/api/materiali-fornitori/getFiltered', requestBodyFilters).then(res => res.data.map((product: any) => new FoundProduct(
          product.CODICE_FORNITORE,
          product.NOME,
          product.COGNOME,
          product.RAGIONE_SOCIALE,
          product.PARTITA_IVA,
          product.CODICE_FISCALE,
          product.CAP,
          product.CODICE_ISTAT,
          product.INDIRIZZO,
          product.PHONE_NUMBER,
          null,
          product.CODICE_MATERIALE,
          product.DESCRIZIONE_MATERIALE,
          product.MARCA,
          product.UNITA_MISURA,
          product.PREZZO_UNITARIO,
          product.SIGLA_PROVINCIA,
          product.DENOMINAZIONE_PROVINCIA,
          product.DENOMINAZIONE_REGIONE,
          product.DENOMINAZIONE_LOCALITA,
          product.IMMAGINE
        )));

        console.log("Materiali recuperati con successo.");
      }
      catch (error) {
        console.error("Errore nella richiesta dei materiali: ", error);
      }
    },
    async setFilters(productName, brand, supplier, cap, priceRange, distanceRange) {
      this.filters.productName = productName;
      this.filters.brand = brand;
      this.filters.supplier = supplier;
      this.filters.cap = cap;
      this.filters.priceRange = priceRange;
      this.filters.distanceRange = distanceRange;

      this.products = [] as FoundProduct[];
    },
  },
  getters: {
  },
});