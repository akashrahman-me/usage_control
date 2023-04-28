import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import styles from '../../styles/main';

interface TimingAndTokenInputProps {
  timing: string;
  handleTiming: (text: string) => void;
  spandToken: string;
  handleSpandToken: (text: string) => void;
}

const TimingAndTokenInput = (props: TimingAndTokenInputProps) => {
  const {timing, handleTiming, spandToken, handleSpandToken} = props;

  return (
    <View
      style={{
        marginBottom: 12,
        display: 'flex',
        flexDirection: 'row',
      }}>
      <TextInput
        style={{
          ...styles.formControl,
          width: '48%',
          marginRight: '2%',
        }}
        value={timing}
        keyboardType="numeric"
        onChangeText={handleTiming}
        placeholder="Time in minute"
      />
      <TextInput
        style={{
          ...styles.formControl,
          width: '48%',
          marginLeft: '2%',
        }}
        value={spandToken}
        keyboardType="numeric"
        onChangeText={handleSpandToken}
        placeholder="Token will spend"
      />
    </View>
  );
};

export default TimingAndTokenInput;
