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
import {RegisterUserType} from '../../types/AuthType';

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

export const Register = () => {
  const [formData, setFormData] = useState<RegisterUserType>({
    name: '',
    email: '',
    phone_number: '',
    password: '',
    re_password: '',
    is_admin: 'False',
    preferred_contact: 'email',
  });

  const [isLoading, setIsLoading] = useState(false);

  const phoneInput = useRef<PhoneInput>(null);

  const authContext = useContext(AuthContext);

  const {replace, navigate} = useNavigation<NavigationProps>();

  const handleRegister = async () => {
    setIsLoading(true);

    const response = await authContext?.register(formData);

    if (response?.status === 201) {
      replace('VerifyOtp', {email: formData.email});
    } else {
      Toast.show({type: 'error', text1: response.message});
    }

    setIsLoading(false);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome To Addmesh</Text>
          <View style={{display: 'flex', gap: 18}}>
            <View style={styles.inputBox}>
              {/* <AntDesign name="user" size={24} color="#742b9e" /> */}
              <TextInput
                value={formData.name}
                onChangeText={text => setFormData({...formData, name: text})}
                placeholder="Full Name"
                placeholderTextColor={'#adadad'}
                style={{fontSize: 18, width: '90%'}}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputBox}>
              {/* <AntDesign name="user" size={24} color="#742b9e" /> */}
              <TextInput
                value={formData.email}
                onChangeText={text => setFormData({...formData, email: text})}
                placeholder="Email"
                textContentType="emailAddress"
                placeholderTextColor={'#adadad'}
                style={{fontSize: 18, width: '90%'}}
                autoCapitalize="none"
              />
            </View>
            <View style={{height: 50}}>
              <Phone
                ref={phoneInput}
                defaultValue={formData.email}
                defaultCode="ET"
                layout="second"
                onChangeText={(text: any) => {
                  setFormData({...formData, phone_number: text});
                }}
                onChangeFormattedText={(text: any) => {
                  setFormData({...formData, phone_number: text});
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
            <View style={styles.inputBox}>
              {/* <AntDesign name="lock" size={25} color="#742b9e" /> */}
              <TextInput
                secureTextEntry
                value={formData.re_password}
                onChangeText={text =>
                  setFormData({...formData, re_password: text})
                }
                textContentType="password"
                placeholder="Retype Password"
                placeholderTextColor={'#adadad'}
                style={{fontSize: 18, width: '90%'}}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigate('VerifyOtp', {email: 'tsegalidetpaintings9@gmail.com'})
            }>
            <Text>OTP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
            {isLoading ? (
              <Loading color="pink" size={22} />
            ) : (
              <Text style={styles.loginBtnText}>Register</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'row',
              bottom: 60,
            }}
            onPress={() => replace('Login')}>
            <Text>Already have an account?</Text>
            <Text style={{color: colors.purple}}> Log in</Text>
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
