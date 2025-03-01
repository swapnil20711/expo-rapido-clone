import React from 'react'
import { Stack } from 'expo-router'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { WSProvider } from '@/service/WSProvider';

const AppNavigation = () => {
    return (
        <WSProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name='index' />
                <Stack.Screen name='role' />
                <Stack.Screen name='customer/auth' />
                <Stack.Screen name='captain/auth' />
            </Stack>
        </WSProvider >
    );
}

export default gestureHandlerRootHOC(AppNavigation)