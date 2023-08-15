import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React, { useCallback, useContext } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

import { useFonts } from 'expo-font';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { AuthContext } from '../context/AuthContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

import AntDesign from 'react-native-vector-icons/AntDesign';

export default function CustomDrawer(props) {
    const { userInfo, logout } = useContext(AuthContext);

    // FONT
    const [fontsLoaded] = useFonts({
        'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
        'Roboto-MediumItalic': require('../assets/fonts/Roboto-MediumItalic.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
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
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: 'black' }} >
                <ImageBackground source={require('../assets/images/profile-bg.jpg')} style={{ padding: 20 }}>
                    <Image source={require('../assets/images/avatar.png')} style={{ height: 80, width: 80, marginBottom: 10, borderRadius: 40 }} />
                    <Text style={styles.userText}>{userInfo.data.name}</Text>
                    <Text style={styles.userEmailText}>{userInfo.data.email}</Text>
                </ImageBackground>
                <View style={styles.menuList}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={styles.logoutSection}>
                <TouchableOpacity style={{ paddingVertical: 15 }} onPress={logout}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <AntDesign name='logout' size={22} />
                        <Text style={styles.logoutText}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    userText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Montserrat-Bold'
    },
    userEmailText: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'OpenSans-Regular'
    },
    menuList: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10
    },
    logoutSection: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc'
    },
    logoutText: {
        fontSize: 15,
        fontFamily: 'Roboto-Medium',
        marginLeft: 5
    }
})