import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const PlaceDetailScreen = (props) => {
    return (
        <View>
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    
})

PlaceDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('placeTitle')
    }
}


export default PlaceDetailScreen