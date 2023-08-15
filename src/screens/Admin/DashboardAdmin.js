import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, RefreshControl } from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import CustomDomain from "../../CustomDomain";

import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";

import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useFonts } from 'expo-font';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardAdmin({ navigation }) {
    const [msg, setMsg] = useState();
    const [dataAdmins, setDataAdmins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const { userInfo, isLoading, logout } = useContext(AuthContext);

    const getDataAdmins = () => {
        fetch(`${CustomDomain.ipAddress}/api/admins`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => {
                if (json.success == true) {
                    setMsg(json.messages);
                    setDataAdmins(json.data);
                    setLoading(false)
                }
            })
            .catch(err => console.log(err));
    };

    // useEffect(() => {
    //     getDataAdmins();
    // }, []);

    useFocusEffect(
        useCallback(
            () => {
                setLoading(true)
                getDataAdmins();
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} onLayout={onLayoutRootView}>
            <FlatList showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refresh} onRefresh={() => {
                        getDataAdmins();
                        setRefresh(false);
                    }} />
                }
                data={dataAdmins}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <View style={{ paddingHorizontal: 10 }}>
                        <ImageBackground source={require('../../assets/images/profile-bg.jpg')} style={styles.profileCard} imageStyle={{ borderRadius: 30 }}>
                            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Detail Admin', {
                                id: item.id
                            })}>
                                <Image style={styles.img}
                                    source={require('../../assets/images/avatar.png')}
                                    resizeMode="stretch"
                                />
                                <View style={styles.teks}>
                                    <Text style={styles.textName}>{item.name}</Text>
                                    <Text style={styles.textEmail}>{item.email}</Text>
                                </View>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: 'transparent',
    },
    img: {
        margin: 15,
        width: 62,
        height: 62,
        borderRadius: 50 / 2
    },
    teks: {
        flex: 1
    },
    textName: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        color: '#fff'
    },
    textEmail: {
        fontSize: 12,
        fontFamily: 'OpenSans-Regular',
        color: '#fff'
    },
    profileCard: {
        padding: 0,
        alignItems: 'center',
        marginTop: 10,
        padding: 10
    },
    headerName: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 16,
        color: '#000'
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey'
    },
    headerButton: {
        borderWidth: 2,
        borderRadius: 100,
        padding: 6,
        borderStyle: 'dotted'
    },
})