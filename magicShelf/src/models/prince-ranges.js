const PriceRange = Object.freeze({
    NOTSELECTED: 0,
    ZEROTEN: 1,
    TENTWENTYFIVE: 2,
    TWENTYFIVEFIFTY: 3,
    FIFTYHUNDRED: 4,
  });

export { PriceRange };

export function priceRangeToString() {
  switch (this.priceRange) {
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
}