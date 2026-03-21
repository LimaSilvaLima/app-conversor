import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

function Button({variant = 'primary', onPress, title }) {
  return (
    <TouchableOpacity onPress={onPress} style={[
      styles.button,
        variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary
    ]}>
      <Text style={styles.buttonText}>{title || 'Clique aqui'}</Text>
    </TouchableOpacity>
  );
} 

export default Button;