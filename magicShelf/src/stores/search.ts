import { defineStore } from 'pinia'
import { PriceRange } from '@/models/prince-ranges';
import { DistanceRange } from '@/models/distance-range';

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
      distanceRangeOptions: [DistanceRange.NOTSELECTED, DistanceRange.SAMECAP, DistanceRange.SAMEISTATCODE, DistanceRange.SAMEDISTRICT, DistanceRange.SAMEREGION]
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