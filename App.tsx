import React, {ReactNode} from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';

import Home from './src/views/home/Home';

function App(): ReactNode {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{backgroundColor: 'white'}}>
        <View style={{backgroundColor: 'white'}}>
          <Home />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
