import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function CustomButton({ buttonText, onPress, style }) {
    return (
        <View style={style}>
            <TouchableOpacity style={styles.customButton} onPress={onPress}>
                <Text style={styles.customButtonText}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    customButton: {
        backgroundColor: '#000',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30
    },
    customButtonText: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16,
        color: '#FFFFFF'
    }
})