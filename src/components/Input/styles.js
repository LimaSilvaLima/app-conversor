import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontFamily: 'Inter_500Medium',
        color: colors.textSecondary,
        fontSize: 14,
        marginBottom: 8,
    },
    input: {
        backgroundColor: colors.inputBackground,
        color: colors.text,
        fontSize: 16,
        fontFamily: 'Inter_400Regular', 
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 12,
    },
});