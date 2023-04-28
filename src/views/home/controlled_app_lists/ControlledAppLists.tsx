import React from 'react';
import {Text, View} from 'react-native';
import {AppDetail} from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';
import sx from './styles';

interface ListsProps {
  app: AppDetail;
  time: string;
  token: string;
}

interface ControlledAppListsProps {
  controlledLists: ListsProps[];
}

function ControlledAppLists(props: ControlledAppListsProps) {
  const {controlledLists} = props;

  return (
    <View style={sx.appContainer}>
      {controlledLists?.map?.(({app, time, token}, index) => (
        <View key={index} style={sx.controlledApp}>
          <Text style={sx.appName}>{app.label}</Text>
          <Text style={sx.timeCount}>{time}</Text>
        </View>
      ))}
    </View>
  );
}

export default ControlledAppLists;
