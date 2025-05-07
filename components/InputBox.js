import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

const InputBox = ({ label, value, onChangeText, placeholder }) => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: { marginBottom: 15 },
    label: { fontSize: 16, marginBottom: 5 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        fontSize: 16,
    },
});

export default InputBox;
