import React from 'react'
import { Stack } from 'expo-router'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { WSProvider } from '@/service/WSProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

const AppNavigation = () => {
    return (
        <WSProvider>
            <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='index' />
                    <Stack.Screen name='role' />
                    <Stack.Screen name='customer/auth' />
                    <Stack.Screen name='captain/auth' />
                </Stack>
            </SafeAreaView>
        </WSProvider >
    );
}

export default gestureHandlerRootHOC(AppNavigation)