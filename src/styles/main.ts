import {StyleSheet} from 'react-native';
import theme from '../config';

const styles = StyleSheet.create({
  formControl: {
    borderWidth: 1,
    borderColor: '#aaa',
    paddingVertical: 4,
    paddingHorizontal: 12,
    fontSize: 16,
    borderRadius: 4,
  },
  buttonControl: {
    backgroundColor: theme.colors.primary.main,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    text: {
      color: 'white',
      textAlign: 'center',
      fontSize: 16,
    },
  },
});

export default styles;
