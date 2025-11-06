import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground } from "react-native";
import { LanguageStyle } from '../../styles';
import { darkTheme, lightTheme, SF, SH } from "../../utils";
import { Button, Spacing, VectorIcon } from "../../components";
import Translation from '../../Language/i18n';
import { useTranslation } from 'react-i18next';
import { RouteName } from '../../routes';
import { useSelector } from 'react-redux';
import images from '../../index';
const LanguageScreen = (props) => {
  const { t } = useTranslation();
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  // const LanguageStyles = useMemo(() => LanguageStyle(Colors), [Colors]);
  const LanguageStyles = LanguageStyle;
  const { navigation } = props;
  const { i18n } = useTranslation();
  const [selectedItems, setSelectedItems] = useState('en');
  const data = [
    {
      id: 'en',
      title: Translation('lang_eng'),
      icon: <VectorIcon icon="AntDesign" name="checkcircleo" size={SF(25)} color={Colors.theme_background} />,
      iconActive: <VectorIcon icon="AntDesign" name="checkcircle" size={SF(25)} color={Colors.theme_background} />
    },
    {
      id: 'ara',
      title: Translation('lang_ara'),
      icon: <VectorIcon icon="AntDesign" name="checkcircleo" size={SF(25)} color={Colors.theme_background} />,
      iconActive: <VectorIcon icon="AntDesign" name="checkcircle" size={SF(25)} color={Colors.theme_background} />
    },
    {
      id: 'Spa',
      title: Translation('lang_Spa'),
      icon: <VectorIcon icon="AntDesign" name="checkcircleo" size={SF(25)} color={Colors.theme_background} />,
      iconActive: <VectorIcon icon="AntDesign" name="checkcircle" size={SF(25)} color={Colors.theme_background} />
    },
    {
      id: 'Fr',
      title: Translation('lang_Fr'),
      icon: <VectorIcon icon="AntDesign" name="checkcircleo" size={SF(25)} color={Colors.theme_background} />,
      iconActive: <VectorIcon icon="AntDesign" name="checkcircle" size={SF(25)} color={Colors.theme_background} />
    }
  ];


  const changeLanguage = data => {
    console.log('value', data)
    i18n
      .changeLanguage(data)
      .then(() => { })
      .catch(err => console.log(err));
    {
      { }
    }
  };
  return (
    <ImageBackground source={images.Langauge_1} style={LanguageStyles.Container}>
      <View style={LanguageStyles.MainPadding}>
        <FlatList
          numColumns={2}
          style={LanguageStyles.WidthFull}
          keyExtractor={item => item.id}
          data={data}
          renderItem={({ item }) =>
            <View style={[LanguageStyles.LanguageMainBoxView]}>
              <TouchableOpacity onPress={() => setSelectedItems(item?.id)} style={[LanguageStyles.BoxView]}>
                <View>
                  {selectedItems == item.id ? item?.iconActive : item?.icon}
                </View>
                <Spacing space={SH(10)} />
                <Text style={[LanguageStyles.text]}>{item.title}</Text>
              </TouchableOpacity>
            </View>}
        />
        <Spacing space={SH(20)} />
        <View style={[LanguageStyles.PaddingHorizontal]}>
        <Button title={Translation('Confirm')} onPress={() => {
          changeLanguage(selectedItems); navigation.navigate(RouteName.SWIPER_SCREEN)
        }} />
        </View>
      </View>

    </ImageBackground>
  );
};

export default LanguageScreen;
