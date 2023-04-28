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
} from 'react-native';
import {InstalledApps} from 'react-native-launcher-kit';
import {AppDetail} from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';

interface ListsProps {
  app: AppDetail;
  time: string;
  token: string;
}

function App(): ReactNode {
  const [modalVisible, setModalVisible] = useState(false);
  const [installedApps, setInstalledApps] = useState<AppDetail[]>([]);
  const [selectedApp, setSelectedApp] = useState<AppDetail>();
  const [timing, setTiming] = useState<string>('');
  const [spandToken, setSpandToken] = useState<string>('');

  const handleTiming = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setTiming(numericValue);
  };
  const handleSpandToken = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setSpandToken(numericValue);
  };

  const [controlledLists, setControlledLists] = useState<ListsProps[]>([]);

  const handleControlledLists = (
    app: AppDetail,
    time: string,
    token: string,
  ) => {
    setControlledLists(prevControlledLists => {
      // Find the index of the existing app in the list
      const existingAppIndex = prevControlledLists.findIndex(
        listItem => listItem.app.packageName === app.packageName,
      );

      // If the app exists, replace it with the new item
      if (existingAppIndex !== -1) {
        return prevControlledLists.map((listItem, index) =>
          index === existingAppIndex
            ? {
                app: app,
                time: time,
                token: token,
              }
            : listItem,
        );
      }

      // If the app does not exist, add it to the list
      return [
        ...prevControlledLists,
        {
          app: app,
          time: time,
          token: token,
        },
      ];
    });
  };

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
    if (selectedApp) {
      handleControlledLists(selectedApp, timing, spandToken);
      setSelectedApp(undefined);
      setTiming('');
      setSpandToken('');
    }
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
              Available Token: 500
            </Text>
          </View>
          <View style={styles.main}>
            <View style={styles.appContainer}>
              {controlledLists.map(({app, time, token}, index) => (
                <View key={index} style={styles.controlledApp}>
                  <Text style={styles.appName}>{app.label}</Text>
                  <Text style={styles.timeCount}>{time}</Text>
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
              <View
                style={{
                  marginBottom: 12,
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <TextInput
                  style={{...sx.formControl, width: '48%', marginRight: '2%'}}
                  value={timing}
                  keyboardType="numeric"
                  onChangeText={handleTiming}
                  placeholder="Time in minute"
                />
                <TextInput
                  style={{...sx.formControl, width: '48%', marginLeft: '2%'}}
                  value={spandToken}
                  keyboardType="numeric"
                  onChangeText={handleSpandToken}
                  placeholder="Toekn will spend"
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
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 16,
                    }}>
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

const sx = StyleSheet.create({
  formControl: {
    borderWidth: 1,
    borderColor: '#aaa',
    paddingVertical: 2,
    paddingHorizontal: 12,
    fontSize: 16,
    borderRadius: 4,
  },
});

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
