import { configure } from '@storybook/react'
import '@storybook/addon-console'

const req = require.context('../src/components', true, /story\.js$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)