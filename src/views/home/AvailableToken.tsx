import React from 'react';
import {Text, View} from 'react-native';

interface AvailableTokenProps {
  token: number | string;
}

function AvailableToken(props: AvailableTokenProps) {
  const {token} = props;
  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          color: 'black',
          fontSize: 24,
          fontWeight: '600',
          borderBottomColor: '#ddd',
          borderBottomWidth: 1,
          paddingVertical: 12,
          marginBottom: 10,
        }}>
        Available Token: {token}
      </Text>
    </View>
  );
}

export default AvailableToken;
