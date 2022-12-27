import moment from "moment";
import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LocalizationContext from '../../../LocalizationContext';
import Table from "./Table";


const OrderDetailTable = (props) => {
  const { t, locale } = React.useContext(LocalizationContext);
  var language = locale
  if (language == 'fn') {
    language = "fr"
  }
  return (
    <View
      style={{
        elevation: 2,
        backgroundColor: "#fff",
        margin: 5,
        borderRadius: 4,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          flexWrap: 'wrap'
        }}
      >
        <View style={{ maxWidth: '60%' }}>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>{t('Order')}# {props?.item?.order.order_no}</Text>
          <Text>{t('Supplier')}: {props?.item?.order.supplier_name}</Text>
          <Text>{t('DELIVERY DATE')}: {moment(props?.item?.order.delivery_date).format('ddd, MMM Do YYYY')}</Text>
        </View>

        <View style={{width:"33%"}}>
          {locale == "en" ? (
            <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "700", }}>{t('Total') + ":"} {(props?.item?.order?.total).toFixed(2).replace(/(\.0+|0+)$/, '')}€</Text>
          ) :
            <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "700", }}>{t('Total') + ":"} {(props?.item?.order?.total).toFixed(2).replace(".", ",").replace(/(\,0+|0+)$/, '')}€</Text>
          }
          {/* <Text style={{ fontSize: 16, fontWeight: "700" }}>
            {t('Total')} :  {props?.item?.order.total} €
          </Text> */}
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Invoice', {
                URL: `https://ecco.royaldonuts.xyz/getfile?id=${props?.item?.order?.id}&len=${language}`,
                item: props?.item
              })
              // Linking.openURL(`https://ecco.royaldonuts.xyz/getfile?id=${props?.item?.order?.id}&len=${language}`)
            }}
          >
            <View
              style={{
                padding: 10,
                backgroundColor: "#17A2B8",
                borderRadius: 6,
                marginTop: 6,
                alignItems: 'center'
              }}
            >
              <FontAwesome5 name='file-invoice' size={18} color='#fff' />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Table action="notShow" item={props?.item?.order_items} allData={props?.item} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          margin: 5,
        }}
      >
        <TouchableHighlight>
          <View
            style={{
              padding: 10,
              marginRight: 5,
              backgroundColor: `${props.btncolor}`,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "#fff" }}>{props.btnText}</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default OrderDetailTable;
