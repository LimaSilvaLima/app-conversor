import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        color: colors.textSecondary,
        fontSize: 14,
        marginBottom: 8,
    },
    input: {
        backgroundColor: colors.inputBackground,
        color: colors.text,
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
    },
});
