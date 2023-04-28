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

interface AppSelectionProps {
  showInstalledApps: () => Promise<void>;
  selectedApp: AppDetail | undefined;
  modalVisible: boolean;
  installedApps: AppDetail[];
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleAppSelected: (app: AppDetail) => void;
}

function AppSelection(props: AppSelectionProps) {
  const {
    modalVisible,
    selectedApp,
    showInstalledApps,
    installedApps,
    setModalVisible,
    handleAppSelected,
  } = props;

  return (
    <View style={{marginBottom: 12}}>
      <TouchableOpacity onPress={showInstalledApps}>
        <Text
          style={{
            paddingHorizontal: 12,
            paddingVertical: 8,
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
              <TouchableOpacity onPress={() => handleAppSelected(item)}>
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
  );
}

export default AppSelection;
