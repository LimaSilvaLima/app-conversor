import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';
import { colors } from '../../styles/colors';

function Button({variant = 'primary', onPress, title, currency, isSelected}) {
  const selectedTextStyle = isSelected 
    ? { 
        color: variant === 'primary' ? colors.primary : colors.aqua, 
        fontFamily: 'Inter_700Bold' 
      } 
    : {};

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[
      styles.button,
      isSelected && (variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary)
    ]}>
      <Text style={[styles.buttonText, selectedTextStyle]}>
       {currency ? currency.code : title}
      </Text>
    </TouchableOpacity>
  );
} 

export default Button;