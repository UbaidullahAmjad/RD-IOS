import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { DataTable } from 'react-native-paper';
import { connect } from 'react-redux';
import LocalizationContext from '../../../../LocalizationContext';
import { confirmRectify } from '../../../Store/Actions/rectifyAction'


import Table from '../Component/Table';



const OrderCartTable = (props) => {
  const { setLocale, t, locale } = React.useContext(LocalizationContext);
  const [total, settotal] = useState(0)

  useEffect(() => {
    var totalprice = 0
    for (let i = 0; i < props?.item?.order_items.length; i++) {
      totalprice = totalprice + props?.item?.order_items[i].quantity * props?.item?.order_items[i].unit_price
    }
    settotal(totalprice)
  }, [props?.item])

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
        }}
      >
        <View>
          <Text style={{ fontSize: 14, fontWeight: "700" }}>{props?.item?.order?.supplier_name?.split("=====")[0]}</Text>
        </View>
        <View>
          {locale == "en" ? (
            <Text style={{ fontSize: 16, fontWeight: "700" }}>{t('Total') + ":"} {(total).toFixed(2).replace(/(\.0+|0+)$/, '')}€</Text>
          ) :
            <Text style={{ fontSize: 16, fontWeight: "700" }}>{t('Total') + ":"} {(total).toFixed(2).replace(".", ",").replace(/(\,0+|0+)$/, '')}€</Text>
          }
          {/* <Text style={{ fontSize: 16, fontWeight: "700" }}>{t('Total')}: {total}€</Text> */}

        </View>
      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title numberOfLines={3} style={{ flex: 3 }}>
            {t('Product Name')}
          </DataTable.Title>
          <DataTable.Title style={{ flex: 1.3 }}>{t('Unit')}</DataTable.Title>
          <DataTable.Title numeric style={{ flex: 1.5 }}>
            {t('Price')}
          </DataTable.Title>
          <DataTable.Title numeric>R</DataTable.Title>
          {props?.item?.order_items[0].min_req_qty == 1 ? (
            <DataTable.Title numeric>M</DataTable.Title>
          ) : null}

          <DataTable.Title numeric></DataTable.Title>
        </DataTable.Header>
      </DataTable>

      {props?.item?.order_items.map((item, index) => {
        return (
          <Table key={index} action="show" item={item} sid={props?.item?.order?.supplier_id} />
        )
      })}
      <View style={{ flexDirection: 'row-reverse' }}>


        <TouchableOpacity
          onPress={() => props.navigation.navigate('RectifyModify', {
            item: props?.item,
            min_req_qty:props?.item?.order_items[0].min_req_qty
          })}

        >
          <View
            style={{
              padding: 10,
              marginRight: 5,
              backgroundColor: "#ccc",
              borderRadius: 6,
              marginTop: 8,
            }}
          >
            <Text style={{ color: "#000" }}>{t('Modify')}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {props?.item?.length != 0 ? (
        <TouchableHighlight
          onPress={() => props.confirmRectify(
            props?.item,
             t('Something Went Wrong! Kindly try again later'), t('Kindly Check your Internet Connection'),
             props?.navigation
             )}

          style={{
            padding: 10,
            backgroundColor: "#ec607f",

            marginTop: 16
          }}
        >
          {props.shared.btnLoader ? (
            <ActivityIndicator size="small" color="#fff" />
          ) :
            <Text style={{ color: "#fff", textAlign: "center" }}>{t('Confirm')}</Text>
          }

        </TouchableHighlight>
      ) : null}



    </View >
  );
};

const mapStateToProps = (state, ownProps) => ({
  shared: state.shared,
  item: ownProps.item,
  navigation: ownProps.navigation
})

export default connect(mapStateToProps, {
  confirmRectify
})(OrderCartTable)

