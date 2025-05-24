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

export const ChangePassword = () => {
  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: '',
    current_password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const authContext = useContext(AuthContext);

  const {goBack} = useNavigation<NavigationProps>();

  const handleChange = async () => {
    Keyboard.dismiss();
    setIsLoading(true);

    const response = await authContext?.changePassword({
      new_password: formData.new_password,
      re_new_password: formData.re_new_password,
      current_password: formData.current_password,
    });

    if (response?.status === 204) {
      goBack();
      Toast.show({type: 'success', text1: 'Successfully Changed Password!'});
    } else if (response?.status === 400) {
      Toast.show({type: 'error', text1: 'Wrong Password!'});
    } else if (response?.status === undefined) {
      Toast.show({type: 'error', text1: 'Check your network connection!'});
    }

    setIsLoading(false);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.title}>Chanage Password</Text>
          <View style={{display: 'flex', gap: 18}}>
            <View style={styles.inputBox}>
              {/* <AntDesign name="user" size={24} color="#742b9e" /> */}
              <TextInput
                value={formData.current_password}
                onChangeText={text =>
                  setFormData({...formData, current_password: text})
                }
                textContentType="password"
                placeholder="Current Password"
                placeholderTextColor={colors.lightGray}
                style={{fontSize: 18, width: '90%'}}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputBox}>
              {/* <AntDesign name="user" size={24} color="#742b9e" /> */}
              <TextInput
                value={formData.new_password}
                onChangeText={text =>
                  setFormData({...formData, new_password: text})
                }
                textContentType="password"
                placeholder="New Password"
                placeholderTextColor={colors.lightGray}
                style={{fontSize: 18, width: '90%'}}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputBox}>
              {/* <AntDesign name="lock" size={25} color="#742b9e" /> */}
              <TextInput
                secureTextEntry
                value={formData.re_new_password}
                onChangeText={text =>
                  setFormData({...formData, re_new_password: text})
                }
                textContentType="password"
                placeholder="Retype Password"
                placeholderTextColor={colors.lightGray}
                style={{fontSize: 18, width: '90%'}}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={handleChange}>
            {isLoading ? (
              <Loading color="pink" size={22} />
            ) : (
              <Text style={styles.loginBtnText}>Change</Text>
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
