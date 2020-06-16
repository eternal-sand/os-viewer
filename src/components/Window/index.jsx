import React from 'react'
import { Window, TitleBar, Text } from 'react-desktop/macOs';
export default props => {
  const { title } = props
  return <Window
    chrome
    width='300px'
    height='300px'
    padding='10px'
      <TitleBar title={title} controls />
    </Window>
    
}
