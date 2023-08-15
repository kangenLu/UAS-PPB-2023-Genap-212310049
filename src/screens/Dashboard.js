import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'

import { useFonts } from 'expo-font';
import * as ExpoSplashScreen from 'expo-splash-screen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CustomDomain from '../CustomDomain';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard({ navigation }) {
    const [dataIncome, setDataIncome] = useState('');
    const [loading, setLoading] = useState(false);

    const getDataIncome = () => {
        fetch(`${CustomDomain.ipAddress}/api/statistics`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => {
                if (json.success == true) {
                    setDataIncome(json.income);
                }
            })
            .catch(err => console.log(err));
    };

    // useEffect(() => {
    //     getDataIncome();
    // }, []);

    useFocusEffect(
        useCallback(
            () => {
                setLoading(true)
                getDataIncome();
            },
            []
        )
    )

    const { userInfo } = useContext(AuthContext);

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

    const currencyFormat = (num) => {
        return 'Rp ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
                    <MaterialCommunityIcons name='dots-circle' size={30} color='#fff' />
                </TouchableOpacity>
                <Text style={styles.headerName}>Dashboard</Text>
                <TouchableOpacity onPress={() => { }}>
                    <Image source={require('../assets/images/avatar.png')} style={styles.headerImg} />
                </TouchableOpacity>
            </View>
            <ImageBackground source={require('../assets/images/body-bg.jpg')} style={styles.bodyContainer} imageStyle={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, }}>
                <View style={styles.greetingContainer}>
                    <Text style={styles.hiText}> Hi, {userInfo.data.name}! </Text>
                    <Entypo name='dots-two-horizontal' size={22} />
                </View>
                <ImageBackground source={require('../assets/images/bg-1.jpg')} style={styles.balanceContainer} imageStyle={{ borderRadius: 40 }}>
                    <Entypo name='dots-three-horizontal' size={22} color='#fff' style={{ marginBottom: 20 }} />
                    <Text style={styles.balance}>Total Income</Text>
                    {dataIncome ? (<Text style={styles.balanceAmount}>{currencyFormat(dataIncome)}</Text>) : ''}
                </ImageBackground>
                <View style={styles.toolsContainer}>
                    <Text style={styles.toolsText}>Tools</Text>
                    <Entypo name='dots-two-horizontal' size={22} style={{ marginBottom: 20, marginTop: 10 }} />
                </View>

                <View style={styles.actionContainer}>
                    <View style={styles.actionContentContainer}>
                        <TouchableOpacity style={styles.actionIcon}>
                            <Ionicons name='person' size={30} />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.actionTitle}>Admin</Text>
                            <Text style={styles.actionDescription}>Add new Admin data</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => { navigation.navigate('Input Admin') }}>
                        <EvilIcons name='plus' size={30} />
                    </TouchableOpacity>
                </View>

                <View style={styles.actionContainer}>
                    <View style={styles.actionContentContainer}>
                        <TouchableOpacity style={styles.actionIcon}>
                            <Ionicons name='bar-chart' size={30} />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.actionTitle}>Transaction</Text>
                            <Text style={styles.actionDescription}>Add new Transaction data</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => { navigation.navigate('Input Transaction') }}>
                        <EvilIcons name='plus' size={30} />
                    </TouchableOpacity>
                </View>

                <View style={styles.actionContainer}>
                    <View style={styles.actionContentContainer}>
                        <TouchableOpacity style={styles.actionIcon}>
                            <Ionicons name='archive' size={30} />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.actionTitle}>Reporting</Text>
                            <Text style={styles.actionDescription}>See data statistics</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => { navigation.navigate('Reporting') }}>
                        <EvilIcons name='arrow-right' size={30} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    headerName: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: '#fff'
    },
    headerContainer: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 30
    },
    headerImg: {
        width: 45,
        height: 45
    },
    bodyContainer: {
        flex: 14,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        padding: 40
    },
    greetingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    hiText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 22
    },
    balanceContainer: {
        backgroundColor: '#000',
        paddingTop: 30,
        paddingBottom: 60,
        paddingLeft: 50,
        paddingRight: 30,
        borderRadius: 50,
        marginTop: 25
    },
    balance: {
        color: '#fff',
        fontFamily: 'OpenSans-Regular',
        fontSize: 12
    },
    balanceAmount: {
        color: '#fff',
        fontFamily: 'Montserrat-Bold',
        fontSize: 25
    },
    toolsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 25
    },
    toolsText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    actionContentContainer: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center'
    },
    actionIcon: {
        backgroundColor: '#f0f0f7',
        borderRadius: 100,
        padding: 10
    },
    actionTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16
    },
    actionDescription: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 12,
        color: 'grey'
    }
})