import { useState, useEffect } from 'react';
import { Text, KeyboardAvoidingView, Platform, View, TouchableOpacity, Dimensions, ScrollView, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

import Button from '../components/Button';
import styles from '../App.styles';
import { colors } from '../styles/colors';
import { currencies } from '../constants/currencies';
import { exchangeRateApi } from '../services/api';
import { convertCurrency } from '../utils/convertCurrency';
import { generateHistoryData } from '../utils/generateHistory';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('BRL');
  const [toCurrency, setToCurrency] = useState('USD');
  
  const [rates, setRates] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [historyData, setHistoryData] = useState(null);
  
  // Status de Conexão e Tempo
  const [isOnline, setIsOnline] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    async function fetchRates() {
      try {
        const data = await exchangeRateApi(fromCurrency);
        setRates(data.rates);
        setIsOnline(true);
        setLastUpdated(new Date());
      } catch (error) {
        setIsOnline(false);
      }
    }
    fetchRates();
  }, [fromCurrency]);

  const currentRate = rates ? rates[toCurrency] : null;
  const result = (amount && !isNaN(amount) && currentRate) ? convertCurrency(amount, currentRate) : '0.00';

  useEffect(() => {
    if (currentRate) {
      setHistoryData(generateHistoryData(currentRate));
    }
  }, [currentRate]);

  async function loadFavorites() {
    try {
      const stored = await AsyncStorage.getItem('@converti_favorites');
      if (stored) setFavorites(JSON.parse(stored));
    } catch (error) {}
  }

  async function toggleFavorite() {
    const pair = `${fromCurrency}-${toCurrency}`;
    let newFavs = favorites.includes(pair) ? favorites.filter(fav => fav !== pair) : [...favorites, pair];
    setFavorites(newFavs);
    AsyncStorage.setItem('@converti_favorites', JSON.stringify(newFavs)).catch(()=>{});
  }

  function applyFavorite(pair) {
    const [from, to] = pair.split('-');
    setFromCurrency(from);
    setToCurrency(to);
  }

  const isFavorited = favorites.includes(`${fromCurrency}-${toCurrency}`);
  const toSymbol = currencies.find(c => c.code === toCurrency)?.symbol || toCurrency;
  
  // Formatação do tempo para o formato HH:MM
  const timeString = lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Container Fixo. */}
      <View style={styles.content}>
        
        {/* Header com Status */}
        <View style={styles.headerRow}>
          <Image 
            source={require('../../assets/background/logo_white.png')} 
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <View style={styles.statusIndicator}>
            <View style={[styles.statusDot, { backgroundColor: isOnline ? colors.secondary : '#94a3b8' }]} />
            <Text style={styles.statusText}>
              {isOnline ? 'Tempo real' : `Atualizado ${timeString}`}
            </Text>
          </View>
        </View>

        {/* Chips de Acesso Rápido */}
        {favorites.length > 0 && (
          <View style={styles.favoritesSection}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {favorites.map((pair) => (
                <TouchableOpacity key={pair} style={styles.favoriteChip} onPress={() => applyFavorite(pair)}>
                  <MaterialIcons name="star" size={14} color={colors.secondary} />
                  <Text style={styles.favoriteChipText}>{pair.replace('-', ' → ')}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Card de Conversão */}
        <View style={styles.exchangeCard}>
          <TouchableOpacity onPress={toggleFavorite} style={styles.cardHeaderInfo}>
            <MaterialIcons name={isFavorited ? "star" : "star-border"} size={28} color={isFavorited ? colors.secondary : colors.disabled} />
          </TouchableOpacity>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Você envia</Text>
            <TextInput 
              style={styles.hugeInput}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor={colors.textSecondary}
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.currencyScrollContent}>
              {currencies.map((currency) => (
                <Button key={currency.code} currency={currency} onPress={() => setFromCurrency(currency.code)} isSelected={fromCurrency === currency.code} variant="primary" />
              ))}
            </ScrollView>
          </View>

          <View style={styles.divider}>
            <TouchableOpacity style={styles.swapButtonFloat} onPress={() => { setFromCurrency(toCurrency); setToCurrency(fromCurrency); }}>
              <MaterialIcons name="swap-vert" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Você recebe</Text>
            <Text style={styles.hugeResult} numberOfLines={1} adjustsFontSizeToFit>{toSymbol} {result}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.currencyScrollContent}>
              {currencies.map((currency) => (
                <Button variant="secondary" key={currency.code} currency={currency} onPress={() => setToCurrency(currency.code)} isSelected={toCurrency === currency.code} />
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Gráfico Autoajustável com Dias e Valores */}
        {historyData && (
          <View style={styles.chartCompactContainer}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Últimos 30 Dias</Text>
              <Text style={styles.chartRate}>1 {fromCurrency} = {currentRate?.toFixed(4)} {toCurrency}</Text>
            </View>
            
            <View style={styles.chartWrapper}>
              <LineChart
                data={historyData}
                width={screenWidth - 72} 
                height={160}
                yAxisLabel={`${toSymbol} `}
                yAxisSuffix=""
                withHorizontalLabels={true} 
                withVerticalLabels={true}    
                withInnerLines={true}
                withOuterLines={false}
                segments={4}
                chartConfig={{
                  backgroundColor: colors.cardBackground,
                  backgroundGradientFrom: colors.cardBackground,
                  backgroundGradientTo: colors.cardBackground,
                  decimalPlaces: 3, 
                  color: (opacity = 1) => `rgba(251, 97, 7, ${opacity})`,
                  labelColor: () => colors.textSecondary,
                  propsForDots: { r: "3", strokeWidth: "2", stroke: colors.primary },
                  propsForLabels: { fontSize: 10, fontFamily: 'Inter_500Medium' },
                  propsForBackgroundLines: { strokeDasharray: "", stroke: 'rgba(255,255,255,0.05)' } 
                }}
                bezier
                style={{ 
                  marginVertical: 8,
                }} 
              />
            </View>
          </View>
        )}

      </View>
    </KeyboardAvoidingView>
  );
}