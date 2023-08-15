import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AdminVector from '../assets/images/administrator.jpg';

import { useFonts } from 'expo-font';
import * as ExpoSplashScreen from 'expo-splash-screen';

export default function Register() {

    // FONT
    const [fontsLoaded] = useFonts({
        'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
        'Roboto-MediumItalic': require('../assets/fonts/Roboto-MediumItalic.ttf'),
        'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
        'OpenSans-SemiBold': require('../assets/fonts/OpenSans-SemiBold.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await ExpoSplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }
    // END FONT

    return (
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
            <Image source={AdminVector} style={styles.adminVector} />
            <Text style={styles.sorryText}>Sorry! </Text>
            <Text style={styles.descText}> this feature is not available at the moment, Please contact administrator for registration</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 15
    },
    adminVector: {
        width: 350,
        height: 350
    },
    sorryText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 33
    },
    descText: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 14
    }
})