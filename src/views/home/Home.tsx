import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {InstalledApps} from 'react-native-launcher-kit';
import {AppDetail} from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';
import Navbar from '../../components/global/navbar/Navbar';
import AvailableToken from './AvailableToken';
import ControlledAppLists from './controlled_app_lists/ControlledAppLists';
import AppSelection from './app_selection/AppSelection';
import styles from '../../styles/main';
import TimingAndTokenInput from './TimingAndTokenInput';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AppOpenDetect from './AppOpenDetect';

interface ListsProps {
  app: AppDetail;
  time: string;
  token: string;
}

function Home() {
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

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const getlists = (await AsyncStorage.getItem('@data_key')) as string;

        if (getlists !== null) {
          setControlledLists(JSON.parse(getlists));
        }
      } catch (error) {
        // Handle error if any
      }
    };
    retrieveData();
  }, []);

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
          index === existingAppIndex ? {app, time, token} : listItem,
        );
      }

      const updated = [...prevControlledLists, {app, time, token}];

      (async () =>
        await AsyncStorage.setItem('@data_key', JSON.stringify(updated)))();

      // If the app does not exist, add it to the list
      return updated;
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
    console.log(app.packageName);

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
    <View>
      <AppOpenDetect />
      <Navbar />
      <AvailableToken token={500} />
      <View style={{paddingHorizontal: 12}}>
        <ControlledAppLists controlledLists={controlledLists} />
        <View>
          <AppSelection
            handleAppSelected={handleAppSelected}
            installedApps={installedApps}
            modalVisible={modalVisible}
            selectedApp={selectedApp}
            setModalVisible={setModalVisible}
            showInstalledApps={showInstalledApps}
          />
          <TimingAndTokenInput
            timing={timing}
            handleTiming={handleTiming}
            spandToken={spandToken}
            handleSpandToken={handleSpandToken}
          />
          <View>
            <TouchableOpacity
              style={styles.buttonControl}
              onPress={handleSubmit}>
              <Text style={styles.buttonControl.text as any}>Submit now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Home;
