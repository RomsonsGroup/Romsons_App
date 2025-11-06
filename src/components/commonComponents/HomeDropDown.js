// import React, { useMemo, useState } from 'react';
// import { View } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';
// import { Colors, darkTheme, lightTheme,} from '../../utils';
// import VectorIcon from './VectoreIcons';
// import { useTranslation } from 'react-i18next';
// import { HomeTabStyle } from '../../styles';
// import { useSelector } from 'react-redux';

// function HomeDropDown(props) {
//   const [value, setValue] = useState('4');
//   const { t } = useTranslation();
//   const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
//   const Colors = isDarkMode ? darkTheme : lightTheme;
//   const HomeTabStyles = useMemo(() => HomeTabStyle(Colors), [Colors]);
//   // const HomeTabStyles = HomeTabStyle;
//   const data = [
//     { label: t("Today"), value: '1' },
//     { label: t("Yesterday"), value: '2' },
//     { label: t("This_week"), value: '3' },
//     { label: t("This_month"), value: '4' },
//     { label: t("This_year"), value: '5' },
//   ];

//   return (
//     <View style={HomeTabStyles.Dropdown_container}>
//     <Dropdown
//       style={HomeTabStyles.Dropdown_dropdown}
//       data={data}
//       labelField="label"
//       valueField="value"
//       placeholder="Select item"
//       placeholderStyle={HomeTabStyles.Dropdown_placeholderStyle}
//         selectedTextStyle={HomeTabStyles.Dropdown_selectedTextStyle}
//         value={value}
//         onChange={item => {
//           setValue(item.value);
//           console.log(item);
//         }}
//         renderRightIcon={() => (
//           <VectorIcon icon="MaterialIcons"  color={Colors.white_color} name="arrow-drop-down" size={35} />
//         )}
//     />
//   </View>
//   );
// }
// export default HomeDropDown;



// HomeDropDown.js
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors, darkTheme, lightTheme } from '../../utils';
import VectorIcon from './VectoreIcons';
import { useTranslation } from 'react-i18next';
import { HomeTabStyle } from '../../styles';
import { useSelector } from 'react-redux';

function HomeDropDown({ value, setValue, data, placeholder = "Select item" }) {
  const { t } = useTranslation();
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const HomeTabStyles = useMemo(() => HomeTabStyle(Colors), [Colors]);

  return (
    <View style={HomeTabStyles.Dropdown_container}>
      <Dropdown
        style={HomeTabStyles.Dropdown_dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={t(placeholder)}
        placeholderStyle={HomeTabStyles.Dropdown_placeholderStyle}
        selectedTextStyle={HomeTabStyles.Dropdown_selectedTextStyle}
        value={value}
        onChange={item => setValue(item.value)}
        renderRightIcon={() => (
          <VectorIcon icon="MaterialIcons" color={Colors.white_color} name="arrow-drop-down" size={35} />
        )}
      />
    </View>
  );
}

export default HomeDropDown;
