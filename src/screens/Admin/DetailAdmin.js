import { StyleSheet, Text, View, ActivityIndicator, Image, ImageBackground } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import CustomDomain from '../../CustomDomain';

import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/CustomButton';

import { useFonts } from 'expo-font';
import * as ExpoSplashScreen from 'expo-splash-screen';

export default function DetailAdmin({ route, navigation }) {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [joinDate, setJoinDate] = useState();

    const [loading, setLoading] = useState(false);

    const getDetailDataAdmins = () => {
        fetch(`${CustomDomain.ipAddress}/api/admins/${route.params.id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => {
                if (json.success == true) {
                    setName(json.data.name)
                    setEmail(json.data.email)
                    setJoinDate(json.data.created_at)
                    setLoading(false)
                }
            })
            .catch(err => console.log(err));
    };

    useFocusEffect(
        useCallback(
            () => {
                setLoading(true)
                getDetailDataAdmins();
            },
            []
        )
    )

    // FONT
    const [fontsLoaded] = useFonts({
        'Roboto-Medium': require('../../assets/fonts/Roboto-Medium.ttf'),
        'Roboto-MediumItalic': require('../../assets/fonts/Roboto-MediumItalic.ttf'),
        'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
        'OpenSans-Regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
        'OpenSans-SemiBold': require('../../assets/fonts/OpenSans-SemiBold.ttf'),
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

    return loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="blue" />
        </View>
    ) : (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <ImageBackground source={require('../../assets/images/profile-bg.jpg')} imageStyle={{ borderBottomRightRadius: 200, borderBottomLeftRadius: 200 }} style={styles.imgBg}>

            </ImageBackground>
            <View style={styles.profileImgContainer}>
                <View style={{ backgroundColor: '#fff', padding: 32, borderRadius: 300, borderWidth: 1.2 }}>
                    <Ionicons name='person' size={100} />
                </View>
            </View>
            <View style={{ flex: 3, gap: 15, width: '85%', marginTop: 100 }}>
                <View style={styles.profileContainer}>
                    <Ionicons name='person-outline' size={28} />
                    <View>
                        <Text style={styles.columnTitle}>Name</Text>
                        <Text style={styles.profileText}>{name}</Text>
                    </View>
                </View>
                <View style={styles.profileContainer}>
                    <Ionicons name='mail-outline' size={28} />
                    <View>
                        <Text style={styles.columnTitle}>Email</Text>
                        <Text style={styles.profileText}>{email}</Text>
                    </View>
                </View>
                <View style={styles.profileContainer}>
                    <Ionicons name='time-outline' size={28} />
                    <View>
                        <Text style={styles.columnTitle}>Join Date</Text>
                        <Text style={styles.profileText}>{joinDate}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#fff'
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        ustifyContent: 'center',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 100,
        paddingVertical: 20,
        paddingLeft: 20,
        paddingRight: 40,
    },
    profileImg: {
        width: 150,
        height: 150,
    },
    profileImgContainer: {
        position: 'absolute',
        bottom: 0,
        top: 105,
        left: 0,
        right: 0,
        alignItems: 'center'
    },
    profileText: {
        marginLeft: 7,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16
    },
    columnTitle: {
        marginLeft: 7,
        fontFamily: 'OpenSans-Regular',
        fontSize: 11
    },
    imgBg: {
        flex: 2,
        backgroundColor: 'black',
        width: '100%',
        borderBottomRightRadius: 300,
        borderBottomLeftRadius: 300
    }
})