import React from "react";
import { TouchableHighlight, View, Text, TouchableOpacity, Alert } from "react-native";
import { DataTable } from "react-native-paper";
import { connect } from 'react-redux';
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import store from "../../Store";
import { deleteItem, modifyCart } from "../../Store/Actions/cartAction";
import LocalizationContext from '../../../LocalizationContext';




const Table = (props) => {
  const { setLocale, t, locale } = React.useContext(LocalizationContext);
  function remove(id, sid) {
    Alert.alert(
      `${t('delete')}`,
      t("Are you sure you want to delete"),
      [
        {
          text: `${t('Cancel')}`,
        },
        { text: t('okay'), onPress: () => store.dispatch(deleteItem(id, sid)) }
      ]
    );
  }
  return (
    <View>
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell numberOfLines={3} style={{ flex: 3, }}>
            {props?.item?.name}
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: 1.3, justifyContent: "center" }} > {props?.item?.unit}</DataTable.Cell>
          <DataTable.Cell numeric style={{ flex: 1.5, justifyContent: "flex-end" }}>
            {locale == "en" ? (
              <Text style={{}}>{(props?.item?.price_per_package).toFixed(2).replace(/(\.0+|0+)$/, '')}€</Text>
            ) :
              <Text style={{}}>{(props?.item?.price_per_package).toFixed(2).replace(".", ",").replace(/(\,0+|0+)$/, '')}€</Text>
            }

          </DataTable.Cell>

          <DataTable.Cell numeric>{props?.item?.quantity}</DataTable.Cell>

          {props?.min_req_qty == 1 ? (
            <DataTable.Cell numeric>{props?.item?.minquantity}</DataTable.Cell>
          ) : null}
          {props.action == "show" && (
            <DataTable.Cell

              numeric>

              <FontAwesome
                onPress={() => remove(props.item.id, props?.sid)}
                name="times" color="#DC3545" size={18} />

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
  modifyCart
})(Table)
