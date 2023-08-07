# FawryPay React Native SDK Sample

FawryPay React Native SDK allows developers to easily integrate popular payment methods into their React Native applications. This package provides a seamless experience for both Android and iOS platforms, making it effortless to accept payments and manage cards within your app.

**IMPORTANT: The iOS integration is currently not available in this version. It will be added in a future update.**

## Installation

Use npm to install the package:

```bash
npm install @fawry_pay/rn-fawry-pay-sdk --save
```

### Linking (for React Native < 0.60)

For React Native versions prior to 0.60, you need to link the package using `react-native link`:

```bash
react-native link @fawry_pay/rn-fawry-pay-sdk
```

### Linking (for React Native >= 0.60)

For React Native versions 0.60 and above, autolinking will take care of the linking process.

## Getting Started

To get started with the FawryPay SDK, follow these steps:

### Step 1: Create a FawryPay Account

Before using the FawryPay SDK, you need to have a FawryPay account. If you don't have one, you can create an account on the FawryPay website.

### Step 2: Initialize the SDK

In your React Native project, import the necessary components from the FawryPay SDK and set up your merchant and customer information:

```javascript
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

// Configure FawryPay settings
const fawryConfig = {
  baseUrl: 'https://atfawry.fawrystaging.com/',
  language: FawryLanguages.ENGLISH,
  allow3DPayment: true,
  skipReceipt: false,
  skipLogin: true,
  payWithCardToken: true,
  authCaptureMode: false,
  merchantInfo: {
    merchantCode: 'YOUR_MERCHANT_CODE', // Replace with your FawryPay merchant code
    merchantSecretCode: 'YOUR_MERCHANT_SECRET_CODE', // Replace with your FawryPay merchant secret code
    merchantRefNum: uuid.v4().toString(), // Generate a unique reference number for each transaction
  },
  customerInfo: {
    customerName: 'CUSTOMER_NAME', // Replace with the customer's name
    customerMobile: 'CUSTOMER_MOBILE', // Replace with the customer's mobile number
    customerEmail: 'CUSTOMER_EMAIL', // Replace with the customer's email address
    customerProfileId: 'CUSTOMER_PROFILE_ID', // Replace with the customer's profile ID
  },
};

// ... (rest of the code)
```

### Step 3: Present Payment Options

To initiate the payment process, use the `pay` function to open the payment flow:

```javascript
// ... (rest of the code)

const handlePayments = () => {
  // Set up the bill items to be paid
  const billItems: BillItems[] = [
    {
      itemId: 'ITEM_ID_1', // Replace with a unique item ID
      description: 'ITEM_DESCRIPTION', // Replace with the item description
      quantity: 'ITEM_QUANTITY', // Replace with the item quantity
      price: 'ITEM_PRICE', // Replace with the item price
    },
    // Add more items as needed
  ];

  // Launch the payment flow
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

// ... (rest of the code)
```

### Step 4: Present Card Manager (Optional)

If you want to allow your users to manage their saved cards, you can use the `openCardsManager` function:

```javascript
// ... (rest of the code)

const handleCardsManager = () => {
  // Open the card manager flow
  openCardsManager(
    fawryConfig.baseUrl,
    fawryConfig.language,
    fawryConfig.merchantInfo,
    fawryConfig.customerInfo,
  );
};

// ... (rest of the code)
```

### Step 5: Callbacks (Optional)

The FawryPay SDK provides event listeners that you can use to receive payment and card manager status:

```javascript
// ... (rest of the code)

React.useEffect(() => {
  // Set up event listeners for payment and card manager status
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

// ... (rest of the code)
```

## Platform-specific Notes

### Android

**Step 1: Update Gradle Version**

1. Open the `gradle-wrapper.properties` file located in the `android/gradle/wrapper` directory of your project.

2. Look for the `distributionUrl` property and change its value to match this Gradle version:

```
distributionUrl=https\://services.gradle.org/distributions/gradle-7.5.1-all.zip
```

**Step 2: Modify `build.gradle` in Project Root**

1. Open the `build.gradle` file located in the root of your Android project (named `android/build.gradle`).

2. Locate the `repositories` block and add the required repositories to it. Your `build.gradle` should look like this:

```gradle
repositories {
    google()
    mavenCentral()
    maven { url "https://nexus.mobile.fawry.io/repository/maven-releases/" }
    maven { url "https://maven.google.com" }
    jcenter()
}
```

**Step 3: Modify `build.gradle` in App Module**

1. Now, open the `build.gradle` file for your app module (named `android/app/build.gradle`).

2. Ensure that the `repositories` block is also present in this file with the same content as the project root `build.gradle`.

```gradle
repositories {
    google()
    mavenCentral()
    maven { url "https://nexus.mobile.fawry.io/repository/maven-releases/" }
    maven { url "https://maven.google.com" }
    jcenter()
}
```

**Step 4: Save Changes**

Save the changes to both `build.gradle` files.

With these changes, your Android project will be able to resolve dependencies from the specified repositories. You can now proceed with the installation and usage of the `@fawry_pay/rn-fawry-pay-sdk` package in your React Native application.

### iOS

**IMPORTANT: The iOS integration is currently not available in this version. It will be added in a future update.**

### React Native Version

Please note that using the Expo framework to create your React Native project is not recommended for integrating the FawryPay React Native SDK. The Expo framework imposes certain restrictions and may not be compatible with the native modules used by the SDK. Therefore, it is advised to create a regular React Native project without using Expo.

To create a React Native project without Expo, you can use the React Native CLI by running the following command:

```bash
npx react-native init YourProjectName
```

Replace `YourProjectName` with the desired name for your project.

By following this approach, you can ensure a smooth integration with the FawryPay SDK and leverage its full functionality within your React Native application. If you encounter any issues during the integration process, please refer to the provided documentation or reach out to the FawryPay support team for assistance.

---

Please replace 'YOUR_MERCHANT_CODE', 'YOUR_MERCHANT_SECRET_CODE', 'CUSTOMER_NAME', 'CUSTOMER_MOBILE', 'CUSTOMER_EMAIL', 'CUSTOMER_PROFILE_ID', 'ITEM_ID_1', 'ITEM_DESCRIPTION', 'ITEM_QUANTITY', and 'ITEM_PRICE' with the actual values you have for your FawryPay account, the customer's details, and the item information in your React Native application.

With these steps, you can now integrate FawryPay into your React Native app and enable seamless payments and card management. If you have any further questions or need assistance, feel free to reach out!
