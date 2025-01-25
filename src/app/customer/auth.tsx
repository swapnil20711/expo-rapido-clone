import { Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { authStyles } from '@/styles/authStyles'
import { ScrollView } from 'react-native-gesture-handler'
import CustomText from '@/components/shared/CustomText'
import { commonStyles } from '@/styles/commonStyles'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TextInput } from 'react-native-paper'

const Auth = () => {
    return (
        <SafeAreaView style={authStyles.container} edges={['top', 'bottom']}>
            <ScrollView>
                <View style={commonStyles.flexRowBetween}>
                    <Image source={require('@/assets/images/logo_t.png')} style={authStyles.logo} />
                    <TouchableOpacity style={authStyles.flexRowGap}>
                        <MaterialIcons name="help" size={24} color="grey" />
                        <CustomText fontFamily='Medium' variant='h7'>Help</CustomText>
                    </TouchableOpacity>
                </View>

                <CustomText fontFamily='Medium' variant='h6'> What is your number?</CustomText>
                <CustomText style={commonStyles.lightText} fontFamily='Regular' variant='h7'> Enter your phone number to proceed</CustomText>
                <TextInput
                    mode='outlined'
                    inputMode='tel'
                    style={{ backgroundColor: "#fff", marginTop: 14 }}
                    placeholder='836-4588-33596' />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Auth