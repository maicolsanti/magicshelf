import { defineStore } from 'pinia'
import { PriceRange } from '@/models/prince-ranges';
import { DistanceRange } from '@/models/distance-range';
import axios from 'axios';
import { FoundProduct } from '@/models/found_product';

export const useSearchStore = defineStore('searchStore', {
  state: () => ({
      searchAttributes: {
        product: "",
        brand: "",
        supplier: "",
        cap: "",
        priceRange: PriceRange.NOTSELECTED,
        distanceRange: DistanceRange.SAMEISTATCODE
      },
      priceRangeOptions: [PriceRange.NOTSELECTED, PriceRange.ZEROTEN, PriceRange.TENTWENTYFIVE, PriceRange.TWENTYFIVEFIFTY, PriceRange.FIFTYHUNDRED],
      distanceRangeOptions: [DistanceRange.SAMEISTATCODE, DistanceRange.NOTSAMEISTATCODE]
  }),
  actions: {
    changePriceRange(priceRangeSelected) {
      // Set price range
      this.searchAttributes.priceRange = priceRangeSelected;
    },
    changeDistanceRange(distanceRangeSelected) {
      // Set distance range
        this.searchAttributes.distanceRange = distanceRangeSelected;
    },
  },
  getters: {
    getPriceRange(){
      return this.searchAttributes.priceRange;
    },
    getDistanceRange(){
      return this.searchAttributes.distanceRange;
    }
  },
});