import React, {useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import {
  pay,
  openCardsManager,
  MerchantInfo,
  CustomerInfo,
  BillItems,
  FawryCallbacks,
  FawryLanguages,
} from '@fawry_pay/rn-fawry-pay-sdk';
import uuid from 'react-native-uuid';

interface FawryConfig {
  baseUrl: string;
  language: FawryLanguages;
  allow3DPayment: boolean;
  skipReceipt: boolean;
  skipLogin: boolean;
  payWithCardToken: boolean;
  authCaptureMode: boolean;
  merchantInfo: MerchantInfo;
  customerInfo: CustomerInfo;
}

const fawryConfig: FawryConfig = {
  baseUrl: 'https://atfawry.fawrystaging.com/',
  language: FawryLanguages.ENGLISH,
  allow3DPayment: true,
  skipReceipt: false,
  skipLogin: true,
  payWithCardToken: true,
  authCaptureMode: false,
  merchantInfo: {
    merchantCode: '+/IAAY2notgLsdUB9VeTFg==',
    merchantSecretCode: '69826c87-963d-47b7-8beb-869f7461fd93',
    merchantRefNum: uuid.v4().toString(),
  },
  customerInfo: {
    customerName: 'Ahmed Kamal',
    customerMobile: '+1234567890',
    customerEmail: 'ahmed.kamal@example.com',
    customerProfileId: '12345',
  },
};

export default function App() {
  useEffect(() => {
    FawryCallbacks.FawryEmitter.addListener(
      FawryCallbacks.EVENT_PAYMENT_COMPLETED,
      data => {
        console.log(FawryCallbacks.EVENT_PAYMENT_COMPLETED, data);
      },
    );
    FawryCallbacks.FawryEmitter.addListener(
      FawryCallbacks.EVENT_ON_SUCCESS,
      data => {
        console.log(FawryCallbacks.EVENT_ON_SUCCESS, data);
      },
    );
    FawryCallbacks.FawryEmitter.addListener(
      FawryCallbacks.EVENT_ON_FAIL,
      error => {
        console.log(FawryCallbacks.EVENT_ON_FAIL, error);
      },
    );
    FawryCallbacks.FawryEmitter.addListener(
      FawryCallbacks.EVENT_CardManager_FAIL,
      error => {
        console.log(FawryCallbacks.EVENT_CardManager_FAIL, error);
      },
    );
  }, []);

  const handlePayments = () => {
    const billItems: BillItems[] = [
      {
        itemId: 'item1',
        description: 'Item 1 Description',
        quantity: '1',
        price: '50',
      },
      {
        itemId: 'item2',
        description: 'Item 2 Description',
        quantity: '2',
        price: '25',
      },
      {
        itemId: 'item3',
        description: 'Item 3 Description',
        quantity: '3',
        price: '20',
      },
    ];

    pay(
      fawryConfig.baseUrl,
      fawryConfig.language,
      fawryConfig.merchantInfo,
      fawryConfig.customerInfo,
      billItems,
      fawryConfig.allow3DPayment,
      fawryConfig.skipReceipt,
      fawryConfig.skipLogin,
      fawryConfig.payWithCardToken,
      fawryConfig.authCaptureMode,
    );
  };

  const handleCardsManager = () => {
    openCardsManager(
      fawryConfig.baseUrl,
      fawryConfig.language,
      fawryConfig.merchantInfo,
      fawryConfig.customerInfo,
    );
  };

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <TouchableOpacity style={styles.button} onPress={handlePayments}>
        <Text style={styles.buttonText}>Checkout / Pay</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCardsManager}>
        <Text style={styles.buttonText}>Manage Cards</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
  },
  darkContainer: {
    backgroundColor: '#1A1A1A',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
