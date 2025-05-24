import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  Button,
} from 'react-native';
import {AccountStackParamList} from '../../types/NavigationType';
import React, {useState, useContext} from 'react';
import Toast from 'react-native-toast-message';
import Loading from '../../components/Loading';
import {AuthContext} from '../../context/AuthContext';
import {toastConfig} from './Login';
import OTPTextView from 'react-native-otp-textinput';
import colors from '../../styles/color';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type ForgotPasswordRouteProp = RouteProp<
  AccountStackParamList,
  'ForgetPasswordConfirm'
>;

type NavigationProps = NativeStackNavigationProp<AccountStackParamList>;

export const ForgetPasswordConfirm = () => {
  const route = useRoute<ForgotPasswordRouteProp>();

  const {email} = route.params;

  const {replace, goBack} = useNavigation<NavigationProps>();

  const [formData, setFormData] = useState({
    email: email,
    otpInput: '',
    new_password: '',
    re_new_password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const authContext = useContext(AuthContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    console.log(formData);

    const response = await authContext?.resetPasswordConfirm(
      formData.email,
      formData.otpInput,
      formData.new_password,
      formData.re_new_password,
    );

    console.log(response.data.message);

    if (response?.status === 200) {
      replace('Login');
    } else if (response?.status === 400) {
    }

    setIsLoading(false);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.title}>Enter 6-digit code</Text>
          <View style={{display: 'flex', gap: 18, alignItems: 'center'}}>
            <OTPTextView
              tintColor={colors.purple}
              offTintColor={colors.black}
              handleTextChange={otp =>
                setFormData({...formData, otpInput: otp})
              }
              inputCount={6}
              inputCellLength={1}
              textInputStyle={{width: 40}}
            />
            <View style={styles.inputBox}>
              {/* <FontAwesome name="envelope-o" size={24} color="#742b9e" /> */}
              <TextInput
                value={formData.new_password}
                onChangeText={text =>
                  setFormData({...formData, new_password: text})
                }
                placeholder="New Password"
                placeholderTextColor={'#adadad'}
                style={{fontSize: 18, width: '90%'}}
                autoCapitalize="none"
                secureTextEntry
              />
            </View>
            <View style={styles.inputBox}>
              {/* <FontAwesome name="envelope-o" size={24} color="#742b9e" /> */}
              <TextInput
                value={formData.re_new_password}
                onChangeText={text =>
                  setFormData({...formData, re_new_password: text})
                }
                placeholder="Retype New Password"
                placeholderTextColor={'#adadad'}
                style={{fontSize: 18, width: '90%'}}
                autoCapitalize="none"
                secureTextEntry
              />
            </View>
          </View>
          <TouchableOpacity style={styles.sendCodeBtn} onPress={handleSubmit}>
            {isLoading ? (
              <Loading size={12} color="black" />
            ) : (
              <Text style={styles.resetBtnText}>Reset Password</Text>
            )}
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      <Toast topOffset={70} config={toastConfig} />
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
  inputBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    color: 'white',
    width: '80%',
    height: 45,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    padding: 10,
  },
  sendCodeBtn: {
    backgroundColor: '#2e2e2e',
    display: 'flex',
    alignItems: 'center',
    width: 300,
    paddingVertical: 10,
    borderRadius: 4,
  },
  resetBtnText: {
    fontSize: 16,
    color: 'pink',
  },
});
