import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CameraModal() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) return <View />;

  const handleBarcodeScanned = async ({ type, data } : any) => {
    setScanned(true);
    const existingBarcodes = await AsyncStorage.getItem('@barcodeList');
    const barcodes = existingBarcodes ? JSON.parse(existingBarcodes) : [];

    const newBarcode = {
        id: barcodes.length + 1,
        type: type,
        data: data,
        createdAt: new Date().toISOString(),
        title: 'Barcode',
        description: '',
    }

    await AsyncStorage.setItem(
      '@barcodeList',
      JSON.stringify([...barcodes, newBarcode])
    );
    
    alert(`Saved: ${data}`);
  };

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need camera permission</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={'back'}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417", 'aztec', 'ean13', 'ean8', 'upc_e', 'datamatrix',  'code39',  'code93', 'itf14','codabar','code128','upc_a']
        }}
        >
        <View style={styles.buttonContainer}>
          <Link href="../" asChild>
            <TouchableOpacity style={styles.closeButton}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </CameraView>
        {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  buttonContainer: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  },
  flipButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderRadius: 8,
  },
  closeButton: {
    backgroundColor: 'rgba(255,0,0,0.5)',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  message: {
    color: 'white',
    fontSize: 16,
    marginBottom: 16,
  }
});