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
} from 'react-native';

export const Profile = () => {
  const authContext = useContext(AuthContext);

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
          <Text style={styles.title}>Your Profile</Text>
          <View style={styles.infoContainer}>
            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.inputField}
                value={name}
                onChangeText={setName}
              />
              <TouchableOpacity disabled={authContext?.user?.name === name}>
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
              />
              <TouchableOpacity
                disabled={
                  formattedEmail === email || authContext?.user?.email === email
                }>
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
              />
              <TouchableOpacity
                disabled={
                  formattedPhoneNumber === phoneNumber ||
                  authContext?.user?.phone_number === phoneNumber
                }>
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
              style={styles.logoutBtn}
              onPress={authContext?.logout}>
              <Text style={styles.logoutBtnText}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => authContext?.deleteAccount('')}>
              <Text style={styles.deleteBtnText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
  deleteBtn: {
    display: 'flex',
    alignItems: 'center',
    width: 200,
    paddingVertical: 10,
    borderRadius: 4,
  },
  deleteBtnText: {
    fontSize: 16,
    color: '#e62f2c',
  },
});
