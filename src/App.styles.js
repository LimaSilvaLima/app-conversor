import { StyleSheet } from "react-native";
import { colors } from "./styles/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    ScrollView: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 80,
        paddingBottom: 24
    },
    header: {
        marginBottom: 32,
    },
    title: {
        color: colors.textSecondary,
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 32,
    },
    subtitle: {
        color: colors.textSecondary,
        fontSize: 16,
    },
    card : {
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 22,
        marginBottom: 24,
    },
    label: {
        color: colors.textSecondary,
        fontSize: 14,
        marginBottom: 8,
    }
});

export default styles;