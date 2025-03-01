import { Alert, Image, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { authStyles } from '@/styles/authStyles'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import CustomText from '@/components/shared/CustomText'
import { commonStyles } from '@/styles/commonStyles'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Button, Card, Searchbar, TextInput, useTheme } from 'react-native-paper'
import countries from '@/assets/country_codes.json'
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { FlashList } from '@shopify/flash-list'
import { getLocales } from 'expo-localization';
import { Country } from '@/model/Country'
import CountryPickerCard from '@/components/shared/CountryPickerCard'
import { Colors } from '@/utils/Constants'
import { signin } from '@/service/authService'
import { useWS } from '@/service/WSProvider'
import { useUserStore } from '@/store/useUserStore'
import { useRiderStore } from '@/store/useRiderStore'

const Auth = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const currentCountry = countries.filter((item) => {
        return getLocales()[0].regionCode === item.code
    })
    const emoji = selectedCountry?.emoji ?? currentCountry[0]?.emoji
    const countryCode = selectedCountry?.dial_code ?? currentCountry[0]?.dial_code
    const [searchedCountry, setSearchedCountry] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const { updateAccessTokens } = useWS();
    const { setUser } = useUserStore();
    const { setRiderUser } = useRiderStore();

    useEffect(() => {
        if (searchedCountry.length > 0) {
            const filteredCountries = countries.filter((item) => {
                return item.name.toLowerCase().includes(searchedCountry.toLowerCase())
            })
            setFilteredCountries(filteredCountries as any)
        }
    }, [searchedCountry])

    const handleNext = () => {
        if (!phoneNumber && phoneNumber.length != 10) {
            Alert.alert("Bro please enter your number")
            return
        }
        signin({ role: "customer", phone: phoneNumber }, updateAccessTokens, setUser, setRiderUser)
    }

    return (
        <View style={authStyles.container}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={commonStyles.flexRowBetween}>
                        <Image source={require('@/assets/images/logo_t.png')} style={authStyles.logo} />
                        <TouchableOpacity style={authStyles.flexRowGap}>
                            <MaterialIcons name="help" size={24} color="grey" />
                            <CustomText fontFamily='Medium' variant='h7'>Help</CustomText>
                        </TouchableOpacity>
                    </View>

                    <CustomText fontFamily='Medium' variant='h6'> What is your number?</CustomText>
                    <CustomText style={commonStyles.lightText} fontFamily='Regular' variant='h7'> Enter your phone number to proceed</CustomText>
                    <View style={[commonStyles.flexRow, { marginTop: 14 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                bottomSheetRef.current?.snapToPosition('90%')
                            }}
                            style={{ borderColor: useTheme().colors.outline, borderWidth: 1, padding: 4, margin: 8, borderRadius: 4 }}
                        >
                            <CustomText variant='h6'>{`${emoji} ${countryCode}`}</CustomText>
                        </TouchableOpacity>
                        <TextInput
                            value={phoneNumber}
                            onChangeText={(text) => {
                                setPhoneNumber(text)
                            }}
                            mode='outlined'
                            inputMode='tel'
                            style={{ backgroundColor: "#fff", flex: 1 }}
                            placeholder='836-4588-33596' />
                    </View>
                </ScrollView>
                <View style={authStyles.footerContainer}>
                    <CustomText
                        variant='h8'
                        fontFamily="Regular"
                        style={[commonStyles.lightText, { textAlign: "center", marginHorizontal: 20 }]}>
                        By continuing, you agree to the terms and privacy policy of the Ride App.
                    </CustomText>
                    <Button
                        onPress={handleNext}
                        style={{ marginTop: 14 }}
                        buttonColor={Colors.primary}
                        mode="contained">
                        Next
                    </Button>
                </View>
                <BottomSheet
                    enablePanDownToClose
                    snapPoints={['90%']}
                    ref={bottomSheetRef}
                    enableDynamicSizing={false}
                    index={-1}
                >
                    <BottomSheetScrollView style={{ flex: 1 }}>
                        <Searchbar
                            value={searchedCountry}
                            style={{ marginBottom: 14 }}
                            onChangeText={(text) => {
                                setSearchedCountry(text)
                            }}
                            placeholder='Search your country' />
                        <FlashList
                            viewabilityConfig={{
                                waitForInteraction: true,
                                itemVisiblePercentThreshold: 100,
                                minimumViewTime: 1500,
                            }}
                            estimatedItemSize={45}
                            data={searchedCountry.trim().length > 0 ? filteredCountries : countries}
                            keyExtractor={(item, index) => `${item.name} ${item.dial_code}`}
                            renderItem={({ item, index }) => {
                                return (
                                    <CountryPickerCard
                                        onPress={() => {
                                            setSelectedCountry(item as any)
                                            bottomSheetRef?.current?.close()
                                        }}
                                        country={item}
                                    />
                                )
                            }}
                        />
                    </BottomSheetScrollView>
                </BottomSheet>
            </GestureHandlerRootView>
        </View>
    );
}

export default Auth