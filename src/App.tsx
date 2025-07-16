// App.tsx
import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Platform } from 'react-native';
import uuid from 'react-native-uuid';
import {
  startPayment,
  openCardsManager,
  addFawryListener,
  FawryEvents,
} from '@fawry_pay/rn-fawry-pay-sdk/src/index';
import {
  type BillItems,
  type MerchantInfo,
  type CustomerInfo,
  type FawryLaunchModel,
} from '@fawry_pay/rn-fawry-pay-sdk/src/types';

const cartItems: BillItems[] = [
  { itemId: 'item1', description: 'Item 1 Description', quantity: '1', price: '300' },
  { itemId: 'item2', description: 'Item 2 Description', quantity: '1', price: '200' },
  { itemId: 'item3', description: 'Item 3 Description', quantity: '1', price: '500' },
];

const merchant: MerchantInfo = {
  merchantCode: Platform.OS === 'android'
    ? '+/IAAY2notgLsdUB9VeTFg=='
    : '+/IAAY2nothN6tNlekupwA==',
  merchantSecretCode: Platform.OS === 'android'
    ? '69826c87-963d-47b7-8beb-869f7461fd93'
    : '4b815c12-891c-42ab-b8de-45bd6bd02c3d',
  merchantRefNum: uuid.v4().toString(),
};

const customer: CustomerInfo = {
  customerName: 'Ahmed Kamal',
  customerMobile: '+1234567890',
  customerEmail: 'ahmed.kamal@example.com',
  customerProfileId: '12345',
};

const fawryConfig: FawryLaunchModel = {
  baseUrl: 'https://atfawry.fawrystaging.com/',
  lang: 'ARABIC',
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

const App = () => {
  const removeListenerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    removeListenerRef.current = addFawryListener((eventName, payload) => {
      try {

        const parsed = isValidJson(payload) ? JSON.parse(payload) : payload;
        switch(eventName){
          case FawryEvents.EVENT_PAYMENT_COMPLETED:
            break;
          case FawryEvents.EVENT_ON_SUCCESS:
            break;
          case FawryEvents.EVENT_ON_FAIL:
            break;
          case FawryEvents.EVENT_CardManager_FAIL:
            break;
          default:
        }

        console.log(`[FAWRY][React] ${eventName}:`, parsed);
      } catch (e) {
        console.error(`[FAWRY][React] ${eventName}:`, e);
        console.warn(`[FAWRY][React] ${eventName}:`, payload);
      }
    });

    return () => {
      removeListenerRef.current?.();
    };
  }, []);

  function isValidJson(payload: string): boolean {
      try {
        JSON.parse(payload);
        return true;
      } catch (e) {
        return false;
      }
    }


  const handlePayments = () => {
    const updatedMerchant = { ...merchant, merchantRefNum: uuid.v4().toString() };
    startPayment({ ...fawryConfig, merchantInfo: updatedMerchant });
  };

  const handleCardsManager = () => {
    openCardsManager(
      fawryConfig.baseUrl,
      fawryConfig.lang,
      fawryConfig.merchantInfo,
      fawryConfig.customerInfo
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePayments}>
        <Text style={styles.buttonText}>Start Payment</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCardsManager}>
        <Text style={styles.buttonText}>Manage Cards</Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 20 }}>Example Nitro integration</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: {
    backgroundColor: '#016891',
    padding: 15,
    margin: 10,
    borderRadius: 20,
  },
  buttonText: { color: '#fff', fontSize: 18 },
});

export default App;
