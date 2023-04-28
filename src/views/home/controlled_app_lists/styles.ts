import {StyleSheet} from 'react-native';
import theme from '../../../config';

const sx = StyleSheet.create({
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
});

export default sx;
