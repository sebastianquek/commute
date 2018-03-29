import randomColor from 'randomcolor'
import chroma from 'chroma-js'

export function shouldTextBeDark (color) {
  try {
    const c = chroma(color).rgb()
    const o = Math.round(((c[0] * 299) + (c[1] * 587) + (c[2] * 114)) / 1000)
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

    let foundColor = false
    let color
    let count = 0
    while (!foundColor) {
      // Use normal random colors after 50 attempts to get luminous ones
      color = ++count > 50 ? randomColor({hue: hue}) : randomColor({luminosity: 'light', hue: hue})
      const hcl = chroma(color).hcl()
      foundColor = count >= 100 || // Give up after 100 attempts
        (hcl[0] >= 0 && hcl[0] <= 360 &&
        hcl[1] >= 20 && hcl[1] <= 100 &&
        hcl[2] >= 50 && hcl[2] <= 80)
    }

    yield color
  }
}

const color = colorGenerator()

export default color
