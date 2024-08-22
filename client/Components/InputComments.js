import React from 'react';
import { View, TextInput, StyleSheet,Text } from 'react-native';

const InputComments = ({ comments, setComments }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.inputTitle}>Leave a detailed review</Text>
            <TextInput
                value={comments}
                onChangeText={setComments}
                placeholder="'Write about food and service of the restaurant'"
                placeholderTextColor="#8F8F8F"
                style={styles.input}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        paddingTop: 25

    },
    inputTitle:{
        fontFamily: 'Ubuntu-Bold',
        fontSize: 16,
        marginBottom: 10
    },
    input: {
        borderColor: '#FFB300',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 12,
        fontFamily: 'Ubuntu-Medium',
        paddingBottom: 100,
        paddingTop: 15,
    },
});

export default InputComments
