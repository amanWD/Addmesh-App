import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import Loading from '../../components/Loading';
import {AuthContext} from '../../context/AuthContext';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import {AccountStackParamList} from '../../types/NavigationType';
import colors from '../../styles/color';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {toastConfig} from './Login';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type VerifyOtpRouteProp = RouteProp<AccountStackParamList, 'VerifyOtp'>;

type NavigationProps = NativeStackNavigationProp<AccountStackParamList>;

export const VerifyOtp = () => {
  const route = useRoute<VerifyOtpRouteProp>();

  const {email} = route.params;

  const [otpInput, setOtpInput] = useState<string>('');

  const authContext = useContext(AuthContext);

  const [isVerificationLoading, setIsVerificationLoading] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);

  const {replace} = useNavigation<NavigationProps>();

  const handleVerfication = async () => {
    setIsVerificationLoading(true);

    const response = await authContext?.verifyOTP(otpInput);

    if (response?.status === 200) {
      replace('Login');
    }

    setIsVerificationLoading(false);
  };

  const handleResend = async () => {
    setIsResendLoading(true);

    const response = await authContext?.resendOTP(email);

    if (response.status === 200) {
      Toast.show({type: 'success', text1: 'Code was send throught your email'});
    } else {
      Toast.show({type: 'error', text1: 'Something went wrong'});
    }

    setIsResendLoading(false);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.title}>Enter 6-digit code</Text>
          <View>
            <OTPTextView
              tintColor={colors.purple}
              offTintColor={colors.black}
              handleTextChange={otp => setOtpInput(otp)}
              inputCount={6}
              inputCellLength={1}
              textInputStyle={{width: 40}}
            />
            <TouchableOpacity style={styles.resendBtn} onPress={handleResend}>
              {isResendLoading ? (
                <Loading color="purple" size={18} />
              ) : (
                <Text style={styles.resendBtnText}>Resend Code</Text>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.verifyBtn}
            onPress={handleVerfication}>
            {isVerificationLoading ? (
              <Loading color="pink" size={22} />
            ) : (
              <Text style={styles.verifyBtnText}>Verify</Text>
            )}
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      <Toast config={toastConfig} topOffset={70} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 100,
    flex: 1,
    backgroundColor: '#edcef5',
    display: 'flex',
    alignItems: 'center',
    gap: 48,
  },
  title: {
    color: '#4d1170',
    fontSize: 28,
    fontWeight: 'bold',
  },
  resendBtn: {
    display: 'flex',
    alignItems: 'center',
    width: 100,
    alignSelf: 'flex-end',
    paddingVertical: 20,
    borderRadius: 4,
  },
  resendBtnText: {
    fontSize: 16,
    color: 'purple',
  },
  verifyBtn: {
    backgroundColor: '#2e2e2e',
    display: 'flex',
    alignItems: 'center',
    width: 300,
    paddingVertical: 10,
    borderRadius: 4,
  },
  verifyBtnText: {
    fontSize: 16,
    color: 'pink',
  },
});
