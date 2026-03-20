import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';


export const styles =StyleSheet.create({
    button: {
        backgroundColor: colors.inputBackgound,
        paddingHorizontal: 16,
        paddingVertical: 8,
        margin: 4,
        borderRadius: 8,
    },
    buttonText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '500',
    },
    buttonPrimary: {
        backgroundColor: colors.primary,
    },
    buttonSecondary: {
        backgroundColor: colors.secondary,
    },
});

