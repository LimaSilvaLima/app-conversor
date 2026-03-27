import { StyleSheet } from "react-native";
import { colors } from "./styles/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 80,
        paddingBottom: 24
    },
    header: {
      marginBottom: 32
    },
    card : {
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 22,
        marginBottom: 24
    },
    label: {
        color: colors.textSecondary,
        fontSize: 14,
        marginBottom: 8
    },
  title: {
        color: colors.text,
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8
    },
    subtitle: {
        color: colors.textSecondary,
        fontSize: 16
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollView: {
        width: '100%'
    },
    currencyGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -4,
        justifyContent: 'space-between',
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    swapButton: {
        backgroundColor: colors.secondary,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginBottom: 24
    },
    convertButton: {
        backgroundColor: colors.secondary,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginBottom: 24
    },
    swapButtonText: {
        color: '#ffffff',  
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600'
    },
    convertButtonDisabled: {    
        backgroundColor: colors.disabled,
        opacity: 0.5
    },
    resultCard: {
        backgroundColor: colors.primary + '20',
        padding: 24,
        borderRadius: 16,
        width: '100%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.primary
    },
    resultText: {
        color: colors.text,
        fontSize: 24,
        fontWeight: 'bold'
    }
    

});

export default styles