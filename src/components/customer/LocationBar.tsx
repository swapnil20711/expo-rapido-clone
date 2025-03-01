import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { uiStyles } from '@/styles/uiStyles'
import AntDesign from '@expo/vector-icons/AntDesign';
import { RFValue } from 'react-native-responsive-fontsize';
import { logout } from '@/service/authService';
import { useWS } from '@/service/WSProvider';
import { useUserStore } from '@/store/useUserStore';
import { useRiderStore } from '@/store/useRiderStore';
import { Searchbar } from 'react-native-paper';
import CustomText from '../shared/CustomText';

const LocationBar = () => {
    const { disconnect } = useWS();
    const { clearData, location } = useUserStore();
    const { clearRiderData } = useRiderStore();
    return (
        <View style={uiStyles.absoluteTop}>
            <View style={[uiStyles.container, { flexDirection: "row", flex: 1 }]}>
                <TouchableOpacity style={uiStyles.btn}>
                    <AntDesign name="poweroff" size={RFValue(18)} onPress={() => {
                        logout(clearData, clearRiderData, disconnect)
                    }} />
                </TouchableOpacity>
                {/* <Searchbar
                    placeholder='Where are you going?'
                    style={uiStyles.locationBar}
                    value={search}
                    onChangeText={(text) => {
                        setSearch(text)
                    }}
                /> */}
                <TouchableOpacity style={uiStyles.locationBar}>
                    <View style={uiStyles.dot} />
                    <CustomText numberOfLines={1} style={uiStyles.locationText}>
                        {location?.address || "Getting address..."}
                    </CustomText>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default LocationBar