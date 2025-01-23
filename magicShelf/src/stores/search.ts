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
        distanceRange: DistanceRange.NOTSELECTED
      },
      priceRangeOptions: [PriceRange.NOTSELECTED, PriceRange.ZEROTEN, PriceRange.TENTWENTYFIVE, PriceRange.TWENTYFIVEFIFTY, PriceRange.FIFTYHUNDRED],
      distanceRangeOptions: [DistanceRange.NOTSELECTED, DistanceRange.SAMEISTATCODE, DistanceRange.NOTSAMEISTATCODE]
  }),
  actions: {
    changePriceRange(priceRangeSelected) {
      this.searchAttributes.priceRange = priceRangeSelected;
    },
    changeDistanceRange(distanceRangeSelected) {
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