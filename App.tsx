import React, { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Platform } from 'react-native';
import * as Fawry from '@fawry_pay/rn-fawry-pay-sdk';
import uuid from 'react-native-uuid';

const cartItems: Fawry.BillItems[] = [
  {
    itemId: 'item1',
    description: 'Item 1 Description',
    quantity: '1',
    price: '300',
  },
  {
    itemId: 'item2',
    description: 'Item 2 Description',
    quantity: '1',
    price: '200',
  },
  {
    itemId: 'item3',
    description: 'Item 3 Description',
    quantity: '1',
    price: '500',
  },
];

const merchant: Fawry.MerchantInfo = {
  merchantCode:
  Platform.OS === 'android'
    ? '+/IAAY2notgLsdUB9VeTFg==' // Android 
    : '+/IAAY2nothN6tNlekupwA==', // IOS
merchantSecretCode:
  Platform.OS === 'android'
    ? '69826c87-963d-47b7-8beb-869f7461fd93' // Android
    : '4b815c12-891c-42ab-b8de-45bd6bd02c3d', // IOS
  merchantRefNum: uuid.v4().toString(),
};

const customer: Fawry.CustomerInfo = {
  customerName: 'Ahmed Kamal',
  customerMobile: '+1234567890',
  customerEmail: 'ahmed.kamal@example.com',
  customerProfileId: '12345',
};

const fawryConfig: Fawry.FawryLaunchModel = {
  baseUrl: 'https://atfawry.fawrystaging.com/',
  lang: Fawry.FawryLanguages.ENGLISH,
  signature: '',
  allow3DPayment: true,
  skipReceipt: false,
  skipLogin: true,
  payWithCardToken: true,
  authCaptureMode: false,
  allowVoucher: false,
  items: cartItems,
  merchantInfo: merchant,
  customerInfo: customer,
};

const eventListeners = [
  {
    eventName: Fawry.FawryCallbacks.FAWRY_EVENT_PAYMENT_COMPLETED,
    listener: (data: any) =>
      console.log(Fawry.FawryCallbacks.FAWRY_EVENT_PAYMENT_COMPLETED, data),
  },
  {
    eventName: Fawry.FawryCallbacks.FAWRY_EVENT_ON_SUCCESS,
    listener: (data: any) =>
      console.log(Fawry.FawryCallbacks.FAWRY_EVENT_ON_SUCCESS, data),
  },
  {
    eventName: Fawry.FawryCallbacks.FAWRY_EVENT_ON_FAIL,
    listener: (error: any) =>
      console.log(Fawry.FawryCallbacks.FAWRY_EVENT_ON_FAIL, error),
  },
  {
    eventName: Fawry.FawryCallbacks.FAWRY_EVENT_CardManager_FAIL,
    listener: (error: any) =>
      console.log(Fawry.FawryCallbacks.FAWRY_EVENT_CardManager_FAIL, error),
  },
];

const attachEventListeners = () =>
  eventListeners.forEach(({ eventName, listener }) =>
    Fawry.FawryCallbacks.FawryEmitter.addListener(eventName, listener),
  );

const detachEventListeners = () =>
  eventListeners.forEach(({ eventName }) =>
    Fawry.FawryCallbacks.FawryEmitter.removeAllListeners(eventName),
  );

const App = () => {
  useEffect(() => {
    attachEventListeners();

    return detachEventListeners;
  }, []);

  const handlePayments = () => {
    const updatedMerchant = { ...merchant, merchantRefNum: uuid.v4().toString() };
    Fawry.startPayment({
      ...fawryConfig,
      merchantInfo: updatedMerchant,
    });
  };

  const handleCardsManager = () =>
    Fawry.openCardsManager(
      fawryConfig.baseUrl,
      fawryConfig.lang,
      fawryConfig.merchantInfo,
      fawryConfig.customerInfo,
    );

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handlePayments}>
          <Text style={styles.buttonText}>Start Payment</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.button} onPress={handleCardsManager}>
          <Text style={styles.buttonText}>Manage Cards</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#016891',
      padding: 15,
      margin: 10,
      borderRadius: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
  });

export default App;