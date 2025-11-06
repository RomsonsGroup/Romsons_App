import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SH } from '../../utils';

function Spacing({ space=SH(10), horizontal=false, backgroundColor='transparent' }) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        spacerStyle: {
          [horizontal ? 'width' : 'height']: space,
          backgroundColor: backgroundColor || 'transparent',
        },
      }),
    [horizontal, space, backgroundColor],
  );
  return <View style={[styles.spacerStyle]} />;
};
export default Spacing;
