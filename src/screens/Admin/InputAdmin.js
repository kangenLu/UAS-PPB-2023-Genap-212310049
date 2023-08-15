import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useState, useCallback } from 'react'

import { AuthContext } from '../../context/AuthContext';

import RegisterVector from '../../assets/images/register-vector.jpg';

import { useFonts } from 'expo-font';
import * as ExpoSplashScreen from 'expo-splash-screen';

import Spinner from 'react-native-loading-spinner-overlay';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';

ExpoSplashScreen.preventAutoHideAsync();

export default function InputAdmin({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { isLoading, register, errorName, errorEmail, errorPassword } = useContext(AuthContext);

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
        <View style={styles.container} onLayout={onLayoutRootView}>
            <Image source={RegisterVector} style={styles.registerVector} />
            <View style={styles.screenWrapper}>
                <Spinner visible={isLoading} />
                <Text style={styles.registerText}>Add new Admin</Text>
                {/* <Text>{message}</Text> */}
                <InputField placeholder={"Enter Name"}
                    icon={<Ionicons name='person-outline' size={20} />}
                    inputType={'text'}
                    value={name}
                    onChangeText={text => setName(text)}
                    color="#666" />
                <Text style={styles.errorText}>{errorName}</Text>

                <InputField placeholder={"Enter Email"}
                    icon={<MaterialIcons name='alternate-email' size={20} />}
                    inputType={'email'}
                    keyboardType={'email-address'}
                    value={email}
                    onChangeText={text => setEmail(text)}
                    color="#666" />
                <Text style={styles.errorText}>{errorEmail}</Text>

                <InputField placeholder={"Enter Password"}
                    icon={<Ionicons name='ios-lock-closed-outline' size={20} />}
                    inputType={'password'}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    color="#666" />
                <Text style={styles.errorText}>{errorPassword}</Text>

                {!name.trim() || !email.trim() || !password.trim() ? (<CustomButton buttonText={'Save'} onPress={() => {
                    register(name, email, password), navigation.navigate('Input Admin')
                }} />) : (<CustomButton buttonText={'Save'} onPress={() => {
                    register(name, email, password), navigation.navigate('Admin')
                }} />)}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    screenWrapper: {
        width: '85%',
        marginTop: 15
    },
    registerVector: {
        width: 250,
        height: 250
    },
    registerText: {
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
    }
})