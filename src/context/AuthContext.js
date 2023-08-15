import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import CustomDomain from "../CustomDomain";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});

    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);

    const [message, setMessage] = useState();

    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const [errorProductOrdered, setErrorProductOrdered] = useState('');
    const [errorQuantity, setErrorQuantity] = useState('');
    const [errorPriceItem, setErrorPriceItem] = useState('');
    const [errorTotalPrice, setErrorTotalPrice] = useState('');
    const [errorTotalPaid, setErrorTotalPaid] = useState('');
    const [errorTotalUnpaid, setErrorTotalUnpaid] = useState('');
    const [errorStatus, setErrorStatus] = useState('');

    const register = (name, email, password) => {
        setIsLoading(true);

        axios.post(`${CustomDomain.ipAddress}/api/register`, {
            name, email, password
        })
            .then(res => {
                let userInfo = res.data;
                setIsLoading(false);
                console.log(userInfo);
                setMessage(userInfo.message);

                if (userInfo.success == false) {
                    setErrorName(userInfo.data.name);
                    setErrorEmail(userInfo.data.email);
                    setErrorPassword(userInfo.data.password);
                } else {
                    setErrorName('');
                    setErrorEmail('');
                    setErrorPassword('');
                }

            })
            .catch(e => {
                console.log(`Register Error ${e}`);
                setIsLoading(false);
            });
    };

    const login = (email, password) => {
        setIsLoading(true);

        axios.post(`${CustomDomain.ipAddress}/api/login`, {
            email, password
        })
            .then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
                console.log(userInfo.data.token);
            })
            .catch(e => {
                console.log(`Login Error ${e}`);
                setIsLoading(false);
            });
    }

    const logout = () => {
        setIsLoading(true);

        axios.post(`${CustomDomain.ipAddress}/api/logout`, {}, {
            headers: { Authorization: `Bearer ${userInfo.data.token}` },
        })
            .then(res => {
                console.log(res.data);
                AsyncStorage.removeItem('userInfo');
                setUserInfo({});
                setIsLoading(false);
            })
            .catch(e => {
                console.log(`Logout Error ${e}`);
                setIsLoading(false);
            })
    }

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);

            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserInfo(userInfo);
            }

            setSplashLoading(false);
        } catch (e) {
            setSplashLoading(false);
            console.log(`is logged in error ${e}`);
        }
    }

    const storeTransaction = (product_ordered, quantity, price_item, total_price, total_paid, total_unpaid, status) => {
        setIsLoading(true);

        axios.post(`${CustomDomain.ipAddress}/api/transactions`, {
            product_ordered, quantity, price_item, total_price, total_paid, total_unpaid, status
        })
            .then(res => {
                let transactionInfo = res.data;
                setIsLoading(false);
                console.log(transactionInfo);
                setMessage(transactionInfo.message);

                if (transactionInfo.success == false) {
                    setErrorProductOrdered(transactionInfo.data.product_ordered);
                    setErrorQuantity(transactionInfo.data.quantity);
                    setErrorPriceItem(transactionInfo.data.price_item);
                    setErrorTotalPrice(transactionInfo.data.total_price);
                    setErrorTotalPaid(transactionInfo.data.total_paid);
                    setErrorTotalUnpaid(transactionInfo.data.total_unpaid);
                    setErrorStatus(transactionInfo.data.status);
                } else {
                    setErrorProductOrdered('');
                    setErrorQuantity('');
                    setErrorPriceItem('');
                    setErrorTotalPrice('');
                    setErrorTotalPaid('');
                    setErrorTotalUnpaid('');
                    setErrorStatus('');
                }
            })
            .catch(e => {
                console.log(`Store Transaction Error ${e}`);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{
            isLoading,
            userInfo,
            splashLoading,
            message,
            errorName,
            errorEmail,
            errorPassword,

            errorProductOrdered,
            errorQuantity,
            errorPriceItem,
            errorTotalPrice,
            errorTotalPaid,
            errorTotalUnpaid,
            errorStatus,

            register,
            login,
            logout,
            storeTransaction
        }}>
            {children}
        </AuthContext.Provider>
    )
}