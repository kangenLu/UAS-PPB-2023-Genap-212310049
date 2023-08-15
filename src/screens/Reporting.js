import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useFonts } from 'expo-font';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import CustomDomain from '../CustomDomain';

export default function Reporting() {
    const [adminCount, setAdminCount] = useState();
    const [transactionCount, setTransactionCount] = useState();
    const [unpaidDebt, setUnpaidDebt] = useState();
    const [income, setIncome] = useState();

    const [loading, setLoading] = useState(false);

    const getDataStatistics = () => {
        fetch(`${CustomDomain.ipAddress}/api/statistics`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => {
                if (json.success == true) {
                    setAdminCount(json.admin);
                    setTransactionCount(json.transaction);
                    setUnpaidDebt(json.unpaidDebt);
                    setIncome(json.income);
                }
            })
            .catch(err => console.log(err));
    };

    // useEffect(() => {
    //     getDataStatistics();
    // }, []);

    useFocusEffect(
        useCallback(
            () => {
                setLoading(true)
                getDataStatistics();
            },
            []
        )
    )

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
            <View style={styles.statsContainer}>
                {/* <Text style={styles.statisticsText}>Statistics</Text> */}
                <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'center' }}>
                    <View style={styles.statsBox}>
                        <Text style={styles.statsTitle}>Admin Data</Text>
                        <View style={styles.adminCircle}>
                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 30 }}>{adminCount}</Text>
                        </View>
                        <View style={styles.statsTextContainer}>
                            <Text style={styles.statsDesc}>{adminCount} Admin(s)</Text>
                        </View>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={styles.statsTitle}>Transaction</Text>
                        <MaterialCommunityIcons name='chart-line-variant' size={84} color='#fda16e' />
                        <View style={styles.statsTextContainer}>
                            <Text style={styles.statsData}>{transactionCount}</Text>
                            <Text style={styles.statsDesc}>Transaction</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'center' }}>
                    <View style={styles.statsBox}>
                        <Text style={styles.statsTitle}>Unpaid Debt</Text>
                        <Ionicons name='alert-circle-outline' size={75} color='#f87ea2' />
                        <View style={styles.statsTextContainer}>
                            <Text style={styles.statsData}>{unpaidDebt}</Text>
                            <Text style={styles.statsDesc}>Debt</Text>
                        </View>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={styles.statsTitle}>Income</Text>
                        <MaterialCommunityIcons name='account-cash-outline' size={70} color='#7ea4fc' />
                        <View style={styles.statsTextContainer}>
                            <Text style={styles.statsData}>{income}</Text>
                            <Text style={styles.statsDesc}>Total Income</Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    statisticsText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 35,
        marginBottom: 15
    },
    statsContainer: {
        flex: 1,
        gap: 15,
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 27,
        // backgroundColor: 'red'
    },
    adminCircle: {
        borderWidth: 6,
        borderColor: '#ae99ff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 18,
        borderRadius: 300,
        height: 120,
        width: 120,
        backgroundColor: '#fff',
        elevation: 10
    },
    statsBox: {
        backgroundColor: '#fff',
        elevation: 16,
        borderRadius: 20,
        padding: 25,
        justifyContent: 'space-between',
        width: '50%',
    },
    statsTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: '#81818c',
        marginBottom: 25
    },
    statsData: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 22
    },
    statsDesc: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 14,
        color: '#81818c'
    },
    statsTextContainer: {
        marginTop: 25
    }
})