import React, {type ReactNode} from 'react';
import {Text, View} from 'react-native';
import sx from './styles';

function Navbar() {
  return (
    <View style={sx.navbar}>
      <Text style={sx.bigTitle}>usage control</Text>
    </View>
  );
}

export default Navbar;
