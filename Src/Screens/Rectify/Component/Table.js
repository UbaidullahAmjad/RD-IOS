import React from "react";
import { TouchableHighlight, View, Text, TouchableOpacity, Alert } from "react-native";
import { DataTable } from "react-native-paper";
import { connect } from 'react-redux';
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import store from "../../../Store";
import { deleteItem, modifyCart } from "../../../Store/Actions/cartAction";
import LocalizationContext from '../../../../LocalizationContext';
import { removeRectifyItem } from "../../../Store/Actions/rectifyAction";




const Table = (props) => {
  const { t , locale } = React.useContext(LocalizationContext);
  const price = parseInt(props?.item?.unit_price)
  function remove(item) {
    Alert.alert(
      `${t('delete')}`,
      t("Are you sure you want to delete"),
      [
        {
          text: `${t('Cancel')}`,
        },
        { text: t('okay'), onPress: () => props.removeRectifyItem(item, props.sid, t('Something Went Wrong! Kindly try again later'), t('Kindly Check your Internet Connection')) }
      ]
    );
  }
  return (
    <View>
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell numberOfLines={2} style={{ flex: 3 }}>
            {props?.item?.product_name}
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: 1.5 }}> {props?.item?.unit_name}</DataTable.Cell>
          <DataTable.Cell numeric style={{ flex: 1.5 }}>
          {locale == "en" ? (
              <Text style={{}}>{(price).toFixed(2).replace(/(\.0+|0+)$/, '')}€</Text>
            ) :
              <Text style={{}}>{(price).toFixed(2).replace(".", ",").replace(/(\,0+|0+)$/, '')}€</Text>
            }
            {/* {props?.item?.unit_price} */}
          </DataTable.Cell>
          <DataTable.Cell numeric>{props?.item?.quantity}</DataTable.Cell>
          {props?.item?.min_req_qty ? (
            <DataTable.Cell numeric>{props?.item?.min_quantity}</DataTable.Cell>
          ) : null}

          {props.action == "show" && (
            <DataTable.Cell

              numeric>

              <FontAwesome
                onPress={() => remove(props.item)}
                name="times" color="red" size={18} />

            </DataTable.Cell>
          )}
        </DataTable.Row>

      </DataTable>
    </View>
  );
};



const mapStateToProps = (state, ownProps) => ({
  cart: state.cart,
  item: ownProps.item,
  alldata: ownProps.alldata,
  navigation: ownProps.navigation
})

export default connect(mapStateToProps, {
  modifyCart,
  removeRectifyItem
})(Table)
