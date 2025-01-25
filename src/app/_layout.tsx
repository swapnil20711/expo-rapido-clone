import React from 'react'
import { Stack } from 'expo-router'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const AppNavigation = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='role' />
        </Stack>
    )
}

export default gestureHandlerRootHOC(AppNavigation)