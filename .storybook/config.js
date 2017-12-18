import { configure } from '@storybook/react'
import '@storybook/addon-console'

const req = require.context('../src/storybook', true, /stories\.js$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)