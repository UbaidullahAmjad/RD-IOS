import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ScrollView,
  ActivityIndicator
} from "react-native";

import { connect } from 'react-redux';
import HeaderWithBackAndCart from "../../../components/HeaderWithBackAndCartButton/HeaderWithBackAndCart";
import { t } from "../../../i18n";
import { EditProfile } from "../../../Store/Actions/userAction";


const EditProfileftn = ({ navigation, user, EditProfile, shared }) => {
  const [fullname, setfullname] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [password, setpassword] = useState('')
  useEffect(() => {
    console.log(user.userData)
    setfullname(user?.userData?.name ? user?.userData?.name : null)
    setemail(user?.userData?.email ? user?.userData?.email : null)
    setphone(user?.userData?.mobilenumber ? user?.userData?.mobilenumber : null)

  }, [])

  return (
    <View style={{ flex: 1 }}>
      <HeaderWithBackAndCart
        HeaderText={''}
        backNavigation={() => navigation.goBack()}
        icon_name={"trash"}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
      >
        <View
          style={{
            elevation: 3,
            borderRadius: 5,
            backgroundColor: "#fff",
            margin: 10,
            padding: 10,
            marginTop: 24
          }}
        >
          <View>
            <Text style={{ color: "#EC607F", fontSize: 16, fontWeight: "700" }}>
              {t('Name')}
            </Text>
            <TextInput
              style={{
                marginVertical: 5,
                padding: 10,
                backgroundColor: "#fff",
                elevation: 2,
                borderRadius: 8,
                borderColor:'black', // if you need 
                borderWidth:1,
                shadowColor: 'grey',
                shadowRadius: 5,
                shadowOpacity: 0.5,
                
              }}
              placeholder={t('Enter name')}
              placeholderTextColor="#000"
              value={fullname}
              onChangeText={(text) => {
                setfullname(text)
              }}

            />
          </View>
          <View style={{ marginTop: 18 }}>
            <Text style={{ color: "#EC607F", fontSize: 16, fontWeight: "700" }}>
              {t('username')}
            </Text>
            <TextInput
              editable={false}
              style={{
                marginVertical: 5,
                padding: 10,
                backgroundColor: "#fff",
                elevation: 2,
                borderRadius: 8,
                borderColor:'black', // if you need 
                borderWidth:1,
                shadowColor: 'grey',
                shadowRadius: 5,
                shadowOpacity: 0.5,
              }}
              placeholder={t('Enter Email')}
              placeholderTextColor="#000"
              value={email}

              onChangeText={(text) => {
                setemail(text)
              }}
            />
          </View>
          <View style={{ marginTop: 18 }}>
            <Text style={{ color: "#EC607F", fontSize: 16, fontWeight: "700" }}>
              {t('Phone Number')}
            </Text>
            <TextInput
              style={{
                marginVertical: 5,
                padding: 10,
                backgroundColor: "#fff",
                elevation: 2,
                borderRadius: 8,
                borderColor:'black', // if you need 
                borderWidth:1,
                shadowColor: 'grey',
                shadowRadius: 5,
                shadowOpacity: 0.5,
              }}
              placeholder={t('Enter Phone Number')}
              placeholderTextColor="#000"
              value={phone}
              onChangeText={(text) => {
                setphone(text)
              }}
            />
          </View>
          <View style={{ marginTop: 18 }}>
            <Text style={{ color: "#EC607F", fontSize: 16, fontWeight: "700" }}>
              {t('Password')}
            </Text>
            <TextInput
              style={{
                marginVertical: 5,
                padding: 10,
                backgroundColor: "#fff",
                elevation: 2,
                borderRadius: 8,
                borderColor:'black', // if you need 
                borderWidth:1,
                shadowColor: 'grey',
                shadowRadius: 5,
                shadowOpacity: 0.5,
              }}
              placeholder={t('Enter Password')}
              placeholderTextColor="#000"
              onChangeText={(text) => {
                setpassword(text)
              }}
              value={password}
              secureTextEntry={true}
            />
          </View>
          <TouchableHighlight
            onPress={() => EditProfile(fullname, email, phone, password,
              t('Profile Updated Successfully'),
              t('Something Went Wrong! Kindly try again later'),
              t('Updated'),
              t('Kindly Check your Internet Connection')
            )}
            underlayColor="#fff" style={{
              marginTop: 24
            }}>
            <View
              style={{
                elevation: 1,
                padding: 10,
                width: "100%",
                alignSelf: "center",
                marginTop: 20,
                borderRadius: 30,
                backgroundColor: "#198754",
              }}
            >
              {shared.btnLoader ? (
                <ActivityIndicator size="small" color="#fff" />
              ) :
                <Text style={{ textAlign: "center", color: "#fff" }}>
                  {t('Edit Profile')}
                </Text>
              }

            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
};


const mapStateToProps = ({ user, shared }) => ({
  user,
  shared

})


export default connect(mapStateToProps, {
  EditProfile
})(EditProfileftn)
