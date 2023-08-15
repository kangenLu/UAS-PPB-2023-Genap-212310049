import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from './context/AuthContext';
import SplashScreen from './screens/SplashScreen';

import AuthStack from './navigation/AuthStack';
import AppDrawer from './navigation/AppDrawer';

import InputAdmin from './screens/Admin/InputAdmin';
import DetailAdmin from './screens/Admin/DetailAdmin';
import InputTransaction from './screens/Transaction/InputTransaction';
import DetailTransaction from './screens/Transaction/DetailTransaction';

const Stack = createNativeStackNavigator();

export default function Nav() {
    const { userInfo, splashLoading } = useContext(AuthContext);

    return (
        <NavigationContainer>
            {splashLoading ? (
                <Stack.Navigator>
                    <Stack.Screen name="Splash Screen" component={SplashScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            ) : userInfo.data?.token ?
                (
                    <>
                        <Stack.Navigator>
                            <Stack.Screen name="Main Screen" component={AppDrawer} options={{ headerShown: false }} />
                            <Stack.Screen name="Input Admin" component={InputAdmin} />
                            <Stack.Screen name="Detail Admin" component={DetailAdmin} />

                            <Stack.Screen name="Input Transaction" component={InputTransaction} />
                            <Stack.Screen name="Detail Transaction" component={DetailTransaction} />
                        </Stack.Navigator>
                    </>
                ) : (
                    <>
                        <AuthStack />
                    </>
                )}
        </NavigationContainer>
    );
}