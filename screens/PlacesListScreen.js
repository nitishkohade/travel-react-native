import React, {useEffect} from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'
import CustomHeaderButton from '../components/HeaderButton'
import PlaceItem from '../components/PlaceItem'
import * as placesActions from '../store/actions/places-actions'

const PlacesListScreen = (props) => {

    const dispatch = useDispatch()
    const places = useSelector(state => state.places.places)

    useEffect(() => {
        dispatch(placesActions.loadPlaces())
    }, [dispatch])

    return (
        <FlatList 
            data={places}
            keyExtractor={item => item.id}
            renderItem={
                itemData => <PlaceItem 
                                image={itemData.item.imageUri} 
                                title={itemData.item.title} 
                                address={null}
                                onSelect={() => {
                                    props.navigation.navigate('PlaceDetail', {
                                        placeTitle: itemData.item.title,
                                        placeId: itemData.item.id
                                    })
                                }}
                            />
            }
        />
    )
}

const styles = StyleSheet.create({
    
})

PlacesListScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Places',
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item 
                        title="Add Place"
                        iconName="ios-add"
                        onPress={() => {
                            navData.navigation.navigate('NewPlace')
                        }}
                    />
                </HeaderButtons>
            )
        }
    }
}


export default PlacesListScreen