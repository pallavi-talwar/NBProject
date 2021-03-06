import * as types from './types'
import Api from '../lib/api'

// let REQUEST_URL = "http://www.nobroker.in/api/v1/property/filter/region/ChIJLfyY2E4UrjsRVq4AjI7zgRY/?

// export function fetchRecipes(ingredients) {
//   return (dispatch, getState) => {
//     const params = [
//       `i=${encodeURIComponent(ingredients)}`,
//       'p=1'
//     ].join('&')
//     return Api.get(`/api/?${params}`).then(resp => {
//       dispatch(setSearchedRecipes({recipes: resp}));
//     }).catch( (ex) => {
//       console.log(ex);
//     });
//   }
// }

export function fetchRecipes(locationData) {
  console.log("Inside fetch",locationData);
  addLocation(locationData);
  return (dispatch, getState) => {
    const params = [
      'pageNo='+locationData.pageNo,
      'radius=1',
      'rent=0,2000000',
      'orderBy=nbRank,desc',
      'city=bangalore',
      'latitude='+locationData.geometry.location.lat,
      'longitude='+locationData.geometry.location.lng,
      'placeId='+locationData.place_id,
      'lat_lng='+locationData.geometry.location.lat+','+locationData.geometry.location.lng,
      'sharedAccomodation=0'
    ].join('&')

    // console.log('Params',params)
    const placeId = locationData.place_id;
    return Api.get(`/api/v1/property/filter/region/${placeId}/?${params}`).then(resp => {
      // console.log("Inside fetch done", resp);
      dispatch(setSearchedRecipes({recipes: resp}));
    }).catch( (ex) => {
      console.log(ex);
    });
  }
}

export function setSearchedRecipes({ recipes }) {
  // console.log("Inside set searched recipes", { recipes });
  return {
    type: types.SET_SEARCHED_RECIPES,
    recipes,
  }
}

export function addRecipe() {
  return {
    type: types.ADD_RECIPE,
  }
}

export function addLocation(location) {
  return {
    type: types.ADD_LOCATION,
    location
  }
}
