import { StyleSheet } from "react-native";
import { colors } from "./styles/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLogo: {
    width: 120,
    height: 36,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.inputBackground,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontFamily: 'Inter_500Medium',
    color: colors.textSecondary,
    fontSize: 11,
  },

  favoritesSection: {
    height: 48,
    marginBottom: 12,
  },
  favoriteChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginRight: 8,
  },
  favoriteChipText: {
    fontFamily: 'Inter_700Bold',
    color: colors.textSecondary,
    fontSize: 12,
    marginLeft: 4,
  },

  // Card Central
  exchangeCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    position: 'relative',
  },
  cardHeaderInfo: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 10,
  },
  inputSection: {
    marginBottom: 4,
  },
  label: {
    fontFamily: 'Inter_500Medium',
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 8,
  },
  hugeInput: {
    fontFamily: 'Inter_700Bold',
    color: colors.text,
    fontSize: 32,
    padding: 0,
    margin: 0,
    height: 40,
    marginBottom: 12,
  },
  hugeResult: {
    fontFamily: 'Inter_700Bold',
    color: colors.primary,
    fontSize: 32,
    height: 40,
    marginBottom: 12,
  },
  currencyScrollContent: {
    paddingRight: 20,
  },
  

  divider: {
    height: 1,
    backgroundColor: colors.inputBackground,
    marginVertical: 12,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swapButtonFloat: {
    position: 'absolute',
    backgroundColor: colors.inputBackground,
    borderRadius: 50,
    padding: 6,
    borderWidth: 4,
    borderColor: colors.cardBackground,
    zIndex: 10,
  },

  chartCompactContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flex: 1, 
  },
  chartHeader: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  chartTitle: {
    fontFamily: 'Inter_500Medium',
    color: colors.textSecondary,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  chartRate: {
    fontFamily: 'Inter_700Bold',
    color: colors.primary,
    fontSize: 13,
  },
  chartWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  }
});

export default styles;