import React, {useContext, useState} from 'react';
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

type NavigationProps = NativeStackNavigationProp<AccountStackParamList>;

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const authContext = useContext(AuthContext);

  const {navigate, goBack} = useNavigation<NavigationProps>();

  const handleLogin = async () => {
    if (formData.email === '' || formData.password === '') return;

    Keyboard.dismiss();
    setIsLoading(true);

    const response = await authContext?.login(
      formData.email,
      formData.password,
    );

    if (response?.status === 200) {
      goBack();
    }

    setIsLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Login To Addmesh</Text>
        <View style={{display: 'flex', gap: 18}}>
          <View style={styles.inputBox}>
            {/* <AntDesign name="user" size={24} color="#742b9e" /> */}
            <TextInput
              value={formData.email}
              onChangeText={text => setFormData({...formData, email: text})}
              placeholder="Email or Phone Number"
              placeholderTextColor={'#adadad'}
              style={{fontSize: 18, width: '90%'}}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputBox}>
            {/* <AntDesign name="lock" size={25} color="#742b9e" /> */}
            <TextInput
              secureTextEntry
              value={formData.password}
              onChangeText={text => setFormData({...formData, password: text})}
              textContentType="password"
              placeholder="Password"
              placeholderTextColor={'#adadad'}
              style={{fontSize: 18, width: '90%'}}
            />
          </View>
          <TouchableOpacity style={{alignSelf: 'flex-end'}}>
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
        <TouchableOpacity style={{position: 'absolute', bottom: 60}}>
          <Text>Don't have an account?</Text>
          <Text style={{color: '#a70abf'}}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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
  loginBtn: {
    backgroundColor: '#2e2e2e',
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
