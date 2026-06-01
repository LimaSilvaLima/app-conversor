import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.inputBackground,
        paddingHorizontal: 18,
        paddingVertical: 10,
        marginRight: 10,
        borderRadius: 24, 
        borderWidth: 1,
        borderColor: colors.inputBackground,
    },
    buttonText: {
        color: colors.textSecondary,
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
    },
    buttonPrimary: {
        backgroundColor: 'rgba(251, 97, 7, 0.15)',
        borderColor: colors.primary,
    },
    buttonSecondary: {
        backgroundColor: 'rgba(87, 196, 229, 0.15)',
        borderColor: colors.aqua,
    },
});