import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{backgroundColor: 'white'}}>
        <View style={{backgroundColor: 'white'}}>
          <View>
            <Text style={styles.h2}>hello world!</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    color: 'black',
  },
  h2: {
    fontSize: 40,
    color: 'black',
    fontWeight: '900',
  },
});

export default App;
