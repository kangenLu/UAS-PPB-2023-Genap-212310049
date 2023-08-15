import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import DashboardAdmin from '../screens/Admin/DashboardAdmin';
import Dashboard from '../screens/Dashboard';
import DashboardTransaction from '../screens/Transaction/DashboardTransaction';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useFonts } from 'expo-font';
import * as ExpoSplashScreen from 'expo-splash-screen';

import { AntDesign } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Reporting from '../screens/Reporting';

const Drawer = createDrawerNavigator();

export default function AppDrawer() {

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

    const customAdminHeader = ({ navigation }) => ({
        drawerIcon: ({ color }) => (
            <Ionicons name='person-outline' size={22} color={color} />
        ),
        headerStyle: {
            backgroundColor: '#fff'
        },
        headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 16,
            color: '#000'
        },
        headerTitleAlign: 'center',
        headerLeft: () => (
            <TouchableOpacity style={styles.headerLeft} onPress={() => { navigation.openDrawer() }}>
                <MaterialCommunityIcons name='dots-circle' size={30} color='#000' />
            </TouchableOpacity>
        ),
        headerRight: () => (
            <TouchableOpacity style={styles.headerRight}
                onPress={() => navigation.navigate("Input Admin")}>
                <AntDesign name='plus' size={20} />
            </TouchableOpacity>
        )
    })

    const customTransactionHeader = ({ navigation }) => ({
        drawerIcon: ({ color }) => (
            <Ionicons name='bar-chart-outline' size={22} color={color} />
        ),
        headerStyle: {
            backgroundColor: '#fff'
        },
        headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 16,
            color: '#000'
        },
        headerTitleAlign: 'center',
        headerLeft: () => (
            <TouchableOpacity style={styles.headerLeft} onPress={() => { navigation.openDrawer() }}>
                <MaterialCommunityIcons name='dots-circle' size={30} color='#000' />
            </TouchableOpacity>
        ),
        headerRight: () => (
            <TouchableOpacity style={styles.headerRight}
                onPress={() => navigation.navigate("Input Transaction")}>
                <AntDesign name='plus' size={20} />
            </TouchableOpacity>
        )
    })

    const customReportingHeader = ({ navigation }) => ({
        drawerIcon: ({ color }) => (
            <Ionicons name='archive-outline' size={22} color={color} />
        ),
        headerStyle: {
            backgroundColor: '#fff'
        },
        headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 16,
            color: '#000'
        },
        headerTitleAlign: 'center',
        headerLeft: () => (
            <TouchableOpacity style={styles.headerLeft} onPress={() => { navigation.openDrawer() }}>
                <MaterialCommunityIcons name='dots-circle' size={30} color='#000' />
            </TouchableOpacity>
        ),
    })

    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerActiveBackgroundColor: '#000',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#333',
                drawerLabelStyle: { marginLeft: -25, fontFamily: 'Roboto-Medium', fontSize: 15 },
            }} onLayout={onLayoutRootView}>

            <Drawer.Screen name='Dashboard' component={Dashboard} options={{
                drawerIcon: ({ color }) => (
                    <AntDesign name='dashboard' size={22} color={color} />
                ),
                headerShown: false
            }}></Drawer.Screen>
            <Drawer.Screen name='Admin' component={DashboardAdmin} options={customAdminHeader}></Drawer.Screen>
            <Drawer.Screen name='Transaction' component={DashboardTransaction} options={customTransactionHeader}></Drawer.Screen>
            <Drawer.Screen name='Reporting' component={Reporting} options={customReportingHeader}></Drawer.Screen>

        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    headerLeft: {
        marginLeft: 25
    },
    headerRight: {
        marginRight: 25,
        borderWidth: 2,
        borderRadius: 100,
        padding: 6,
        borderStyle: 'dotted'
    }
})