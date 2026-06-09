import { useState, useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity, Dimensions, ScrollView, TextInput, Image, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import * as Clipboard from 'expo-clipboard';

import Button from '../components/Button';
import styles from '../App.styles';
import { colors } from '../styles/colors';
import { currencies } from '../constants/currencies';
import { exchangeRateApi } from '../services/api';
import { generateHistoryData } from '../utils/generateHistory';
import { t, useLanguage } from '../localization';
import { AuthContext } from '../contexts/AuthContext';
import backend from '../services/backend';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const { locale } = useLanguage();
  const { signed } = useContext(AuthContext);

  const [fromCurrency, setFromCurrency] = useState('BRL');
  const [toCurrency, setToCurrency] = useState('USD');
  
  const [sendAmount, setSendAmount] = useState('1');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [activeInput, setActiveInput] = useState('send'); 
  
  const [rates, setRates] = useState(null);
  
  // Novos estados para gerenciar a integração com a API
  const [favorites, setFavorites] = useState([]);
  const [favoriteObjects, setFavoriteObjects] = useState([]); 
  
  const [historyData, setHistoryData] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const currentRate = rates ? rates[toCurrency] : null;

  // Carrega os favoritos sempre que o status de login mudar
  useEffect(() => {
    loadFavorites();
  }, [signed]);

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

  useEffect(() => {
    if (currentRate) {
      if (activeInput === 'send') {
        const parsed = parseFloat(sendAmount.replace(',', '.'));
        if (!isNaN(parsed)) {
          setReceiveAmount((parsed * currentRate).toFixed(2));
        } else {
          setReceiveAmount('');
        }
      } else if (activeInput === 'receive') {
        const parsed = parseFloat(receiveAmount.replace(',', '.'));
        if (!isNaN(parsed)) {
          setSendAmount((parsed / currentRate).toFixed(2));
        } else {
          setSendAmount('');
        }
      }
    }
  }, [sendAmount, receiveAmount, currentRate, activeInput]);

  useEffect(() => {
    if (currentRate) {
      setHistoryData(generateHistoryData(currentRate));
    }
  }, [currentRate]);

  // Integração GET com a OCI
  async function loadFavorites() {
    if (signed) {
      try {
        const response = await backend.get('/favorites/');
        const favsStrings = response.data.map(f => `${f.from_currency}-${f.to_currency}`);
        
        setFavorites(favsStrings);
        setFavoriteObjects(response.data);
        AsyncStorage.setItem('@converti_favorites', JSON.stringify(favsStrings)).catch(()=>{});
      } catch (error) {
        console.log('Erro ao buscar favoritos da API:', error);
        loadLocalFavorites();
      }
    } else {
      loadLocalFavorites();
    }
  }

  async function loadLocalFavorites() {
    try {
      const stored = await AsyncStorage.getItem('@converti_favorites');
      if (stored) setFavorites(JSON.parse(stored));
    } catch (error) {}
  }

  // Integração POST e DELETE com a OCI
  async function toggleFavorite() {
    const pair = `${fromCurrency}-${toCurrency}`;
    const isFav = favorites.includes(pair);
    
    // Atualiza a UI imediatamente (Optimistic UI)
    let newFavs = isFav ? favorites.filter(fav => fav !== pair) : [...favorites, pair];
    setFavorites(newFavs);
    AsyncStorage.setItem('@converti_favorites', JSON.stringify(newFavs)).catch(()=>{});
    
    if (signed) {
      try {
        if (isFav) {
          // Se já era favorito, busca o ID e deleta
          const favObj = favoriteObjects.find(f => f.from_currency === fromCurrency && f.to_currency === toCurrency);
          if (favObj) {
            await backend.delete(`/favorites/${favObj.id}`);
            setFavoriteObjects(prev => prev.filter(f => f.id !== favObj.id));
          }
        } else {
          // Se não era, cria um novo no banco
          const response = await backend.post('/favorites/', { 
            from_currency: fromCurrency, 
            to_currency: toCurrency 
          });
          setFavoriteObjects(prev => [...prev, response.data]);
        }
      } catch (error) {
        console.log('Erro ao sincronizar favorito na OCI:', error);
      }
    }
  }

  function applyFavorite(pair) {
    const [from, to] = pair.split('-');
    setFromCurrency(from);
    setToCurrency(to);
  }

  const copyToClipboard = async (text) => {
    if (!text) return;
    await Clipboard.setStringAsync(text);
    Alert.alert("Copiado!", `O valor ${text} foi copiado para a área de transferência.`);
  };

  const isFavorited = favorites.includes(`${fromCurrency}-${toCurrency}`);
  const fromSymbol = currencies.find(c => c.code === fromCurrency)?.symbol || fromCurrency;
  const toSymbol = currencies.find(c => c.code === toCurrency)?.symbol || toCurrency;
  const timeString = lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={styles.content}>
        
        <View style={styles.headerRow}>
          <Image 
            source={require('../../assets/background/logo_white.png')} 
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <View style={styles.statusIndicator}>
            <View style={[styles.statusDot, { backgroundColor: isOnline ? colors.secondary : '#94a3b8' }]} />
              <Text style={styles.statusText}>{isOnline ? t('home.realtime') : `${t('home.updated')} ${timeString}`}</Text>
          </View>
        </View>

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

        <View style={styles.exchangeCard}>
          <TouchableOpacity onPress={toggleFavorite} style={styles.cardHeaderInfo}>
            <MaterialIcons name={isFavorited ? "star" : "star-border"} size={28} color={isFavorited ? colors.secondary : colors.disabled} />
          </TouchableOpacity>

          <View style={styles.inputSection}>
            <Text style={styles.label}>{t('home.send')}</Text>
            
            <View style={localStyles.inputRow}>
              <Text style={localStyles.currencySymbol}>{fromSymbol}</Text>
              <TextInput 
                style={[styles.hugeInput, { flex: 1, marginBottom: 0 }]}
                value={sendAmount}
                onChangeText={(val) => { setActiveInput('send'); setSendAmount(val); }}
                keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor={colors.textSecondary}
              />
              <TouchableOpacity onPress={() => copyToClipboard(sendAmount)} style={localStyles.copyButton}>
                <MaterialIcons name="content-copy" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

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
            <Text style={styles.label}>{t('home.receive')}</Text>
            
            <View style={localStyles.inputRow}>
              <Text style={[localStyles.currencySymbol, { color: colors.primary }]}>{toSymbol}</Text>
              <TextInput 
                style={[styles.hugeInput, { flex: 1, color: colors.primary, marginBottom: 0 }]}
                value={receiveAmount}
                onChangeText={(val) => { setActiveInput('receive'); setReceiveAmount(val); }}
                keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor={colors.primary + '80'}
              />
              <TouchableOpacity onPress={() => copyToClipboard(receiveAmount)} style={localStyles.copyButton}>
                <MaterialIcons name="content-copy" size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.currencyScrollContent}>
              {currencies.map((currency) => (
                <Button variant="primary" key={currency.code} currency={currency} onPress={() => setToCurrency(currency.code)} isSelected={toCurrency === currency.code} />
              ))}
            </ScrollView>
          </View>
        </View>

        {historyData && (
          <View style={styles.chartCompactContainer}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>{t('home.last30days')}</Text>
              <Text style={styles.chartRate}>1 {fromCurrency} = {currentRate?.toFixed(3)} {toCurrency}</Text>
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
                style={{ marginVertical: 8 }} 
              />
            </View>
          </View>
        )}

      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    height: 48,
  },
  currencySymbol: {
    fontFamily: 'Inter_700Bold',
    color: colors.text,
    fontSize: 32,
    marginRight: 8,
    marginTop: -4, 
  },
  copyButton: {
    padding: 8,
    marginLeft: 8,
  }
});