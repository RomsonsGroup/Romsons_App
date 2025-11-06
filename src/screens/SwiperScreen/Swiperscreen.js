import React, { useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar,  } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import images from '../../index';
import { SwiperStyle } from '../../styles';
import { Spacing, VectorIcon } from '../../components';
import { darkTheme,lightTheme, SH } from '../../utils';
import { useTranslation } from "react-i18next";
import { RouteName } from '../../routes';
import { useSelector } from 'react-redux';

const IntroSlider = (props) => {
  const { navigation } = props;
  const sliderRef = React.useRef(null);
  const slides = [
    // {
    //   key: 1,
    //   title: 'Title_1',
    //   text: 'Description_1',
    //   image: images.Image_2,
    // },
    // {
    //   key: 2,
    //   title: 'Title_2',
    //   text: 'Description_2',
    //   image: images.Image_1,
    // },
    // {
    //   key: 3,
    //   title: 'Title_3',
    //   text: 'Description_3',
    //   image: images.Image_6,
    // },
    {
      key: 4,
      title: 'Title_4',
      text: 'Description_4',
      image: images.Image_4,
    },
    // {
    //   key: 5,
    //   title: 'Title_5',
    //   text: 'Description_5',
    //   image: images.Image_5,
    // },
    // {
    //   key: 6,
    //   title: 'Title_6',
    //   text: 'Description_6',
    //   image: images.Image_3,
    // }
  ];

  const { t } = useTranslation();
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const SwiperStyles = useMemo(() => SwiperStyle(Colors), [Colors]);
  // const SwiperStyles = SwiperStyle;
  const _renderItem = ({ item, index }) => {
    const isLastSlide = index === slides.length - 1;
    return (
      <View style={SwiperStyles.Container}>
        <Spacing space={0} />
        <View style={SwiperStyles.TopContainer}>
          <Image source={item.image} resizeMode='center' style={SwiperStyles.Image} />
        </View>
        <View style={SwiperStyles.BottomContainer}>
          <View style={SwiperStyles.BottomContainertitleView}>
            <Text style={SwiperStyles.BottomContainertitle}>{t(item.title)}</Text>
            <Text style={SwiperStyles.BottomContainerText}>{t(item.text)}</Text>
          </View>
        </View>
      </View>
    );
  };

  const _onDone = () => {
  };
  const _renderPagination = (activeIndex) => {
    return (
      <View style={{ position: 'absolute', bottom: SH(35), left: SH(20), right: 0, flexDirection: 'row', justifyContent: 'center' }}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              SwiperStyles.DotStyle,
              i === activeIndex ? SwiperStyles.activeDot : SwiperStyles.Inactive
            ]}
          />
        ))}
      </View>
    );
  };
  return (
    <>
      <StatusBar backgroundColor={Colors.theme_background} />
      <View style={SwiperStyles.Langauge_Icon} >
      <TouchableOpacity onPress={() => navigation.navigate(RouteName.LANGUAGESCREEN)}>
        <VectorIcon icon="Entypo" color={Colors.theme_background} name="language"  size={30} style={SwiperStyles.Langauge_Icon_1}  />
        </TouchableOpacity>
      </View>
      <AppIntroSlider
        renderItem={_renderItem}
        data={slides}
        onDone={_onDone}
        showNextButton={false}
        showDoneButton={false}
        renderPagination={_renderPagination}
        ref={sliderRef}
      />
      <View style={SwiperStyles.container}>
        <TouchableOpacity style={SwiperStyles.signInButton} onPress={() => { navigation.navigate(RouteName.LOGIN_SCREEN) }}>
          <Text style={SwiperStyles.signInButtonText}>{t("Sign_In")}</Text>
        </TouchableOpacity>
        <Spacing space={20} />
        <TouchableOpacity onPress={() => { navigation.navigate(RouteName.REGISTER_SCREEN) }}>
          {/* <Text style={SwiperStyles.linkText}>{t("Do_Not_account")}<Text style={SwiperStyles.link}>{t("Sign_Up")}</Text></Text> */}
        </TouchableOpacity>
        <Spacing space={10} />
        {/* <TouchableOpacity >
          <Text style={SwiperStyles.linkText}>{t("Have_trouble_signing_in")}<Text style={SwiperStyles.link}>{t("Contact_us")}</Text></Text>
        </TouchableOpacity> */}
        <Spacing space={40} />
      </View>
    </>
  );
};

export default IntroSlider;
