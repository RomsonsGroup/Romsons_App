import React, { useMemo, useState} from "react";
import {  Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import { Colors,darkTheme,Fonts,lightTheme,SH } from "../../utils";
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from "react-redux";
import { Style } from "../../styles";
const Repeat = (props) => {
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const Styles = useMemo(() => Style(Colors), [Colors]);
    const { t, i18n } = useTranslation();
    const data = [
        { label: t("Select_anyone"), value: '1' },
        { label:t("dummy_text"), value: '2' },
        { label: t("dummy_text"), value: '3' },
        { label:t("dummy_text"), value: '4' },
        { label: t("dummy_text"), value: '5' },
      ];
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    return (
        <>
        {/* {renderLabel()} */}
        <Text style={Styles.DatapickerInputHeadingText_Dropdown}>{props.handleName}</Text>
        <Dropdown
          style={[Styles.dropdown_Dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={Styles.placeholderStyle_Dropdown}
          selectedTextStyle={Styles.selectedTextStyle_Dropdown}
          inputSearchStyle={Styles.inputSearchStyle_Dropdown}
          iconStyle={Styles.iconStyle_Dropdown}
          data={data}
          // search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ?  t("Select_anyone") : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
        </>
    );
}

export default Repeat;
