import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import CustomDomain from '../../CustomDomain';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useFonts } from 'expo-font';
import * as ExpoSplashScreen from 'expo-splash-screen';

export default function DetailTransaction({ route, navigation }) {
    const [idTransaction, setIdTransaction] = useState();
    const [productOrdered, setProductOrdered] = useState();
    const [quantity, setQuantity] = useState();
    const [priceItem, setPriceItem] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [totalPaid, setTotalPaid] = useState();
    const [totalUnpaid, setTotalUnpaid] = useState();
    const [status, setStatus] = useState();

    const [loading, setLoading] = useState(false);

    const getDetailDataTransactions = () => {
        fetch(`${CustomDomain.ipAddress}/api/transactions/${route.params.id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => {
                if (json.success == true) {
                    setIdTransaction(json.data.id)
                    setProductOrdered(json.data.product_ordered)
                    setQuantity(json.data.quantity)
                    setPriceItem(json.data.price_item)
                    setTotalPrice(json.data.total_price)
                    setTotalPaid(json.data.total_paid)
                    setTotalUnpaid(json.data.total_unpaid)
                    setStatus(json.data.status)
                    setLoading(false)
                }
            })
            .catch(err => console.log(err));
    };

    useFocusEffect(
        useCallback(
            () => {
                setLoading(true)
                getDetailDataTransactions();
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
        <ScrollView style={styles.container} onLayout={onLayoutRootView} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.profileImgContainer}>
                {status == 'Lunas' ? (
                    <View style={{ backgroundColor: 'green', padding: 20, width: 100, height: 100, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name='checkmark' size={50} color='white' />
                    </View>
                ) : (
                    <View style={{ backgroundColor: 'red', padding: 20, width: 100, height: 100, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name='alert' size={50} color='white' />
                    </View>
                )}
            </View>
            <View style={{ flex: 3, gap: 15, width: '90%', marginTop: 30 }}>
                <View style={styles.profileContainer}>
                    <AntDesign name='shoppingcart' size={28} />
                    <View>
                        <Text style={styles.columnTitle}>ID Transaction</Text>
                        <Text style={styles.profileText}>{idTransaction}</Text>
                    </View>
                </View>
                <View style={styles.profileContainer}>
                    <Ionicons name='fast-food-outline' size={28} />
                    <View>
                        <Text style={styles.columnTitle}>Product Ordered</Text>
                        <Text style={styles.profileText}>{productOrdered}</Text>
                    </View>
                </View>
                <View style={styles.profileContainer}>
                    <AntDesign name='pluscircleo' size={28} />
                    <View>
                        <Text style={styles.columnTitle}>Quantity</Text>
                        <Text style={styles.profileText}>{quantity}</Text>
                    </View>
                </View>
                <View style={styles.profileContainer}>
                    <Ionicons name='pricetag-outline' size={28} />
                    <View>
                        <Text style={styles.columnTitle}>Price/Item</Text>
                        <Text style={styles.profileText}>{priceItem}</Text>
                    </View>
                </View>
                <View style={styles.profileContainer}>
                    <AntDesign name='creditcard' size={28} />
                    <View>
                        <Text style={styles.columnTitle}>Total Price</Text>
                        <Text style={styles.profileText}>{totalPrice}</Text>
                    </View>
                </View>
                <View style={styles.profileContainer}>
                    <AntDesign name='creditcard' size={28} />
                    <View>
                        <Text style={styles.columnTitle}>Total Paid</Text>
                        <Text style={styles.profileText}>{totalPaid}</Text>
                    </View>
                </View>
                <View style={styles.profileContainer}>
                    <AntDesign name='creditcard' size={28} />
                    <View>
                        <Text style={styles.columnTitle}>Total Unpaid</Text>
                        <Text style={styles.profileText}>{totalUnpaid}</Text>
                    </View>
                </View>
                <View style={styles.profileContainer}>
                    <Ionicons name='time-outline' size={28} />
                    <View>
                        <Text style={styles.columnTitle}>Status</Text>
                        <Text style={styles.profileText}>{status}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginTop: 20
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
    }
})