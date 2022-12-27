import React, { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View, ScrollView, Text, PermissionsAndroid, ActivityIndicator , } from "react-native";
import Toast from 'react-native-toast-message';
import Pdf from 'react-native-pdf';
import HeaderWithBackAndCart from "../../components/HeaderWithBackAndCartButton/HeaderWithBackAndCart";
import LocalizationContext from "../../../LocalizationContext";
import moment from "moment";
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Octicons from 'react-native-vector-icons/Octicons'
import ReactNativeBlobUtil from 'react-native-blob-util'

export default function Invoice(props) {
    const source = { uri: props?.route?.params?.URL };
    const [loading, setloading] = useState(false)
    const { t } = React.useContext(LocalizationContext);
    const checkPermission = async () => {

        // Function to check the platform
        // If Platform is Android then check for permissions.

        if (Platform.OS === 'ios') {
            downloadFile();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'Application needs access to your storage to download File',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Start downloading
                    downloadFile();
                    console.log('Storage Permission Granted.');
                } else {
                    // If permission denied then show alert
                    // Alert.alert('Error', 'Storage Permission Not Granted');
                }
            } catch (err) {
                // To handle permission related exception
                console.log("++++" + err);
            }
        }
    };
    const downloadFile = () => {
        let date = new Date();
        let FILE_URL = props?.route?.params?.URL;
        file_ext = '.pdf';
        const { config, fs } = ReactNativeBlobUtil;
        const dirs = fs.dirs; //Use the dir API
        const Donuts_Invoice = dirs.DownloadDir + '/Donuts_Invoice';
        setloading(true)
        fs.exists(Donuts_Invoice)
            .then((exist) => {
                if (!exist) {
                    fs.mkdir(Donuts_Invoice)
                        .catch(err => {
                            console.log(err);
                        });
                }
            })
            .catch((e) => {
                console.log('e', e)
            })
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                path:
                    Donuts_Invoice +
                    '/Invoice Donuts_' +
                    Math.floor(date.getTime() + date.getSeconds() / 2) +
                    file_ext,
                description: 'downloading file...',
                notification: true,
                useDownloadManager: true,
            },
        };
        config(options)
            .fetch('GET', FILE_URL)
            .then(res => {
                setloading(false)
                Toast.show({
                    type: 'success',
                    text1: t('successfull'),
                    text2: t('File Downloaded Successfully')
                });

            }).catch(e => {
                Toast.show({
                    type: 'error',
                    text1: 'OOPS',
                    text2: t('Something Went Wrong! Kindly try again later')
                })
                setloading(false)
            }

            );
    };

    // const saveFile = () => {
    //     // var RNFS = require('react-native-fs');
    //     const fs = ReactNativeBlobUtil.fs;
    //     var splitArray = props?.route?.params?.URL.split("/");
    //     var fileName = splitArray[splitArray.length - 1]
    //     console.log(fileName)
    //     // props?.route?.params?.URL
    //     // var path = RNFS.DownloadDirectoryPath + '/' + fileName;
    //     // var path = DownloadDirectoryPath + '/' + "Invoice_Donuts";
    //     let path = DocumentDirectoryPath + '/' + fileName;
    //     let dirs = fs.dirs;

    //     fs.writeFile(path, props?.route?.params?.URL, 'uri')
    //       .then(() => {
      
    //         ReactNativeBlobUtil.config({
    //           fileCache: true,
    //           // android only options, these options be a no-op on IOS
    //           addAndroidDownloads: {
    //           title: `Maria`,
    //               // Show notification when response data transmitted
    //               notification: true,
    //           showNotification: true,
    //           path: path,
      
    //               // Title of download notification
    //               // File description (not notification description)
    //               description: 'An PdF file.',
    //               mime: 'application/pdf',
      
    //               // Make the file scannable  by media scanner
    //               // mediaScannable: true,
    //           }
    //       })
    //     })
    //       .catch((err) => {
    //         console.log("SaveFile()", err.message);
    //         alert(err.message)
    //       });
      
    //       //   RNFetchBlob.android.addCompleteDownload({
    //       //     title: `Maria`,
    //       //     description: 'desc',
    //       //     mime: 'application/pdf',
    //       //     path: path,
    //       //     showNotification: true,
    //       //     notification: true
    //       //   })
    //       //   console.log('FILE WRITTEN!');
    //       // })
      
    //   }

    //   const sharePdf = async () => {
    //     try {
    //       await Share.open({
    //         url:url,
    //         title: "Sharing Certificate Maria.pdf file from SeekO app",
    //         message: "Please take a look at this pdf",
    //         filename:"Maria",
    //       });
    //     } catch (err) {
    //       console.log(err);
    //     }
    // }

    return (
        <View style={styles.container}>
            <HeaderWithBackAndCart
                HeaderText={''}
                backNavigation={() => props.navigation.goBack()}
                icon_name={"trash"}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf} />

                <View style={{
                    marginHorizontal: 12,
                    marginVertical: 12

                }}>
                    <View style={{
                        flexDirection: "row"
                    }}>
                        <View>
                            <View style={styles.FirstLine} />
                            <View style={[styles.timeIcon, { backgroundColor: "#28A745" , borderRadius:100 }]}>
                                <AntDesign name="clockcircleo" size={18} color="#fff" />

                            </View>
                            <View style={styles.secondline} >

                            </View>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.title}>{t('Confirm')}</Text>
                            <Text style={styles.subtitle}>{moment(props?.route?.params?.item?.order?.order_confirmed).format('ddd, MMM Do YYYY / HH:mm')}</Text>

                        </View>

                    </View>
                    {props?.route?.params?.item?.order?.order_treated != null ? (
                        <View style={{
                            flexDirection: "row"
                        }}>
                            <View>
                                <View style={{ width: 6, height: 40, backgroundColor: "#F4F4F4", alignSelf: 'center' }} />
                                <View style={[styles.timeIcon, { backgroundColor: "#FFC107" }]} >
                                    <MaterialCommunityIcons name="email-check" size={18} color="#fff" />
                                </View>
                                <View style={styles.secondline} />


                            </View>
                            <View style={[styles.card, { marginTop: 18 }]}>
                                <Text style={styles.title}>{t('Treated')}</Text>
                                <Text style={{ marginTop: 6, fontSize: 12, fontWeight: "bold", color: "gray" }}>{moment(props?.route?.params?.item?.order?.order_treated).format('ddd, MMM Do YYYY / HH:mm')}</Text>

                            </View>

                        </View>

                    ) : null}
                    {props?.route?.params?.item?.order?.order_indelivery != null ? (
                        <View style={{
                            flexDirection: "row"
                        }}>
                            <View>
                                <View style={{ width: 6, height: 40, backgroundColor: "#F4F4F4", alignSelf: 'center' }} />
                                <View style={[styles.timeIcon, { backgroundColor: "#6C757D" }]} >
                                    <FontAwesome5 name="truck" size={14} color="#fff" />
                                </View>
                                <View style={styles.secondline} />


                            </View>
                            <View style={[styles.card, { marginTop: 18 }]}>
                                <Text style={styles.title}>{t('Indelivery')}</Text>
                                <Text style={{ marginTop: 6, fontSize: 12, fontWeight: "bold", color: "gray" }}>{moment(props?.route?.params?.item?.order?.order_indelivery).format('ddd, MMM Do YYYY / HH:mm')}</Text>

                            </View>

                        </View>

                    ) : null}
                    {props?.route?.params?.item?.order?.order_delivered != null ? (
                        <View style={{
                            flexDirection: "row"
                        }}>
                            <View>
                                <View style={{ width: 6, height: 40, backgroundColor: "#F4F4F4", alignSelf: 'center' }} />
                                <View style={[styles.timeIcon, { backgroundColor: "#007BFF" }]} >
                                    <Octicons name="checklist" size={18} color="#fff" />
                                </View>
                                <View style={styles.secondline} />


                            </View>
                            <View style={[styles.card, { marginTop: 18 }]}>
                                <Text style={styles.title}>{t('Delivered')}</Text>
                                <Text style={{ marginTop: 6, fontSize: 12, fontWeight: "bold", color: "gray" }}>{moment(props?.route?.params?.item?.order?.order_delivered).format('ddd, MMM Do YYYY / HH:mm')}</Text>

                            </View>

                        </View>

                    ) : null}




                </View>
            </ScrollView >

            <TouchableOpacity
                onPress={() => checkPermission()}
                style={{
                    width: 50,
                    height: 50,
                    backgroundColor: '#198754',
                    borderRadius: 100,
                    position: "absolute",
                    bottom: 12,
                    right: 12,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    {loading ? (
                        <ActivityIndicator color={'#fff'} size='large' />

                    ):
                    <AntDesign name="clouddownloado" size={32} color='#fff' />
                    }
               

            </TouchableOpacity>
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'

    },
    pdf: {
        width: Dimensions.get('window').width,
        height: (60 / 100) * Dimensions.get('window').height,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        width: "80%",
        padding: 12,
        // elevation: 4,
        borderWidth:1,
        borderColor:"#F0F0F0",
        elevation:2,
        marginLeft: 18,
        height: 100,
        justifyContent: "center"

    },
    FirstLine: {
        width: 6,
        height: 25,
        backgroundColor: "#F4F4F4",
        alignSelf: 'center',

    },
    timeIcon: {
        width: 30,
        height: 30,
        backgroundColor: "#A927F9",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center"

    },
    secondline: {
        width: 6,
        height: 50,
        backgroundColor: "#F4F4F4",
        alignSelf: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: 'black'
    },
    subtitle: {
        marginTop: 6,
        fontSize: 12,
        fontWeight: "bold",
        color: "gray"
    }
});