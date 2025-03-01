import { View, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { commonStyles } from '@/styles/commonStyles'
import { splashStyles } from '@/styles/splashStyles'
import CustomText from '@/components/shared/CustomText'
import { useFonts } from 'expo-font'
import { resetAndNavigate } from '@/utils/Helpers'
import { useUserStore } from '@/store/useUserStore'
import { tokenStorage } from '@/store/storage'
import { jwtDecode } from 'jwt-decode'
import { refreshTokens } from '@/service/apiInterceptors'
import { logout } from '@/service/authService'

type DecodedToken = {
    exp: number
}
const Main = () => {
    const [loaded] = useFonts({
        Bold: require("@/assets/fonts/NotoSans-Bold.ttf"),
        Light: require("@/assets/fonts/NotoSans-Light.ttf"),
        Medium: require("@/assets/fonts/NotoSans-Medium.ttf"),
        Regular: require("@/assets/fonts/NotoSans-Regular.ttf"),
        SemiBold: require("@/assets/fonts/NotoSans-SemiBold.ttf")
    })
    const [hasNavigated, setHasNavigated] = useState(false);
    const { user } = useUserStore();

    const checkToken = async () => {
        const accessToken = tokenStorage.getString("access_token") as string
        const refreshToken = tokenStorage.getString("refresh_token") as string

        if (accessToken) {
            const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
            const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

            const currentTime = Date.now() / 1000;

            if (decodedRefreshToken.exp < currentTime) {
                logout()
                Alert.alert("Session Expired, please login again!")
            }

            if (decodedAccessToken.exp < currentTime) {
                try {
                    refreshTokens();
                } catch (e) {
                    console.log(e)
                    Alert.alert("Error refeshing token")
                }
            }

            if (user !== null) {
                resetAndNavigate("/customer/home")
                return
            }
            else {
                resetAndNavigate("/captain/home")
                return
            }
        }

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
    );
}

export default Main
