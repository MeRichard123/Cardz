import Card from "@/components/Card";
import { Text, View, FlatList, StyleSheet, TouchableOpacity, NativeModules } from "react-native";
import { useState, useEffect } from "react";
import { Link } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { text } from "@/constants/i18n";

const iosLocale = NativeModules.SettingsManager?.settings?.AppleLocale || NativeModules.SettingsManager?.settings?.AppleLanguages[0];
const androidLocale = NativeModules.I18nManager?.localeIdentifier || NativeModules.I18nManager?.locale;
const locale = (iosLocale || androidLocale) ?? "en_UK";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingTop: 22,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 20,
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    borderRadius: 30,
    padding: 10,
    elevation: 5,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: { flex: 1 },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  flipButton: { alignSelf: 'flex-end' },
  captureButton: { alignSelf: 'flex-end' },
  buttonText: { color: 'white', fontSize: 18 },
});

export default function Index() {
  const [barcodes, setBarcodes] = useState<any[]>([]);

  useEffect(() => {
    const loadBarcodes = async () => {
      try {
        const stored = await AsyncStorage.getItem('@barcodeList');
        if (stored) setBarcodes(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load', e);
      }
    };
    
    loadBarcodes();
  }, [barcodes]);


  return (
    <View
      style={styles.container}
    >
    <Text style={styles.text}>Cards</Text>
    <FlatList
      data={barcodes}
      renderItem={({item}) => <Card label={item.id} desc={item?.description}>{item.title}</Card>}
      numColumns={2}
    />

      <Link href="/camera" asChild>
        <TouchableOpacity style={styles.floatingButton}>
          <Text style={{ color: "white", fontSize: 25 }}>+</Text>
        </TouchableOpacity>
      </Link>

    </View>
  )
}
