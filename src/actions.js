const setProducts = (data) => {
  return {
    type: 'SET_PRODUCTS',
    payload: data
  }
  }

const setCategories = (data) => {
  return {
      type: 'SET_CATEGORIES',
      payload: data
  }
}

const setTopSales = (data) => {
  return  {
      type: 'SET_TOP_SALES',
      payload: data
  }
}

export {
  setProducts,
  setCategories,
  setTopSales
}


