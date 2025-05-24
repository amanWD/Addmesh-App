import React, {useContext, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Loading from '../../components/Loading';
import {AuthContext} from '../../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AccountStackParamList} from '../../types/NavigationType';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import colors from '../../styles/color';
import PhoneInput from 'react-native-phone-number-input';

const Phone = PhoneInput as unknown as React.FC<any>;

type NavigationProps = NativeStackNavigationProp<AccountStackParamList>;

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: colors.tertiory,
        zIndex: 110,
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 15,
        fontWeight: 'bold',
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: colors.purple,
        backgroundColor: colors.gray,
        zIndex: 110,
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 15,
        fontWeight: 'bold',
      }}
      text2Style={{
        fontSize: 13,
        color: 'red',
      }}
    />
  ),
};

export const Login = () => {
  const [formData, setFormData] = useState({
    email_or_phone: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const [loginWithEmail, setLoginWithEmail] = useState(true);

  const phoneInput = useRef<PhoneInput>(null);

  const authContext = useContext(AuthContext);

  const {replace, goBack} = useNavigation<NavigationProps>();

  const handleLogin = async () => {
    if (formData.email_or_phone === '' || formData.password === '') return;

    Keyboard.dismiss();
    setIsLoading(true);

    const response = await authContext?.login(
      formData.email_or_phone,
      formData.password,
    );

    console.log('status: ', response?.status);

    if (response?.status === 200) {
      goBack();
      Toast.show({type: 'success', text1: 'Successfully logged in!'});
    } else if (response?.status === 401) {
      Toast.show({type: 'error', text1: 'Wrong credintials!'});
    } else if (response?.status === undefined) {
      Toast.show({type: 'error', text1: 'Check your network connection!'});
    }

    setIsLoading(false);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.title}>Login To Addmesh</Text>
          <View style={{display: 'flex', gap: 18}}>
            <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              onPress={() => setLoginWithEmail(prev => !prev)}>
              {loginWithEmail ? (
                <Text style={{color: colors.purple}}>
                  Login via phone number
                </Text>
              ) : (
                <Text style={{color: colors.purple}}>Login via email</Text>
              )}
            </TouchableOpacity>
            {loginWithEmail ? (
              <View style={styles.inputBox}>
                {/* <AntDesign name="user" size={24} color="#742b9e" /> */}
                <TextInput
                  value={formData.email_or_phone}
                  onChangeText={text =>
                    setFormData({...formData, email_or_phone: text})
                  }
                  placeholder="Email"
                  placeholderTextColor={'#adadad'}
                  style={{fontSize: 18, width: '90%'}}
                  autoCapitalize="none"
                />
              </View>
            ) : (
              <View style={{height: 50}}>
                <Phone
                  ref={phoneInput}
                  defaultValue={formData.email_or_phone}
                  defaultCode="ET"
                  layout="second"
                  onChangeText={(text: any) => {
                    setFormData({...formData, email_or_phone: text});
                  }}
                  onChangeFormattedText={(text: any) => {
                    setFormData({...formData, email_or_phone: text});
                  }}
                  containerStyle={{
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: colors.black,
                    backgroundColor: 'transparent',
                    width: '100%',
                  }}
                  textContainerStyle={{
                    backgroundColor: 'transparent',
                  }}
                  withDarkTheme
                  autoFocus
                />
                {/* <AntDesign name="user" size={24} color="#742b9e" /> */}
              </View>
            )}
            <View style={styles.inputBox}>
              {/* <AntDesign name="lock" size={25} color="#742b9e" /> */}
              <TextInput
                secureTextEntry
                value={formData.password}
                onChangeText={text =>
                  setFormData({...formData, password: text})
                }
                textContentType="password"
                placeholder="Password"
                placeholderTextColor={'#adadad'}
                style={{fontSize: 18, width: '90%'}}
              />
            </View>
            <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              onPress={() => replace('ForgetPassword')}>
              <Text>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            {isLoading ? (
              <Loading color="pink" size={22} />
            ) : (
              <Text style={styles.loginBtnText}>Log in</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'row',
              bottom: 60,
            }}
            onPress={() => replace('Register')}>
            <Text>Don't have an account?</Text>
            <Text style={{color: colors.purple}}> Sign Up</Text>
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
    color: colors.primary,
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
    borderColor: colors.black,
    padding: 10,
  },
  loginBtn: {
    backgroundColor: colors.black,
    display: 'flex',
    alignItems: 'center',
    width: 300,
    paddingVertical: 10,
    borderRadius: 4,
  },
  loginBtnText: {
    fontSize: 16,
    color: 'pink',
  },
});
