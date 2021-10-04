import React, {useState} from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import ImgPicker from '../components/ImageSelector'
import LocationPicker from '../components/LocationPicker'
import Colors from '../constants/Colors'
import {addPlace} from '../store/actions/places-actions'

const NewPlaceScreen = (props) => {

    const [titleValue, setTitleValue] = useState('')
    const [selectedImage, setSelectedImage] = useState()


    const dispatch = useDispatch()

    const titleChangeHandler = text => {
        setTitleValue(text)
    }
    
    const savePlaceHandler = () => {
        dispatch(addPlace(titleValue, selectedImage))
        props.navigation.goBack()
    }

    const imageTakenHandler = (imagePath) => {
        setSelectedImage(imagePath)
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput 
                    style={styles.textInput} 
                    onChangeText={titleChangeHandler}
                    value={titleValue}
                />
                <ImgPicker onImageTaken={imageTakenHandler} />
                <LocationPicker />
                <Button 
                    title="Save Place"
                    color={Colors.primary}
                    onPress={
                        savePlaceHandler
                    }
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
})

NewPlaceScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Add Place',
       
    }
}


export default NewPlaceScreen