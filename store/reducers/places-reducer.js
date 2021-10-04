import Place from "../../models/place"
import { ADD_PLACE, SET_PLACES } from "../actions/places-actions"

const initialState = {
    places: []
}

const placesReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_PLACE:
            const newPlace = new Place(
                action.placeData.id.toString(),
                action.placeData.title,
                action.placeData.image
            )
            return {
                places: state.places.concat(newPlace)
            }
        case SET_PLACES:
            return {
                places: action
                        .places
                        .map(pl => new Place(pl.id.toString(), pl.title, pl.imageUri))
            }
        default:
            return state
    }

}

export default placesReducer