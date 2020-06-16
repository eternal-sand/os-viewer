import React from 'react';
import { View } from 'react-desktop/macOs';

export default props => {
  const { children } = props;
  return (
    <View
      background={` #000 url() no-repeat center `}
      padding="20px"
      horizontalAlignment="center"
      verticalAlignment="center"
      width="100%"
      height="100%"
      {...props}
    >
      {children}
    </View>
  );
};
