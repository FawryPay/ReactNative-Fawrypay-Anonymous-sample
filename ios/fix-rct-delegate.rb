# Custom pod modification for React-RCTAppDelegate
module ReactNativePods
  class PodspecModifier
    def modify_react_rct_app_delegate(spec)
      spec.pod_target_xcconfig = spec.pod_target_xcconfig || {}
      
      # Add required build settings
      spec.pod_target_xcconfig['GCC_PREPROCESSOR_DEFINITIONS'] = ['$(inherited)', 
                                                                 'RCT_EXTERN_MODULE=RCT_EXTERN',
                                                                 '_LIBCPP_ENABLE_CXX17_REMOVED_FEATURES=1']
      spec.pod_target_xcconfig['OTHER_CFLAGS'] = '$(inherited) -Wno-error -Wno-nullability-completeness -Wno-error=implicit-function-declaration'
      spec.pod_target_xcconfig['APPLICATION_EXTENSION_API_ONLY'] = 'NO'
      
      # Fix framework linkage issues
      spec.compiler_flags = '-fno-objc-msgsend-selector-stubs'
      
      # For static linking
      if ENV['RCT_NEW_ARCH_ENABLED'] == '1'
        spec.dependency 'React-RCTRuntime'
        spec.dependency 'React-NativeModulesApple'
        spec.dependency 'ReactCommon'
      end
    end
  end
end