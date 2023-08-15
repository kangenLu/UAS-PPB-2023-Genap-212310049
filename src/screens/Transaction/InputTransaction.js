import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useContext, useState, useCallback, useEffect } from 'react'

import { AuthContext } from '../../context/AuthContext';

import { useFonts } from 'expo-font';
import * as ExpoSplashScreen from 'expo-splash-screen';

import Spinner from 'react-native-loading-spinner-overlay';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';

import TransactionVector from '../../assets/images/transaction-vector.jpg';

import DropDownPicker from 'react-native-dropdown-picker';
import { useFocusEffect } from '@react-navigation/native';
import CustomDomain from '../../CustomDomain';

ExpoSplashScreen.preventAutoHideAsync();

export default function InputTransaction({ navigation }) {
    const [dataProducts, setDataProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [productOrdered, setProductOrdered] = useState('');
    const [quantity, setQuantity] = useState('');
    const [priceItem, setPriceItem] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [totalPaid, setTotalPaid] = useState('');
    const [totalUnpaid, setTotalUnpaid] = useState('');
    const [status, setStatus] = useState('');

    const getDataProducts = () => {
        fetch(`${CustomDomain.ipAddress}/api/product`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => {
                if (json.success == true) {
                    setDataProducts(json.data);
                    setLoading(false)
                }
            })
            .catch(err => console.log(err));
    };

    useFocusEffect(
        useCallback(
            () => {
                setLoading(true)
                getDataProducts();
            },
            []
        )
    )

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Lunas', value: 'Lunas' },
        { label: 'Belum Lunas', value: 'Belum Lunas' }
    ]);

    const currencyFormat = (num) => {
        return 'Rp ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const sumTotal = () => {
        let sum = parseInt(quantity) * priceItem;
        if (!quantity.trim() || !priceItem) {
            return ''
        } else {
            return sum.toString()
        }
    }

    useEffect(() => {
        setTotalPrice(sumTotal());
    }, [quantity, priceItem])

    const sumTotalUnpaid = () => {
        let sum = parseInt(totalPrice) - parseInt(totalPaid)
        if (sum < 0) {
            return 0;
        }
        return sum;
    }

    useEffect(() => {
        setTotalUnpaid(sumTotalUnpaid());
    }, [totalPaid])

    const conPriceItem = () => {
        if (!priceItem) {
            return 'Automatically filled when selecting product'
        } else {
            return (currencyFormat(priceItem)).toString()
        }
    }

    const { isLoading, storeTransaction,
        errorProductOrdered,
        errorQuantity,
        errorPriceItem,
        errorTotalPrice,
        errorTotalPaid,
        errorTotalUnpaid,
        errorStatus } = useContext(AuthContext);

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

    return (
        <ScrollView style={styles.container} onLayout={onLayoutRootView} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image source={TransactionVector} style={{ width: 350, height: 350 }} />
            <View style={styles.screenWrapper}>
                <Spinner visible={isLoading} />
                <Text style={styles.titleText}>Add new Transaction</Text>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 10 }}>
                        <Ionicons name='fast-food-outline' size={22} />
                        <Text style={{ marginLeft: 5 }}>Select Product Ordered</Text>
                    </View>
                    <DropDownPicker
                        containerProps={{
                            height: open === true ? 140 : null,
                            backgroundColor: "#fff",
                        }}
                        dropDownContainerStyle={{
                            backgroundColor: "#fff",
                        }}
                        style={{ marginBottom: 30 }}
                        open={open}
                        value={value}
                        items={dataProducts.map(item => ({ label: item.product_name, value: [item.product_name, item.price_item] }))}
                        setOpen={setOpen}
                        setValue={setValue}
                        dropDownDirection='bottom'
                        listMode='SCROLLVIEW'
                        onChangeValue={(value) => {
                            {
                                value ?
                                    setProductOrdered(value[0]) &
                                    setPriceItem(value[1])
                                    :
                                    setProductOrdered('') &
                                    setPriceItem('')
                            }
                        }}
                        placeholder='Choose product from this list'
                    />
                    <Text style={styles.errorText}>{errorProductOrdered}</Text>
                </View>
                <View>
                    <View style={styles.inputTitleContainer}>
                        <Ionicons name='pricetag-outline' size={20} />
                        <Text style={{ marginLeft: 5 }}>Price/Item</Text>
                    </View>
                    <InputField placeholder={"Enter Price/Item"}
                        value={conPriceItem()}
                        readOnly={true}
                        color="#666" />
                    <Text style={styles.errorText}>{errorPriceItem}</Text>
                </View>
                <View>
                    <View style={styles.inputTitleContainer}>
                        <AntDesign name='pluscircleo' size={20} />
                        <Text style={{ marginLeft: 5 }}>Quantity</Text>
                    </View>
                    {priceItem ? <>
                        <InputField placeholder={"Enter Quantity"}
                            keyboardType={'numeric'}
                            value={quantity}
                            onChangeText={text => setQuantity(text)}
                            color="#666" />
                        <Text style={styles.errorText}>{errorQuantity}</Text>
                    </> : <>
                        <InputField placeholder={"Select Product first to enter quantity"}
                            readOnly={true}
                            color="#666" />
                        <Text style={styles.errorText}>{errorQuantity}</Text>
                    </>}
                </View>
                <View>
                    <View style={styles.inputTitleContainer}>
                        <AntDesign name='creditcard' size={20} />
                        <Text style={{ marginLeft: 5 }}>Total Price</Text>
                    </View>
                    <InputField placeholder={"Total Price"}
                        keyboardType={'numeric'}
                        value={currencyFormat(parseInt(totalPrice))}
                        readOnly={true}
                        color="#666" />
                    <Text style={styles.errorText}>{errorTotalPrice}</Text>
                </View>
                <View>
                    <View style={styles.inputTitleContainer}>
                        <Ionicons name='checkmark-circle-outline' size={20} />
                        <Text style={{ marginLeft: 5 }}>Total Paid</Text>
                    </View>
                    {quantity ? <>
                        <InputField placeholder={"Enter Total Paid"}
                            keyboardType={'numeric'}
                            value={totalPaid}
                            onChangeText={text => setTotalPaid(text)}
                            color="#666" />
                        <Text style={styles.errorText}>{errorTotalPaid}</Text>
                    </> : <>
                        <InputField placeholder={"Enter Quantity First"}
                            readOnly={true}
                            color="#666" />
                        <Text style={styles.errorText}>{errorTotalPaid}</Text>
                    </>}
                </View>
                <View>
                    <View style={styles.inputTitleContainer}>
                        <Ionicons name='alert-circle-outline' size={20} />
                        <Text style={{ marginLeft: 5 }}>Total Unpaid</Text>
                    </View>
                    <InputField placeholder={"Enter Total Unpaid"}
                        value={(currencyFormat(totalUnpaid)).toString()}
                        readOnly={true}
                        color="#666" />
                    <Text style={styles.errorText}>{errorTotalUnpaid}</Text>
                </View>
                <View>
                    <View style={styles.inputTitleContainer}>
                        <Ionicons name='time-outline' size={20} />
                        <Text style={{ marginLeft: 5 }}>Status</Text>
                    </View>
                    <InputField placeholder={"Enter Status"}
                        value={status}
                        onChangeText={text => setStatus(text)}
                        color="#666" />
                    <Text style={styles.errorText}>{errorStatus}</Text>
                </View>

                <CustomButton style={{ marginTop: 70 }} buttonText={'Save'} onPress={() => {
                    storeTransaction(productOrdered, quantity, priceItem, totalPrice, totalPaid, totalUnpaid, status)
                    {
                        !productOrdered.trim() ||
                            !quantity.trim() ||
                            !priceItem ||
                            !totalPrice.trim() ||
                            !totalPaid.trim() ||
                            !totalUnpaid ||
                            !status.trim() ? navigation.navigate('Input Transaction') : navigation.navigate('Transaction')
                    }
                }} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    screenWrapper: {
        width: '85%',
        marginTop: 15
    },
    titleText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 24,
        marginBottom: 30
    },
    errorText: {
        marginTop: -20,
        marginBottom: 20,
        color: 'red',
        fontFamily: 'OpenSans-Regular',
        fontSize: 12
    },
    errorStatus: {
        marginTop: 5,
        marginBottom: 20,
        color: 'red',
        fontFamily: 'OpenSans-Regular',
        fontSize: 12
    },
    inputTitleContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 5
    }
})