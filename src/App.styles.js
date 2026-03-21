import { StyleSheet } from "react-native";
import { colors } from "./styles/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 80,
        paddingBottom: 24,
    },
    header: {
      marginBottom: 32
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
    },
  title: {
        color: colors.text,
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        color: colors.textSecondary,
        fontSize: 16,
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        width: '100%',
    }
});

export default styles