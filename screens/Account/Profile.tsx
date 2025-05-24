import Toast from 'react-native-toast-message';
import ProtectedRoute from '../../components/ProtectedRoute';
import {AuthContext} from '../../context/AuthContext';
import {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native';
import {toastConfig} from './Login';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AccountStackParamList} from '../../types/NavigationType';
import colors from '../../styles/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProps = NativeStackNavigationProp<AccountStackParamList>;

export const Profile = () => {
  const authContext = useContext(AuthContext);

  const [openModal, setOpenModal] = useState(false);
  const [password, setPassword] = useState('');
  const [requestType, setRequestType] = useState<
    'delete' | 'change-email' | 'change-phone' | ''
  >('');

  const {navigate} = useNavigation<NavigationProps>();

  const formattedPhoneNumber = `${authContext?.user?.phone_number.slice(
    0,
    4,
  )}***${authContext?.user?.phone_number.slice(-3)}`;

  const formattedEmail = `${authContext?.user?.email.slice(
    0,
    1,
  )}***${authContext?.user?.email.slice(-12)}`;

  const [name, setName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    formattedPhoneNumber,
  );

  const handleRequest = async () => {
    if (
      requestType === 'change-email' &&
      email &&
      authContext?.user?.phone_number
    ) {
      const response = await authContext?.transferAccount(
        email,
        authContext?.user?.phone_number,
        'email',
        password,
      );

      console.log(response);

      if (response.status === 200) {
        const token = {
          access: response.data.access,
          refresh: response.data.refresh,
        };

        await AsyncStorage.setItem('token', JSON.stringify(token));

        authContext?.setUser({
          ...authContext.user,
          email: response.data.email,
        });

        Toast.show({
          type: 'success',
          text1: 'Email was transferred successfully',
        });

        setOpenModal(false);
      }
    } else if (
      requestType === 'change-phone' &&
      authContext?.user?.phone_number &&
      phoneNumber
    ) {
      const response = await authContext?.transferAccount(
        authContext?.user?.email,
        phoneNumber,
        'phone',
        password,
      );

      if (response.status === 200) {
        const token = {
          access: response.data.access,
          refresh: response.data.refresh,
        };

        console.log(response);

        await AsyncStorage.setItem('token', JSON.stringify(token));

        authContext?.setUser({
          ...authContext.user,
          phone_number: response.data.phone_number,
        });

        Toast.show({
          type: 'success',
          text1: 'Phone Number was transferred successfully',
        });

        setOpenModal(false);
      }
    } else if (requestType === 'delete') {
      const response = await authContext?.deleteAccount(password);
      if (response.status === 204)
        Toast.show({
          type: 'success',
          text1: 'Account Deleted Successfully',
        });
    }
    setPassword('');
  };

  const handleUpdate = async () => {
    if (name) {
      const response = await authContext?.updateUserInfo(name);
      if (response.status === 200) {
        const token = {
          access: response.data.access,
          refresh: response.data.refresh,
        };

        await AsyncStorage.setItem('token', JSON.stringify(token));

        authContext?.setUser({
          ...authContext.user,
          name: response.data.user.name,
        });
        Toast.show({
          type: 'success',
          text1: 'User Info Updated Successfully!',
        });
      } else if (response.status === undefined) {
        Toast.show({
          type: 'error',
          text1: 'Check Your Network!',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Something Went Wrong!',
        });
      }
    }
  };

  const handleLogout = async () => {
    authContext?.logout();
    Toast.show({type: 'success', text1: 'Successfully logout!'});
  };

  useEffect(() => {
    if (authContext?.user?.name && formattedEmail && formattedPhoneNumber) {
      setName(authContext?.user?.name);
      setEmail(formattedEmail);
      setPhoneNumber(formattedPhoneNumber);
    }
  }, [authContext?.user]);

  return (
    <ProtectedRoute>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Modal animationType="slide" transparent={true} visible={openModal}>
            <TouchableWithoutFeedback
              onPress={() => {
                setOpenModal(false);
                setPassword('');
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalContainer}>
                  <Text>Enter Password</Text>
                  <View style={styles.inputBox}>
                    {/* <AntDesign name="lock" size={25} color="#742b9e" /> */}
                    <TextInput
                      secureTextEntry
                      value={password}
                      onChangeText={text => setPassword(text)}
                      textContentType="password"
                      placeholder="Password"
                      placeholderTextColor={'#adadad'}
                      style={{fontSize: 18, width: '90%'}}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setOpenModal(false);
                      setPassword('');
                    }}>
                    <Text>Close</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleRequest}>
                    <Text>Confirm</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.backDrop}></View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Text style={styles.title}>Your Profile</Text>
          <View style={styles.infoContainer}>
            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.inputField}
                value={name}
                onChangeText={setName}
              />
              <TouchableOpacity
                disabled={authContext?.user?.name === name}
                onPress={handleUpdate}>
                <Text
                  style={[
                    styles.saveBtnText,
                    {
                      color:
                        authContext?.user?.name === name ? 'gray' : 'purple',
                    },
                  ]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.inputField}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
              <TouchableOpacity
                disabled={
                  formattedEmail === email || authContext?.user?.email === email
                }
                onPress={() => {
                  setRequestType('change-email');
                  setOpenModal(true);
                }}>
                <Text
                  style={[
                    styles.saveBtnText,
                    {
                      color:
                        formattedEmail === email ||
                        authContext?.user?.email === email
                          ? 'gray'
                          : 'purple',
                    },
                  ]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.inputField}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                autoCapitalize="none"
              />
              <TouchableOpacity
                disabled={
                  formattedPhoneNumber === phoneNumber ||
                  authContext?.user?.phone_number === phoneNumber
                }
                onPress={() => {
                  setRequestType('change-phone');
                  setOpenModal(true);
                }}>
                <Text
                  style={[
                    styles.saveBtnText,
                    {
                      color:
                        formattedPhoneNumber === phoneNumber ||
                        authContext?.user?.phone_number === phoneNumber
                          ? 'gray'
                          : 'purple',
                    },
                  ]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigate('ChangePassword')}>
              <Text style={styles.btnText2}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <Text style={styles.logoutBtnText}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setRequestType('delete');
                setOpenModal(true);
              }}>
              <Text style={styles.btnText1}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Toast topOffset={70} config={toastConfig} />
    </ProtectedRoute>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 10,
    backgroundColor: '#edcef5',
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    color: '#4d1170',
    fontSize: 28,
    fontWeight: 'bold',
  },
  infoContainer: {
    display: 'flex',
    gap: 4,
  },
  inputFieldContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  inputField: {
    backgroundColor: '#9674ab',
    fontSize: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    width: 250,
    textAlign: 'center',
    color: 'white',
    borderRadius: 6,
  },
  saveBtnText: {
    fontSize: 18,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  logoutBtn: {
    backgroundColor: '#2e2e2e',
    display: 'flex',
    alignItems: 'center',
    width: 200,
    paddingVertical: 10,
    borderRadius: 4,
  },
  logoutBtnText: {
    fontSize: 16,
    color: 'pink',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    width: 200,
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 4,
  },
  btnText1: {
    fontSize: 16,
    color: colors.red,
  },
  btnText2: {
    fontSize: 16,
    color: colors.green,
  },
  centeredView: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backDrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.3,
  },
  modalContainer: {
    width: 320,
    height: 170,
    backgroundColor: colors.secondary,
    zIndex: 20,
    padding: 10,
    borderRadius: 10,
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
});
