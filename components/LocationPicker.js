import React, {useState} from 'react'
import {
    View,
    Button,
    Text,
    ActivityIndicator,
    Alert,
    StyleSheet
} from 'react-native'
import Colors from '../constants/Colors'

import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

import MapPreview from './MapPreview'


const LocationPicker = (props) => {

    const [isFetching, setIsFetching] = useState(false)
    const [pickedLocation, setPickedLocation] = useState()

    const verifyPermissions = async () => {
        const result = await Location.requestForegroundPermissionsAsync();
        if(result.status !== 'granted') {
            Alert.alert("insufficient permissions!", 
            "You need to grant location permissions to use this app", [{
                text: 'Ok'
            }])
            return false
        }
        return true
    }

    const getLocationHandler = async props => {

        const hasPermission = await verifyPermissions()
        if(!hasPermission) {
            return
        }

        try{
            setIsFetching(true)
            const location = await Location.getCurrentPositionAsync({})
            console.log(location)
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
        } catch(err) {
            Alert.alert(
                "Could not fetch location!", 
                "Please try again later or pick a location on the map", 
                [{
                    text: 'OK'
                }]
            )
        }
        setIsFetching(false)
    }

    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview} location={pickedLocation} >
                {
                    isFetching 
                    ? 
                    <ActivityIndicator 
                        size="large"
                        color={Colors.primary}
                    />
                    :
                    <Text>No location chosen yet!</Text>
                }
            </MapPreview>
            <Button 
                title="Get User Location" 
                color={Colors.primary} 
                onPress={getLocationHandler}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default LocationPicker