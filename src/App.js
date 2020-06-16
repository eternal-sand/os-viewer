import React from 'react';
import Box from './components/Box/';
import View from './components/View/';
import AppBox from './components/AppBox/';
import defaultAppIcon from './assets/icon/def.svg';

function App() {
  return (
    <div className="app">
      <View>
        <Box>
          <AppBox src={defaultAppIcon} />
        </Box>
      </View>
    </div>
  );
}

export default App;
