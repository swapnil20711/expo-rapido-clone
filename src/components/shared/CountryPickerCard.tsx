import { View } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import CustomText from './CustomText'
import { Country } from '@/model/Country'

const CountryPickerCard: React.FC<{ onPress: () => void, country: Country }> = ({ onPress, country }) => {
    return (
        <Card style={{ margin: 8 }}
            onPress={onPress}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <CustomText style={{ padding: 8, flex: 1 }}>{country.emoji}</CustomText>
                    <CustomText variant='h6' style={{ padding: 8 }}>{country.dial_code}</CustomText>
                </View>
                <CustomText style={{ padding: 8, flex: 2 }}>{country.name}</CustomText>
            </View>
        </Card>
    )
}

export default CountryPickerCard