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
      distanceRangeOptions: [DistanceRange.NOTSELECTED, DistanceRange.LESSTHENFIVE, DistanceRange.LESSTHENTWENTY, DistanceRange.LESSTHENFIFTY, DistanceRange.LESSTHENHUNDRED]
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
    getPriceRangeString(){
      switch (this.searchAttributes.priceRange) {
        case PriceRange.NOTSELECTED:
          return 'Seleziona'
        case PriceRange.ZEROTEN:
          return '0-10'
        case PriceRange.TENTWENTYFIVE:
          return '10-25'
        case PriceRange.TWENTYFIVEFIFTY:
          return '25-50'
        case PriceRange.FIFTYHUNDRED:
          return '50-100'
        default:        
          return 'Seleziona'
      }
    },
    getDistanceRangeString(){
        switch (this.searchAttributes.priceRange) {
          case DistanceRange.NOTSELECTED:
            return 'Seleziona'
          case DistanceRange.LESSTHENFIVE:
            return '< 5km'
          case DistanceRange.LESSTHENTWENTY:
            return '< 20km'
          case DistanceRange.LESSTHENFIFTY:
            return '< 50km'
          case DistanceRange.LESSTHENHUNDRED:
            return '< 100km'
          default:        
            return 'Seleziona'
        }
      },
  },
});