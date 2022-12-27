import React from "react";
import { View } from "react-native";
import { DataTable } from "react-native-paper";
import { connect } from 'react-redux';
import LocalizationContext from '../../../LocalizationContext';
import { modifyCart } from "../../Store/Actions/cartAction";




const Table = (props) => {
    const { setLocale, t } = React.useContext(LocalizationContext);
    return (
        <View>
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
                    {props?.item[0]?.min_req_qty == 1 ? (
                        <DataTable.Title numeric>M</DataTable.Title>
                    ) : null}

                    {props.action == "show" && <DataTable.Title numeric></DataTable.Title>}
                </DataTable.Header>
                {props?.item.map((item, index) => {
                    return (
                        <DataTable.Row key={index}>
                            <DataTable.Cell numberOfLines={2} style={{ flex: 3 }}>
                                {item?.product_name}
                            </DataTable.Cell>
                            <DataTable.Cell style={{ flex: 1.5 }}>
                                {item?.unit_name}
                            </DataTable.Cell>
                            <DataTable.Cell numeric style={{ flex: 1.5 }}>
                                {item?.unit_price}
                            </DataTable.Cell>
                            <DataTable.Cell numeric>{item?.quantity}</DataTable.Cell>
                            {item?.min_req_qty == 1 ? (
                                <DataTable.Cell numeric>{item?.min_quantity}</DataTable.Cell>
                            ) : null}

                            {props.action == "show" && (
                                <DataTable.Cell

                                    numeric>

                                    {/* <FontAwesome onPress={() => remove(item.cart_id, item.product_id)} name="times" color="red" size={18} /> */}

                                </DataTable.Cell>
                            )}
                        </DataTable.Row>
                    )
                })}
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
