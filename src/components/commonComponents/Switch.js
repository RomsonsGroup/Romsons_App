import React from "react";
import { Switch } from '@rneui/themed';
import { Colors } from '../../utils';

function Switchs(props) {
    const { color, onValueChange, thumbColor, value, } = props;
    return (
        <Switch
            onValueChange={onValueChange}
            value={value}
            color={Colors.theme_background}
        />
    );
};
export default Switchs;