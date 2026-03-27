import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

function Button({variant = 'primary', onPress, title, currency, isSelected}) {
  return (
    <TouchableOpacity onPress={onPress} style={[
      styles.button,
        isSelected && (variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary)
    ]}>
      <Text style={styles.buttonText}>
       {currency ? currency.code : title}
      </Text>
    </TouchableOpacity>
  );
} 

export default Button;