import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

export default function SplashScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#06bcee' }} >
            <ActivityIndicator size="large" color='#ffffff' />
        </View>
    )
}

const styles = StyleSheet.create({})