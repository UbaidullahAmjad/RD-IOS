import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableHighlight,
  Keyboard,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import {login} from '../../Store/Actions/userAction';
import {connect} from 'react-redux';
import LocalizationContext from '../../../LocalizationContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const Login = ({navigation, login, shared}) => {
  const { t } = React.useContext(LocalizationContext);
  const [Email, setEmail] = useState('');
  const [EmailFocus, setEmailFocus] = useState(false);
  const [Password, setPassword] = useState('');
  const [ShowPassword, setShowPassword] = useState(true);
  const [PasswordFocus, setPasswordFocus] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableWithoutFeedback
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          setEmailFocus(false);
          setPasswordFocus(false);
          Keyboard.dismiss();
        }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 12,
          }}
          onClick={() => {
            setEmailFocus(false);
            setPasswordFocus(false);
          }}>
          <Image
            source={require('../../assets/images/donut_logo1.png')}
            resizeMode="contain"
          />
          <View style={{marginTop: 20}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',

                // width: "65%",
              }}>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    marginTop: 5,
                    marginRight: 50,
                    fontWeight: '700',
                    fontSize: 16,
                  }}>
                  Adresse email
                </Text>
              </View>

              <TextInput
                placeholder={"Adresse e-mail"}
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  borderBottomWidth: EmailFocus == '' ? 1 : 2,
                  borderBottomColor: EmailFocus == false ? '#ccc' : '#EC607F',
                }}
                textContentType="emailAddress"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                onChangeText={value => setEmail(value)}></TextInput>
            </View>
            <View
              style={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    marginTop: 5,
                    marginRight: 20,
                    fontWeight: '700',
                    fontSize: 16,
                  }}>
                    Mot de passe
                </Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: PasswordFocus == false ? 1 : 2,
                  borderBottomColor:
                    PasswordFocus == false ? '#ccc' : '#EC607F',
                  marginRight: 8,
                }}>
                <TextInput
                  placeholder={"Mot de passe"}
                  textContentType="password"
                  style={{
                    borderBottomColor: '#DDDDDD',
                    borderBottomWidth: 1,
                    paddingVertical: 10,
                    color: 'black',
                    width: '90%',
                  }}
                  secureTextEntry={ShowPassword}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  onChangeText={value => setPassword(value)}></TextInput>
                {Password != '' && !ShowPassword ? (
                  <TouchableWithoutFeedback
                    onPress={() => setShowPassword(true)}>
                    <View
                      style={{
                        marginTop: 10,
                        paddingRight: 5,
                        justifyContent: 'center',
                      }}>
                      <FontAwesome name="eye-slash" />
                    </View>
                  </TouchableWithoutFeedback>
                ) : (
                  <TouchableWithoutFeedback
                    onPress={() => setShowPassword(false)}>
                    <View
                      style={{
                        marginTop: 10,
                        paddingRight: 5,
                        justifyContent: 'center',
                      }}>
                      <FontAwesome name="eye" />
                    </View>
                  </TouchableWithoutFeedback>
                )}
              </View>
            </View>
            <View>
              <View
                style={{
                  marginTop: 30,
                  width: '60%',
                  alignSelf: 'center',
                  elevation: 10,
                }}>
                <TouchableHighlight
                  onPress={() =>
                    login(
                      Email,
                      Password,
                      t('Kindly Enter Phone Number and Password'),
                    )
                  }
                  underlayColor="#fff">
                  <View
                    style={{
                      backgroundColor: '#198754',
                      padding: 12,
                      alignItems: 'center',
                      elevation: 10,
                      borderRadius: 20,
                    }}>
                    {shared.btnLoader ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={{color: '#fff'}}>Se connecter</Text>
                    )}
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const mapStateToProps = ({shared}) => ({
  shared,
});

export default connect(mapStateToProps, {
  login,
})(Login);
