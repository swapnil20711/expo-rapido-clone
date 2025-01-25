import { View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { commonStyles } from '@/styles/commonStyles'
import { splashStyles } from '@/styles/splashStyles'
import CustomText from '@/components/shared/CustomText'
import { useFonts } from 'expo-font'
import { resetAndNavigate } from '@/utils/Helpers'

const Main = () => {
    const [loaded] = useFonts({
        Bold: require("@/assets/fonts/NotoSans-Bold.ttf"),
        Light: require("@/assets/fonts/NotoSans-Light.ttf"),
        Medium: require("@/assets/fonts/NotoSans-Medium.ttf"),
        Regular: require("@/assets/fonts/NotoSans-Regular.ttf"),
        SemiBold: require("@/assets/fonts/NotoSans-SemiBold.ttf")
    })
    const [hasNavigated, setHasNavigated] = useState(false);

    const checkToken = async () => {
        resetAndNavigate("/role")
    }

    useEffect(() => {

        if (loaded && !hasNavigated) {
            const timeoutId = setTimeout(() => {
                checkToken();
                setHasNavigated(true);
            }, 1000)
            return () => { clearTimeout(timeoutId) }
        }
    }, [loaded, hasNavigated])


    return (
        <View style={commonStyles.container}>
            <Image source={require('@/assets/images/logo_t.png')} style={splashStyles.img} />
            <CustomText variant='h5' fontFamily='Medium' style={splashStyles.text}>Made in 🇮🇳</CustomText>
        </View>
    )
}

export default Main
