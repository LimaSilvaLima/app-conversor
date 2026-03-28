import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';



export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 24,
    },
    label: {
        color: colors.textSecondary,
        fontSize: 14,
        marginBottom: 8,
        fontWeight: 'bold'
    },
    amount: {
        color: colors.textPrimary,
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 14,
    },
    rate: {
        color: colors.secondary,
        fontSize: 14,
        marginTop: 8,
    },
    
});