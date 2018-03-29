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
  const colors = ['#8dd3c7', '#bc80bd', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5']
  let currentColors = [...colors]

  let i = 0
  while (true) {
    if (currentColors.length === 0) {
      currentColors = [...colors]
      if (++i === 3) i = 0
      if (i > 0) {
        const delta = i * 6
        currentColors = currentColors.map(c => chroma(c).set('lch.c', `+${delta}`).hex())
      }
    }

    let idx = Math.floor(Math.random() * currentColors.length)
    let hue = currentColors[idx]
    currentColors.splice(idx, 1)

    yield hue
  }
}

const color = colorGenerator()

export default color
