import React from "react";
import { Dimensions, FlatList, Image, View } from "react-native";
import { connect } from 'react-redux';
import LocalizationContext from '../../../LocalizationContext';
import HeaderWithBackAndCart from "../../components/HeaderWithBackAndCartButton/HeaderWithBackAndCart";
import RectifyTable from './Component/rectifyTable'

let deviceHeight = Dimensions.get('window').height
const Rectify = (props) => {
    const { t } = React.useContext(LocalizationContext);
    return (
        <View style={{ flex: 1 }}>
            <HeaderWithBackAndCart
                HeaderText={t('Rectify')}
                backNavigation={() => props.navigation.goBack()}
                icon_name={"trash"}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                initialNumToRender={5}
                // data={emptyCart == false ? cart.cart : []}
                data={props.rectify.rectify}
                renderItem={({ item, index }) => {
                    return (
                        <RectifyTable item={item} navigation={props.navigation} />
                    )
                }}
                keyExtractor={(item, index) => index}
                ListEmptyComponent={() => {
                    return (
                        <View style={{ justifyContent: "center", alignItems: "center", height: (95 / 100) * deviceHeight, }}>
                            {/* <Image source={require('../../assets/images/folder.png')} /> */}
                        </View>
                    )
                }}
            />

        </View>
    );
};

const mapStateToProps = ({ rectify }) => ({
    rectify
})


export default connect(mapStateToProps, {

})(Rectify)
