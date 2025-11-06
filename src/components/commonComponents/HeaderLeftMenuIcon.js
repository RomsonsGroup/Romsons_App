import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Colors, SF, SH } from '../../utils';
import { VectorIcon } from '../../components';

function HeaderLeftMenuIcon(props) {
    const { navigation } = props;
    return (
        <TouchableOpacity  style={{marginLeft:SH(0)}} onPress={() => navigation.toggleDrawer()}>
            <VectorIcon
                color={Colors.white_text_color}
                name="menuunfold"
                icon="AntDesign"
                size={SF(30)}
            />
        </TouchableOpacity>
    );
};

export default HeaderLeftMenuIcon;