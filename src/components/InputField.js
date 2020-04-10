import React from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
function InputField({labelText, initialValue, onChangeText}) {
  return (
    <View>
      <Text style={styles.labelStyle}>{labelText}</Text>
      <TextInput
        style={styles.inputStyle}
        value={initialValue}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 5,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 18,
    padding: 5,
    margin: 5,
  },
});
export default InputField;
