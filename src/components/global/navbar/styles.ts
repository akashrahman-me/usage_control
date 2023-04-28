import {StyleSheet} from 'react-native';
import theme from '../../../config';

const sx = StyleSheet.create({
  navbar: {
    backgroundColor: theme.colors.primary.main,
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
});

export default sx;
