import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import Loading from '../../components/Loading';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import colors from '../../styles/color';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AccountStackParamList} from '../../types/NavigationType';

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

export const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const {replace} = useNavigation<NavigationProps>();

  const authContext = useContext(AuthContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await authContext?.resetPassword(formData.email);

    if (response?.status === 200) {
      replace('ForgetPasswordConfirm', {email: formData.email});
    } else if (response?.status === 400) {
      Toast.show({type: 'error', text1: response.data.message});
    }

    setIsLoading(false);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.title}>Reset Password</Text>
          <View style={{display: 'flex', gap: 18}}>
            <View style={styles.inputBox}>
              {/* <FontAwesome name="envelope-o" size={24} color="#742b9e" /> */}
              <TextInput
                value={formData.email}
                onChangeText={text => setFormData({...formData, email: text})}
                placeholder="Email"
                placeholderTextColor={'#adadad'}
                style={{fontSize: 18, width: '90%'}}
                autoCapitalize="none"
              />
            </View>
          </View>
          <TouchableOpacity style={styles.sendCodeBtn} onPress={handleSubmit}>
            {isLoading ? (
              <Loading size={12} color="black" />
            ) : (
              <Text style={styles.sendCodeBtnText}>Send Code</Text>
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
  sendCodeBtnText: {
    fontSize: 16,
    color: 'pink',
  },
});
