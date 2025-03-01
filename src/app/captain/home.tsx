import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { logout } from '@/service/authService'
import { useUserStore } from '@/store/useUserStore'
import { useRiderStore } from '@/store/useRiderStore'

const home = () => {
    const { clearData } = useUserStore()
    const { clearRiderData } = useRiderStore();
    return (
        <View>
            <Text>Captain Home</Text>
            <Button onPress={() => {
                logout(clearData, clearRiderData)
            }}>Logout
            </Button>
        </View>
    )
}

export default home