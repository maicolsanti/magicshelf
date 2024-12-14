export const page = Object.freeze({
    HOME: 0,
    SEARCH: 1,
    PRODUCTS: 2,
    PROFILE: 3,
    ABOUT: 4,
    LOGIN: 5,
  })
  
  export function getPageName(pageNameCode) {
    var pageString = ''
  
    switch (pageNameCode) {
      case page.HOME:
        pageString = 'Home'
        break
      case page.SEARCH:
        pageString = 'Ricerca'
        break
      case page.PRODUCTS:
        pageString = 'Prodotti'
        break
      case page.PROFILE:
        pageString = 'Profilo'
        break
      case page.ABOUT:
        pageString = 'About us'
        break
      case page.LOGIN:
        pageString = 'Login'
        break
      default:
        break
    }
  
    return pageString
  }
  