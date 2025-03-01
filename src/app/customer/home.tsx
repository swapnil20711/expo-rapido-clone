import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { homeStyles } from '@/styles/homeStyles'
import MapView from 'react-native-maps'
import LocationBar from '@/components/customer/LocationBar'

const home = () => {
    return (
        <View style={homeStyles.container}>
            <StatusBar
                backgroundColor={'orange'}
                translucent={false} />
            <LocationBar />
        </View>
    )
}

export default home