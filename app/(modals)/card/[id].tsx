import { Stack, useLocalSearchParams, Link } from 'expo-router';
import { View, Text, Pressable, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { Alert, TextInput } from 'react-native';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import QRCode from 'react-native-qrcode-svg';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%', 
    height: '95%',
    marginTop: 'auto',
  },
  titleInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    padding: 5,
  },
  formTitle: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    padding: 5,
  },
  detailText: {
    marginBottom: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
  },
  delbuttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
close: {
    position: 'absolute',
    top: 10,
    right: 10,
    textAlign: 'center',
    padding: 10,
    },
});

export default function DetailsModal() {
  const { id } = useLocalSearchParams();
  const [barcode, setBarcode] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  
  useEffect(() => {
    const loadBarcode = async () => {
        const stored = await AsyncStorage.getItem('@barcodeList');
        if (stored) {
            const barcodes = JSON.parse(stored);
            let barcode = barcodes.find((b: any) => b.id == id);
            setBarcode(barcode);
   
            setType(barcode?.type || '');
            setDescription(barcode?.description || '');
            setTitle(barcode?.title || '');
        }
    };
    loadBarcode();
    }, [id]);

    const updateBarcode = async () => {
    try {
        const stored = await AsyncStorage.getItem('@barcodeList');
        if (stored) {
            const barcodes = JSON.parse(stored);
            const updatedBarcodes = barcodes.map((b: any) => 
            b.id == id ? { ...b, title, description } : b
            );
            await AsyncStorage.setItem('@barcodeList', JSON.stringify(updatedBarcodes));
        }
        } catch (error) {
            Alert.alert("Error",'Failed to update barcode');
            console.error(error);
        }
  };

  const deleteBarcode = async () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this barcode?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const stored = await AsyncStorage.getItem('@barcodeList');
              if (stored) {
                const barcodes = JSON.parse(stored);
                const filteredBarcodes = barcodes.filter((b: any) => b.id != id);
                await AsyncStorage.setItem('@barcodeList', JSON.stringify(filteredBarcodes));
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to delete barcode');
              console.error(error);
            }
          },
        },
      ]
    );
  };
              
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.modalContent}>
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter a title"
        />

        {barcode && type !== 'qr' && (
        <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Barcode
                format={barcode.type.toUpperCase()}
                value={barcode.data}
                text="0000002021954Q"
                maxWidth={((Dimensions.get('window').width)/2) + 100}
                height={((Dimensions.get('window').width) / 2) - 50}
            />
        </View>
        )}

        {barcode && type === 'qr' && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <QRCode
                value={barcode.data}
                size={((Dimensions.get('window').width) * 2)/ 3}
            />
          </View>
        )}

        <Text style={styles.formTitle}>Card Label: </Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter a Description"
        />

        <View style={styles.delbuttonContainer}>
          <Pressable 
            style={[styles.button, styles.deleteButton]}
            onPress={deleteBarcode}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
        </View>

        <Link href="../" asChild style={[styles.button, styles.close]}>
          <Pressable onPress={() => updateBarcode()}>
            <Text>Close</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}