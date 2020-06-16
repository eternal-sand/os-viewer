import React from 'react';
import { Box } from 'react-desktop/macOs';

export default props => {
  const { label, children } = props;
  return (
    <Box label={label} padding="10px 30px">
      {children}
    </Box>
  );
};
