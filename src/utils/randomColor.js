import randomColor from 'randomcolor'
import {parseToRgb} from 'polished'

export function shouldTextBeDark (color) {
  try {
    const c = parseToRgb(color)
    const o = Math.round(((c.red * 299) + (c.green * 587) + (c.blue * 114)) / 1000)
    return o > 160
  } catch (e) {
    return true
  }
}

function * colorGenerator () {
  const hues = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink']
  let currentHues = [...hues]
  while (true) {
    if (currentHues.length === 0) {
      currentHues = hues
    }
    let idx = Math.floor(Math.random() * currentHues.length)
    let hue = currentHues[idx]
    currentHues.splice(idx, 1)
    yield randomColor({luminosity: 'light', hue: hue})
  }
}

const color = colorGenerator()

export default color
