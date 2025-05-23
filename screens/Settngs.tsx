import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../styles/color';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const Settings = () => {
  const {t, i18n} = useTranslation();

  const {navigate} = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Text style={styles.btnText}>{t('language')}</Text>
        <View style={styles.languageBtnContainer}>
          <TouchableOpacity
            style={
              i18n.language === 'am'
                ? styles.activeLanguageBtn
                : styles.languageBtn
            }
            onPress={() => i18n.changeLanguage('am')}>
            <Text
              style={
                i18n.language === 'am'
                  ? styles.activeLanguageBtnText
                  : styles.languageBtnText
              }>
              አማርኛ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              i18n.language === 'en'
                ? styles.activeLanguageBtn
                : styles.languageBtn
            }
            onPress={() => i18n.changeLanguage('en')}>
            <Text
              style={
                i18n.language === 'en'
                  ? styles.activeLanguageBtnText
                  : styles.languageBtnText
              }>
              English
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('Account')}>
        <Text style={styles.btnText}>{t('account')}</Text>
        <MaterialIcons
          name="account-circle"
          size={28}
          color={colors.primaryBorder}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigate('WebViewPage', {uri: 'https://stage.addmeshbook.com/About'})
        }>
        <Text style={styles.btnText}>{t('about')}</Text>
        <Entypo
          name="info-with-circle"
          size={26}
          color={colors.primaryBorder}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.btnText}>{t('help')}</Text>
        <Entypo
          name="help-with-circle"
          size={26}
          color={colors.primaryBorder}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigate('WebViewPage', {
            uri: 'https://stage.addmeshbook.com/Contact',
          })
        }>
        <Text style={styles.btnText}>{t('contact_us')}</Text>
        <MaterialCommunityIcons
          name="message-processing"
          size={27}
          color={colors.primaryBorder}
        />
      </TouchableOpacity>
      <View style={styles.button}>
        <Text style={styles.btnText}>{t('version')}</Text>
        <Text style={{color: colors.purple}}>2.0.0</Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigate('WebViewPage', {
            uri: 'https://stage.addmeshbook.com/PrivacyPolicy',
          })
        }>
        <Text style={styles.privacyPolicy}>Privacy Policy</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingTop: 40,
    gap: 10,
  },
  button: {
    paddingHorizontal: 30,
    width: 350,
    height: 60,
    borderColor: colors.primaryBorder,
    borderWidth: 1.3,
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 16,
    fontWeight: 700,
    position: 'relative',
    left: -10,
  },
  languageBtnContainer: {
    position: 'absolute',
    right: 0,
    display: 'flex',
    height: '100%',
    width: 175,
  },
  languageBtn: {
    display: 'flex',
    columnGap: 6,
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    width: '100%',
    borderLeftWidth: 1.3,
    borderColor: colors.primaryBorder,
  },
  activeLanguageBtn: {
    display: 'flex',
    columnGap: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryBorder,
    height: '50%',
    width: '100%',
  },
  languageBtnText: {
    fontSize: 11,
    color: colors.primary,
  },
  activeLanguageBtnText: {
    fontSize: 16,
    color: colors.secondary,
  },
  privacyPolicy: {
    marginTop: 50,
    textDecorationLine: 'underline',
    color: colors.purple,
  },
});
