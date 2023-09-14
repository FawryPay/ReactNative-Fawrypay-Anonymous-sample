# FawryPay React Native SDK Sample Guide

Welcome to the FawryPay React Native SDK Sample Guide. This comprehensive guide will walk you through every step of integrating the FawryPay SDK into your React Native application, allowing for seamless payment methods and card management.

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Getting Started](#getting-started)
  - [Step 1: Create a FawryPay Account](#step-1-create-a-fawrypay-account)
  - [Step 2: Initialize the SDK](#step-2-initialize-the-sdk)
  - [Step 3: Present Payment Options](#step-3-present-payment-options)
  - [Step 4: Present Card Manager (Optional)](#step-4-present-card-manager-optional)
  - [Step 5: Callbacks (Optional)](#step-5-callbacks-optional)
- [Platform-specific Notes](#platform-specific-notes)
  - [Android](#android)
  - [iOS](#ios)
- [Customizing UI Colors](#customizing-ui-colors)
- [Parameters Explained](#parameters-explained)
- [Sample Project](#sample-project)

## Introduction

The FawryPay React Native SDK provides seamless integration for processing payments and managing cards within your React Native application. This guide will walk you through the steps needed to integrate the SDK into your project.

**Note**: Currently, the FawryPay React Native SDK does not support EXPO projects. Please use Vanilla React Native for integration.
## Installation

To get started with the FawryPay SDK, follow these installation steps:

### Step 1: Install the FawryPay SDK

To install the FawryPay SDK, use npm:

```bash
npm install @fawry_pay/rn-fawry-pay-sdk --save
```

For React Native versions prior to 0.60, link the package using `react-native link`:

```bash
react-native link @fawry_pay/rn-fawry-pay-sdk
```

For React Native versions 0.60 and above, autolinking will handle linking.

## Getting Started

### Step 1: Create a FawryPay Account

Before utilizing the FawryPay SDK, you must have a FawryPay account. Visit the FawryPay website to create an account if you don't already have one.

### Step 2: Initialize the SDK

In your React Native project, import the necessary components and configure the FawryPay SDK with your merchant and customer information:

```javascript
import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
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
  signature: '',
  allow3DPayment: true,
  skipReceipt: false,
  skipLogin: true,
  payWithCardToken: true,
  authCaptureMode: false,
  allowVoucher: true,
  merchantInfo: {
    merchantCode: 'YOUR MERCHANT CODE',
    merchantSecretCode: 'YOUR SECRET CODE',
    merchantRefNum: uuid.v4().toString(),
  },
  customerInfo: {
    customerName: 'Ahmed Kamal',
    customerMobile: '+1234567890',
    customerEmail: 'ahmed.kamal@example.com',
    customerProfileId: '12345',
  },
};

// Continue with the code...
```

### Step 3: Present Payment Options

To initiate the payment process, use the `pay` function to open the payment flow. Define your bill items and call the `pay` function with the necessary parameters:

```javascript
// Set up the bill items to be paid
const billItems: BillItems[] = [
  {
    itemId: 'ITEM_ID_1',
    description: 'ITEM_DESCRIPTION',
    quantity: 'ITEM_QUANTITY',
    price: 'ITEM_PRICE',
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
  fawryConfig.authCaptureMode
);
```

### Step 4: Present Card Manager (Optional)

If you want to allow your users to manage their saved cards, you can use the `openCardsManager` function:

```javascript
// Open the card manager flow
openCardsManager(
  fawryConfig.baseUrl,
  fawryConfig.language,
  fawryConfig.merchantInfo,
  fawryConfig.customerInfo
);
```

### Step 5: Callbacks (Optional)

The FawryPay SDK provides event listeners that you can use to receive payment and card manager status. Here's how to set up event listeners:

```javascript
// Define event listeners for payment and card manager events
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

// Attach event listeners
const attachEventListeners = () => {
  eventListeners.forEach(eventListener => {
    const { eventName, listener } = eventListener;
    FawryCallbacks.FawryEmitter.addListener(eventName, listener);
  });
};

// Detach event listeners when the component unmounts
const detachEventListeners = () => {
  eventListeners.forEach(eventListener => {
    const { eventName } = eventListener;
    FawryCallbacks.FawryEmitter.removeAllListeners(eventName);
  });
};

useEffect(() => {
  attachEventListeners();

  // Clean up event listeners when the component unmounts
  return detachEventListeners;
}, []);
```

## Platform-specific Notes

### Android

For Android integration, follow these additional steps:

1. Open the `build.gradle` file located in the root of your Android project (named `android/build.gradle`).

2. Find the `buildscript` block and add the following code in it:

   ```gradle
   allprojects {
       repositories {
         google()
         mavenCentral()
         maven { url "https://nexus.mobile.fawry.io/repository/maven-releases/" }
         maven { url "https://maven.google.com" }
         jcenter()
       }
     }
   ```

These changes enable your Android project to resolve dependencies from the specified repositories, facilitating the installation and usage of the `@fawry_pay/rn-fawry-pay-sdk` package in your React Native application.

### iOS

For iOS integration, ensure that you follow these steps:

1. Open the `Podfile` file located in the root of your iOS project.

2. Delete the following code block:

   ```ruby
   flipper_config = ENV['NO_FLIPPER'] == "1" ? FlipperConfiguration.disabled : FlipperConfiguration.enabled
   
   linkage = ENV['USE_FRAMEWORKS']
   if linkage != nil
     Pod::UI.puts "Configuring Pod with #{linkage}ally linked Frameworks".green
     use_frameworks! :linkage => linkage.to_sym
   end
   ```

3. Replace the removed code with:

   ```ruby
   use_frameworks!
   ```

4. Disable Hermes Engine by changing:

   ```ruby
   :hermes_enabled => flags[:hermes_enabled],
   ```

   to:

   ```ruby
   :hermes_enabled => false,
   ```

5. Disable Flipper by changing:

   ```ruby
   :flipper_configuration => flipper_config,
   ```

   to:

   ```ruby
   :flipper_configuration => FlipperConfiguration.disabled,
   ```
6. In your iOS directory , run the command `pod install`

These changes enable your iOS project to integrate the latest podfile without issues, facilitating the installation and usage of the `@fawry_pay/rn-fawry-pay-sdk` package in your React Native application.

**Important Reminder:** If you're conducting tests on an Apple Silicon Mac, make sure that you're using the iPhone simulator with Rosetta. To do this, follow these steps: Open Xcode, go to `Product > Destination > Destination Architectures > Show Rosetta Destination`, and then select a Rosetta iPhone Simulator for running the application.
## Customizing UI Colors

### Android

To customize UI colors for Android:

1. Navigate to `android > app > src > main > res > values`.

2. Create a new file named `colors.xml`.

3. Add color values to `colors.xml`:

   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <resources>
       <color name="fawry_blue">#6F61C0</color>
       <color name="fawry_yellow">#A084E8</color>
   </resources>
   ```

### iOS

For iOS UI color customization:

1. In your project, navigate to `ios > YourAppNampe`.

2. Create a new file named `Style.plist`.

3. Add color values to `Style.plist`:

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
   <dict>
    <key>primaryColorHex</key>
    <string>#6F61C0</string> <!-- Set your primary color hex code -->
    <key>secondaryColorHex</key>
    <string>#A084E8</string> <!-- Set your secondary color hex code -->
    <key>tertiaryColorHex</key>
    <string>#8BE8E5</string> <!-- Set your tertiary color hex code -->
    <key>headerColorHex</key>
    <string>#6F61C0</string> <!-- Set your header color hex code -->
   </dict>
   </plist>
   ```

   Then, add the `Style.plist` file to your Xcode project.

## Parameters Explained

The `FawryLaunchModel` is a crucial part of initializing the Fawry SDK. It includes both mandatory and optional parameters needed for the payment process.

### Customer Model Parameters:

- `customerName` (optional)
- `customerEmail` (optional - used for receipt emails)
- `customerMobile` (optional - used for SMS notifications)
- `customerProfileId` (mandatory for payments with saved cards)

### Bill Item Parameters:

- `Price` (mandatory)
- `Quantity` (mandatory)
- `itemId` (mandatory)
- `Description` (optional)

### Merchant Model Parameters:

- `merchantCode` (provided by Fawry support)
- `merchantRefNum` (random 10 alphanumeric digits)
- `merchantSecretCode` (provided by Fawry support)

### Other Parameters:

- `allow3DPayment` (enable 3D Secure / OTP payment)
- `signature` (generated by you)
- `skipLogin` (skip email and mobile login screen)
- `skipReceipt` (skip receipt screen)
- `payWithCardToken` (enable card tokenization; requires `customerProfileId`)
- `authCaptureMode` (depends on refund configuration)
- `allowVoucher` (true if your account supports voucher codes)

## Sample Project

For a hands-on demonstration of Fawry SDK integration in a React Native app, explore our GitHub sample project:

[**React Native Fawrypay Anonymous Sample**](https://github.com/FawryPay/ReactNative-Fawrypay-Anonymous-sample)

Feel free to explore the sample project and leverage the guide to effortlessly integrate the Fawry SDK into your React Native application.