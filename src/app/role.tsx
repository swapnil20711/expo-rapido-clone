import { View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { roleStyles } from '@/styles/roleStyles'
import CustomText from '@/components/shared/CustomText'
import { resetAndNavigate } from '@/utils/Helpers'

const RoleScreen = () => {
  const handleCaptainPress = () => {
    resetAndNavigate('/captain/auth')
  }
  const handleCustomerPress = () => {
    resetAndNavigate('/customer/auth')
  }
  return (
    <View style={roleStyles.container}>
      <Image source={require("@/assets/images/logo_t.png")} style={roleStyles.logo} />
      <CustomText fontFamily='Medium' variant='h6'>
        Choose your user type
      </CustomText>
      <TouchableOpacity style={roleStyles.card} onPress={handleCustomerPress}>
        <Image source={require("@/assets/images/customer.png")} style={roleStyles.image} />
        <View style={roleStyles.cardContent}>
          <CustomText fontFamily='Medium' style={roleStyles.title}>Customer</CustomText>
          <CustomText variant='h7' fontFamily='Light' style={roleStyles.description}>Are you a customer? Order rides and deliveries.</CustomText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={roleStyles.card} onPress={handleCaptainPress}>
        <Image source={require("@/assets/images/captain.png")} style={roleStyles.image} />
        <View style={roleStyles.cardContent}>
          <CustomText fontFamily='Medium' style={roleStyles.title}>Captain</CustomText>
          <CustomText variant='h7' fontFamily='Light' style={roleStyles.description}>Are you a captain? Join us to drive and deliver.</CustomText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default RoleScreen