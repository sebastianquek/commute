import React from 'react'
import {ThemeProvider} from 'styled-components'
import theme from './theme'

const ThemeProviderDecorator = (storyFn) => (
  <ThemeProvider theme={theme}>
    {storyFn()}
  </ThemeProvider>
)

export default ThemeProviderDecorator
