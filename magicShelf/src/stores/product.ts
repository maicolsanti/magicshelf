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
    products: [] as FoundProduct[],
    filters: {
      productName: "",
      brand: "",
      supplier: "",
      cap: "",
      priceRange: PriceRange.NOTSELECTED,
      distanceRange: DistanceRange.NOTSELECTED
    },
  }),
  actions: {
    async fetchSearchedProducts() {
      var fetchedProducts = [
        new Product(1, "Penna", "Bic", "pezzi", 2.5, new Supplier(1, "Maicol", "Santi", "Bic", "11111111111", "11111111111", "011/111111", " bic@bic.com", "Via rossi, 1", 10100, 1001)),
        new Product(2, "Matita", "Faber", "pezzi", 1.5, new Supplier(2, "n", "s", "Faber", "22222222222", "22222222222", "011/222222", "faber@faber.com", "via rossi, 2", 47020, 1002)),
        new Product(3, "Gomma", "Staedtler", "pezzi", 3, new Supplier(3, "n", "s", "Staedtler", "33333333333", "33333333333", "011/333333", "staedtler@staedtler.com", "via rossi, 3", 10100, 1003)),
      ]
      this.products = fetchedProducts;
      return true;
    },
    async getFilteredProducts() {
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
      const distanceRange = this.filters.distanceRange == DistanceRange.SAMEISTATCODE ? "Dentro al comune" : "Fuori dal comune";
      console.log("produt name: " + this.filters.productName);
      const requestBodyFilters = {
        "DESCRIZIONE_MATERIALE": this.filters.productName,
        "MARCA": this.filters.brand,
        "FORNITORE": this.filters.supplier,
        "PREZZO_UNITARIO": priceRange,
        "ZONA_DI_RICERCA": distanceRange, //TODO chiedi a maic se come default va bene
        "ZONA_DI_PARTENZA": "Longiano" //TODO CAMBIARE E IMPOSTARE ZONA GIUSTA
      };
      console.log("filters:" + JSON.stringify(requestBodyFilters));
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
          product.CODICE_MATERIALE,
          product.DESCRIZIONE_MATERIALE,
          product.MARCA,
          product.UNITA_MISURA,
          product.PREZZO_UNITARIO,
          product.SIGLA_PROVINCIA,
          product.DENOMINAZIONE_PROVINCIA,
          product.DENOMINAZIONE_REGIONE,
          product.DENOMINAZIONE_LOCALITA
        )));

        console.log("fetched products");
      }
      catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async setFilters(productName, brand, supplier, cap, priceRange, distanceRange) {
      this.filters.productName = productName;
      this.filters.brand = brand;
      this.filters.supplier = supplier;
      this.filters.cap = cap;
      this.filters.priceRange = priceRange;
      this.filters.distanceRange = distanceRange;
    },
  },
  getters: {
  },
});