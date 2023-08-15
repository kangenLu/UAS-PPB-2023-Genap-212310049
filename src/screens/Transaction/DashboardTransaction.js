import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, RefreshControl } from "react-native";
// import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect, useCallback, useContext } from "react";
import CustomDomain from "../../CustomDomain";

import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";

import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useFonts } from 'expo-font';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardTransaction({ navigation }) {
    const [dataTransactions, setDataTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [status, setStatus] = useState();

    const getDataTransactions = () => {
        fetch(`${CustomDomain.ipAddress}/api/transactions`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => {
                if (json.success == true) {
                    setDataTransactions(json.data);
                    setLoading(false)
                }
            })
            .catch(err => console.log(err));
    };

    // useEffect(() => {
    //     getDataTransactions();
    // }, []);

    useFocusEffect(
        useCallback(
            () => {
                setLoading(true)
                getDataTransactions();
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
                        getDataTransactions();
                        setRefresh(false);
                    }} />
                }
                data={dataTransactions}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <View style={{ paddingHorizontal: 10 }}>
                        <View style={styles.profileCard}>
                            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Detail Transaction', {
                                id: item.id
                            })}>
                                {item.status == 'Lunas' ? (
                                    <View style={{ backgroundColor: 'green', padding: 20, borderRadius: 100, width: 65, height: 65, justifyContent: 'center', alignItems: 'center' }}>
                                        <Ionicons name='checkmark' size={25} color='white' />
                                    </View>
                                ) : (
                                    <View style={{ backgroundColor: 'red', padding: 20, borderRadius: 100, width: 65, height: 65, justifyContent: 'center', alignItems: 'center' }}>
                                        <Ionicons name='alert' size={25} color='white' />
                                    </View>
                                )}
                                <View style={styles.teks}>
                                    <Text style={styles.textIdTransaction}>T{item.id}</Text>
                                    <Text style={styles.textCustomerName}>{item.product_ordered}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
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
    textIdTransaction: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        color: '#000',
        marginLeft: 10
    },
    textCustomerName: {
        fontSize: 12,
        fontFamily: 'OpenSans-Regular',
        color: '#000',
        marginLeft: 10
    },
    profileCard: {
        padding: 0,
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: '#fff',
        borderBottomWidth: 2,
        borderBottomColor: 'lightgrey'
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