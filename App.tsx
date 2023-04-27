import React, {ReactNode, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  Platform,
} from 'react-native';
import {InstalledApps} from 'react-native-launcher-kit';
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import {AppDetail} from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';

function App(): ReactNode {
  const [modalVisible, setModalVisible] = useState(false);
  const [installedApps, setInstalledApps] = useState<AppDetail[]>([]);
  const [selectedApp, setSelectedApp] = useState<AppDetail>();
  const [timing, setTiming] = useState('');
  const [time, setTime] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);

  const showInstalledApps = async () => {
    try {
      const apps = InstalledApps.getApps();
      setInstalledApps(apps);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching installed apps:', error);
    }
  };

  const handleAppSelected = (app: AppDetail) => {
    setSelectedApp(app);
    setModalVisible(false);
  };

  const handleSubmit = () => {
    // Your button press logic goes here
    console.log('Button pressed');
  };

  const onChange = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || time;
    setShow(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const showTimePicker = () => {
    setShow(true);
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{backgroundColor: 'white'}}>
        <View style={{backgroundColor: 'white'}}>
          <View style={styles.navbar}>
            <Text style={styles.bigTitle}>usage control</Text>
          </View>
          <View style={styles.main}>
            <View style={styles.appContainer}>
              {[...Array(4)].map((_, index) => (
                <View key={index} style={styles.controlledApp}>
                  <Text style={styles.appName}>Free Fire</Text>
                  <Text style={styles.timeCount}>03 | 48 | 16</Text>
                </View>
              ))}
            </View>
            <View style={styles.addNewApp}>
              <View style={{marginBottom: 12}}>
                <TouchableOpacity onPress={showInstalledApps}>
                  <Text
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      backgroundColor: '#eeee',
                      fontSize: 16,
                      color: 'black',
                      textAlign: 'center',
                    }}>
                    {selectedApp ? selectedApp?.label : 'Select an App'}
                  </Text>
                </TouchableOpacity>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(false);
                  }}>
                  <View style={{backgroundColor: 'white'}}>
                    <FlatList
                      data={installedApps}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          onPress={() => handleAppSelected(item)}>
                          <Text
                            style={{
                              color: 'black',
                              paddingHorizontal: 8,
                              paddingVertical: 6,
                              backgroundColor: '#ddd',
                              marginVertical: 1,
                              borderRadius: 4,
                            }}>
                            {item.label}
                          </Text>
                        </TouchableOpacity>
                      )}
                      keyExtractor={item => item.packageName}
                    />
                  </View>
                </Modal>
              </View>
              <View style={{marginBottom: 12}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.primary.main,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 4,
                  }}
                  onPress={showTimePicker}>
                  <Text
                    style={{color: 'white', textAlign: 'center', fontSize: 16}}>
                    Show Date Picker
                  </Text>
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    value={time}
                    mode="date"
                    display="default"
                    onChange={onChange}
                  />
                )}
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#aaa',
                    paddingVertical: 2,
                    paddingHorizontal: 12,
                    fontSize: 16,
                    borderRadius: 4,
                  }}
                  value={timing}
                  onChangeText={setTiming}
                  placeholder="Type here..."
                />
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.primary.main,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 4,
                  }}
                  onPress={handleSubmit}>
                  <Text
                    style={{color: 'white', textAlign: 'center', fontSize: 16}}>
                    Submit now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const colors = {
  primary: {
    main: '#9B51E0',
  },
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: colors.primary.main,
    marginBottom: 12,
  },
  bigTitle: {
    fontSize: 32,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  main: {
    paddingHorizontal: 12,
  },
  appContainer: {
    marginBottom: 12,
  },
  controlledApp: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  appName: {
    fontSize: 18,
    color: 'black',
    textTransform: 'capitalize',
  },
  timeCount: {
    fontSize: 16,
    color: 'black',
  },
  addNewApp: {},
});

export default App;
