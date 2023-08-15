import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

export default function InputField({ placeholder, icon, inputType, keyboardType, value, onChangeText, readOnly   }) {
    return (
        <View>
            <View style={styles.inputWrapper}>
                {icon}
                {inputType == 'password' ? (
                    <TextInput style={styles.input} value={value} placeholder={placeholder} keyboardType={keyboardType} secureTextEntry onChangeText={onChangeText} readOnly={readOnly} />
                ) : (<TextInput style={styles.input} value={value} placeholder={placeholder} keyboardType={keyboardType} onChangeText={onChangeText} readOnly={readOnly} />)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputWrapper: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25
    },
    input: {
        flex: 1,
        paddingVertical: 0,
        marginLeft: 5
    }
})