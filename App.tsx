import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {
  pay,
  MerchantInfo,
  CustomerInfo,
  FawryCallbacks,
  FawryLanguages,
  openCardsManager,
  BillItems,
} from '@fawry_pay/rn-fawry-pay-sdk';
import uuid from 'react-native-uuid';

interface FawryConfig {
  baseUrl: string,
  language: FawryLanguages,
  signature: string

  merchantInfo: MerchantInfo,
  customerInfo: CustomerInfo,
  allow3DPayment: Boolean,
  skipReceipt: Boolean,
  skipLogin: Boolean,
  payWithCardToken: Boolean,
  authCaptureMode: Boolean,
  allowVoucher: Boolean,
}

const fawryConfig: FawryConfig = {
  baseUrl: 'https://atfawry.fawrystaging.com/',
  language: FawryLanguages.ENGLISH,
  signature: '',
  allow3DPayment: true,
  skipReceipt: false,
  skipLogin: true,
  payWithCardToken: true,
  authCaptureMode: false,
  allowVoucher: true,
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

const eventListeners = [
  {
    eventName: FawryCallbacks.FAWRY_EVENT_PAYMENT_COMPLETED,
    listener: (data: any) => {
      console.log(FawryCallbacks.FAWRY_EVENT_PAYMENT_COMPLETED, data);
    },
  },
  {
    eventName: FawryCallbacks.FAWRY_EVENT_ON_SUCCESS,
    listener: (data: any) => {
      console.log(FawryCallbacks.FAWRY_EVENT_ON_SUCCESS, data);
    },
  },
  {
    eventName: FawryCallbacks.FAWRY_EVENT_ON_FAIL,
    listener: (error: any) => {
      console.log(FawryCallbacks.FAWRY_EVENT_ON_FAIL, error);
    },
  },
  {
    eventName: FawryCallbacks.FAWRY_EVENT_CardManager_FAIL,
    listener: (error: any) => {
      console.log(FawryCallbacks.FAWRY_EVENT_CardManager_FAIL, error);
    },
  },
];

const attachEventListeners = () => {
  eventListeners.forEach(eventListener => {
    const { eventName, listener } = eventListener;
    FawryCallbacks.FawryEmitter.addListener(eventName, listener);
  });
};

const detachEventListeners = () => {
  eventListeners.forEach(eventListener => {
    const { eventName, listener } = eventListener;
    FawryCallbacks.FawryEmitter.removeAllListeners(eventName);
  });
};

export default function App() {
  useEffect(() => {
    attachEventListeners();

    return detachEventListeners;
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
      fawryConfig.allowVoucher,
      fawryConfig.signature
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

  return (
    <View style={styles.container}>
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
