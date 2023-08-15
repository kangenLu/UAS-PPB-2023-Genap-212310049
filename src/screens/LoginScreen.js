import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useContext, useState, useCallback } from 'react'

import { AuthContext } from '../context/AuthContext';

import LoginVector from '../assets/images/login-vector.jpg';

import { useFonts } from 'expo-font';
import * as ExpoSplashScreen from 'expo-splash-screen';

import Spinner from 'react-native-loading-spinner-overlay';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

ExpoSplashScreen.preventAutoHideAsync();

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const { isLoading, login } = useContext(AuthContext);

    // FONT
    const [fontsLoaded] = useFonts({
        'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
        'Roboto-MediumItalic': require('../assets/fonts/Roboto-MediumItalic.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
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
        <View style={styles.container} onLayout={onLayoutRootView}>
            <Image source={LoginVector} style={styles.loginVector} />
            <View style={styles.screenWrapper}>
                <Spinner visible={isLoading} />
                <Text style={styles.loginText}>Login</Text>

                <InputField placeholder={"Enter Email"}
                    icon={<MaterialIcons name='alternate-email' size={20} />}
                    inputType={'email'}
                    keyboardType={'email-address'}
                    value={email}
                    onChangeText={text => setEmail(text)}
                    color="#666" />

                <InputField placeholder={"Enter Password"}
                    icon={<Ionicons name='ios-lock-closed-outline' size={20} />}
                    inputType={'password'}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    color="#666" />

                <CustomButton buttonText={'Login'} onPress={() => {
                    login(email, password);
                }} />

                <Text style={styles.orText}> OR </Text>

                <View style={styles.registerWrapper}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.registerText}>Register</Text>
                    </TouchableOpacity>
                </View>
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
    inputWrapper: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25
    },
    screenWrapper: {
        width: '85%',
        marginTop: 18
    },
    icon: {
        marginRight: 5
    },
    input: {
        flex: 1,
        paddingVertical: 0
    },
    loginVector: {
        width: 350,
        height: 350,
        transform: [{ rotate: '-5deg' }]
    },
    loginText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 28,
        fontWeight: '500',
        color: '#333',
        marginBottom: 30,
        marginTop: -20
    },
    loginButton: {
        backgroundColor: '#AD40AF',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30
    },
    loginButtonText: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16,
        color: '#FFFFFF'
    },
    orText: {
        textAlign: 'center',
        fontFamily: 'Roboto-MediumItalic',
        fontSize: 25
    },
    registerWrapper: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center'
    },
    registerText: {
        color: 'red',
        fontFamily: 'Roboto-MediumItalic'
    }
})