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


#### How it works
![Fawrypay SDK Explained](https://raw.githubusercontent.com/FawryPay/Android-Fawrypay-Anonymous-sample/master/Docs/4.jpg)

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

In your React Native project, import the necessary components and configure the FawryPay SDK with your items, merchant and customer information:

```javascript
import React, { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Platform } from 'react-native';
import * as Fawry from '@fawry_pay/rn-fawry-pay-sdk';
import uuid from 'react-native-uuid';

const cartItems : Fawry.BillItems[] = [
  { itemId: 'item1', description: 'Item 1 Description', quantity: '10', price: '30' },
  { itemId: 'item2', description: 'Item 2 Description', quantity: '5', price: '20' },
  { itemId: 'item3', description: 'Item 3 Description', quantity: '1', price: '10' },
];

const merchant : Fawry.MerchantInfo = {
  merchantCode: 'YOUR MERCHANT CODE',
  merchantSecretCode: 'YOUR SECRET CODE',
  merchantRefNum: uuid.v4().toString(),
};

const customer : Fawry.CustomerInfo = {
  customerName: 'Ahmed Kamal',
  customerMobile: '+1234567890',
  customerEmail: 'ahmed.kamal@example.com',
  customerProfileId: '12345',
};

const fawryConfig : Fawry.FawryLaunchModel = {
  baseUrl: 'https://atfawry.fawrystaging.com/',
  lang: Fawry.FawryLanguages.ENGLISH,
  signature: '',
  allow3DPayment: false,
  skipReceipt: false,
  skipLogin: true,
  payWithCardToken: true,
  authCaptureMode: false,
  allowVoucher: true,
  items: cartItems,
  merchantInfo: merchant,
  customerInfo: customer,
};
// Continue with the code...
```

### Step 3: Present Payment Options

To initiate the payment process, use the `startPayment` function to open the payment flow.

```javascript
// Launch the payment flow
Fawry.startPayment(fawryConfig);
```

### Step 4: Present Card Manager (Optional)

If you want to allow your users to manage their saved cards, you can use the `openCardsManager` function:

```javascript
// Open the card manager flow
Fawry.openCardsManager(
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
  { eventName: Fawry.FawryCallbacks.FAWRY_EVENT_PAYMENT_COMPLETED, listener: (data: any) => console.log(Fawry.FawryCallbacks.FAWRY_EVENT_PAYMENT_COMPLETED, data) },
  { eventName: Fawry.FawryCallbacks.FAWRY_EVENT_ON_SUCCESS, listener: (data: any) => console.log(Fawry.FawryCallbacks.FAWRY_EVENT_ON_SUCCESS, data) },
  { eventName: Fawry.FawryCallbacks.FAWRY_EVENT_ON_FAIL, listener: (error: any) => console.log(Fawry.FawryCallbacks.FAWRY_EVENT_ON_FAIL, error) },
  { eventName: Fawry.FawryCallbacks.FAWRY_EVENT_CardManager_FAIL, listener: (error: any) => console.log(Fawry.FawryCallbacks.FAWRY_EVENT_CardManager_FAIL, error) },
];

// Attach event listeners
const attachEventListeners = () => eventListeners.forEach(({ eventName, listener }) => Fawry.FawryCallbacks.FawryEmitter.addListener(eventName, listener));


// Detach event listeners when the component unmounts
const detachEventListeners = () => eventListeners.forEach(({ eventName }) => Fawry.FawryCallbacks.FawryEmitter.removeAllListeners(eventName));


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

**Note for Xcode 15 Users:**

If you are using Xcode 15, it's important to follow these additional steps for proper integration:


```ruby
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'
      xcconfig_path = config.base_configuration_reference.real_path
      xcconfig = File.read(xcconfig_path)
      xcconfig_mod = xcconfig.gsub(/DT_TOOLCHAIN_DIR/, "TOOLCHAIN_DIR")
      File.open(xcconfig_path, "w") { |file| file << xcconfig_mod }
    end
  end
  react_native_post_install(
    installer,
    config[:reactNativePath],
    :mac_catalyst_enabled => false
  )
  __apply_Xcode_12_5_M1_post_install_workaround(installer)
end
```

After adding this code snippet, remember to run `pod update` in your iOS directory to ensure that the changes are properly applied.

---

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

### Fawry Launch Model Parameters

| Parameter            | Description                                          |
|----------------------|------------------------------------------------------|
| `allow3DPayment`     | Enable 3D Secure / OTP payment.                      |
| `allowVoucher`       | True if your account supports voucher codes.         |
| `authCaptureMode`    | Depends on refund configuration.                     |
| `customerInfo`       | Customer information of type `CustomerInfo`.         |
| `items`              | Sorted array of type `BillItems`.                    |
| `merchantInfo`       | Merchant information of type `MerchantInfo`.         |
| `payWithCardToken`   | Enable payment by saved cards.                       |
| `signature`          | Generated by you (could be an empty string).         |
| `skipLogin`          | Skip email and mobile login screen.                  |
| `skipReceipt`        | Skip the receipt screen.                             |


#### `baseURL`

| Environment | Value                                 |
|-------------|---------------------------------------|
| Production  | `https://atfawry.com/`                |
| Staging     | `https://atfawry.fawrystaging.com/`   |


#### `Lang`

| Language | Value                            |
|----------|----------------------------------|
| Arabic   | `FawryLanguages.ARABIC`          |
| English  | `FawryLanguages.ENGLISH`         |

### Bill Item Parameters:

| Parameter    | Required | Description                                 |
|--------------|----------|---------------------------------------------|
| `Description`| Optional | Description of the item.                    |
| `Price`      | Mandatory| The price of the item.                      |
| `Quantity`   | Mandatory| The quantity of the item.                   |
| `itemId`     | Mandatory| Unique identifier for the item.             |

### Customer Model Parameters:

| Parameter            | Required | Description                                        |
|----------------------|----------|----------------------------------------------------|
| `customerEmail`      | Optional | Used for receipt emails.                           |
| `customerMobile`     | Optional | Used for SMS notifications.                        |
| `customerName`       | Optional | Customer's name.                                   |
| `customerProfileId`  | Mandatory| For payments with saved cards.                     |

### Merchant Model Parameters:

| Parameter             | Required | Description                            |
|-----------------------|----------|----------------------------------------|
| `merchantCode`        | Mandatory| Provided by Fawry support.             |
| `merchantRefNum`      | Mandatory| Random 10 alphanumeric digits.         |
| `merchantSecretCode`  | Mandatory| Provided by Fawry support.             |


## Sample Project

For a hands-on demonstration of Fawry SDK integration in a React Native app, explore our GitHub sample project:

[**React Native Fawrypay Anonymous Sample**](https://github.com/FawryPay/ReactNative-Fawrypay-Anonymous-sample)

Feel free to explore the sample project and leverage the guide to effortlessly integrate the Fawry SDK into your React Native application.