import React, { useMemo, useState } from "react";
import { Rating } from 'react-native-ratings';
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../utils";
import { ReviewsStyle } from "../../styles";

function RatingScreen(props) {
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const ReviewsStyles = useMemo(() => ReviewsStyle(Colors), [Colors]);
  // const ReviewsStyles =  ReviewsStyle;
  const { type, ratingColor, ratingBackgroundColor, ratingCount = 5,  startingValue = ratingCount, tintColor, imageSize, isDisabled, style } = props;
  return (
    <Rating
      type={type}
      ratingColor={ratingColor}
      ratingBackgroundColor={ratingBackgroundColor}
      ratingCount={ratingCount}
      tintColor={isDarkMode ? "black" : null}
      imageSize={imageSize}
      startingValue={startingValue}
      isDisabled={isDisabled}
      style={style}
    />
  );
};
export default RatingScreen;