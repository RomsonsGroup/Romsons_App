import React, { useMemo, useState } from "react";
import { View, Text,  TouchableOpacity } from "react-native";
import { Button, Input, Spacing } from '../../components';
import { RouteName } from "../../routes";
import { useTranslation } from "react-i18next";
import RatingScreen from "../../components/commonComponents/Rating";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../utils";
import { ReviewsStyle } from "../../styles";
const ReviewsScreen = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState('One');
  const [Title, setTitle] = useState('');
  const handleFeedback = (option) => {
    setSelectedOption(option);
  };
  const onoknutton = () => {
    navigation.navigate(RouteName.HOME_SCREEN)
  }
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
    const ReviewsStyles = useMemo(() => ReviewsStyle(Colors), [Colors]);
  // const ReviewsStyles =  ReviewsStyle;
  return (
    <View style={ReviewsStyles.container}>
      <Spacing space={20} />
      <View  style={ReviewsStyles.PaddingHorizontal}>
      <Text style={ReviewsStyles.question}>{t("ReviewsScreen_1")}</Text>
      </View>
      <View style={ReviewsStyles.header}>
       
       
        <View style={ReviewsStyles.rating}>
          <RatingScreen  />
        </View>
      </View>
      <View style={ReviewsStyles.feedback}>
        <Text style={ReviewsStyles.question}>{t("ReviewsScreen_2")}</Text>
        <View style={ReviewsStyles.options}>
          <TouchableOpacity
            onPress={() => handleFeedback('One')}
            style={[
              ReviewsStyles.option,
              selectedOption === 'One' ? ReviewsStyles.selectedOption : null,
            ]}
          >
            <Text style={[
              ReviewsStyles.optionText,
              selectedOption === 'One' ? ReviewsStyles.selectedoptionText : null,
            ]} >{t("Services_6")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleFeedback('Two')}
            style={[
              ReviewsStyles.option,
              selectedOption === 'Two' ? ReviewsStyles.selectedOption : null,
            ]}
          >
            <Text style={[
              ReviewsStyles.optionText,
              selectedOption === 'Two' ? ReviewsStyles.selectedoptionText : null,
            ]}>{t("Services_4")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleFeedback('Three')}
            style={[
              ReviewsStyles.option,
              selectedOption === 'Three' ? ReviewsStyles.selectedOption : null,
            ]}
          >
            <Text style={[
              ReviewsStyles.optionText,
              selectedOption === 'Three' ? ReviewsStyles.selectedoptionText : null,
            ]}>{t("Services_3")}</Text>
          </TouchableOpacity>
        </View>
        <View style={ReviewsStyles.options}>
          <TouchableOpacity
            onPress={() => handleFeedback('Four')}
            style={[
              ReviewsStyles.option,
              selectedOption === 'Four' ? ReviewsStyles.selectedOption : null,
            ]}
          >
            <Text style={[
              ReviewsStyles.optionText,
              selectedOption === 'Four' ? ReviewsStyles.selectedoptionText : null,
            ]} >{t("Services_1")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleFeedback('Five')}
            style={[
              ReviewsStyles.option,
              selectedOption === 'Five' ? ReviewsStyles.selectedOption : null,
            ]}
          >
            <Text style={[
              ReviewsStyles.optionText,
              selectedOption === 'Five' ? ReviewsStyles.selectedoptionText : null,
            ]}>{t("Services_2")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleFeedback('Six')}
            style={[
              ReviewsStyles.option,
              selectedOption === 'Six' ? ReviewsStyles.selectedOption : null,
            ]}
          >
            <Text style={[
              ReviewsStyles.optionText,
              selectedOption === 'Six' ? ReviewsStyles.selectedoptionText : null,
            ]}>{t("Services_5")}</Text>
          </TouchableOpacity>
        </View>
        <Input
            title={t("Comment")}
            placeholder={t("Type_text_hear")}
            onChangeText={(value) => setTitle(value)}
            value={Title}
            numberOfLines={7}
            textAlignVertical='top'
          />
        <Spacing space={20} />
        <Button title={("Submit")} onPress={() => onoknutton()} />
      </View>
    </View>
  );
};
export default ReviewsScreen;


