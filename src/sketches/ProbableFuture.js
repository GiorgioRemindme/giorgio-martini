import React, { Component } from "react"
import { loadableP5 as P5Wrapper } from '../components/loadable';
import { randomFromRange } from '../utils'

let canvasWidth = 400
let canvasHeight = canvasWidth * 1.5
let grid
let amtOfHorizontalCircles = 40
let minCircleSize = 5
const maxCircleSize = 10
let rotation = 7
let _background = '#1a1822'
let cols = 30
let rows = 30

function Sketch(p5) {
  let background = p5.color(_background)

  p5.setup = () => {
    p5.createCanvas(canvasWidth, canvasHeight, p5.WEBGL)
    p5.smooth()
    p5.background(background)
    grid = _grid(cols, rows)
  }

  p5.draw = () => {
    p5.rotateX(rotation)
    p5.frameRate(20)
    p5.translate(0, -90, p5.height / 3.5) // fix magic number
    p5.background(background)
    grid.forEach(x => x.display())
    slideRow(grid)
  }

  const circle = (fillColor, x, y, size) => {
    let xpos = x
    let ypos = y
    return {
      xpos,
      ypos,
      display() {
        p5.noStroke()
        p5.fill(fillColor)
        p5.ellipse(xpos - p5.width / 2, ypos - p5.height / 2.5, size, size)
      },
      slide(amt) {
        if (ypos > p5.height) {
          size = randomFromRange(minCircleSize, maxCircleSize)
          ypos = p5.height / rows - p5.height / rows
        }
        ypos += amt
      },
    }
  }

  function randomLevelFromHsl(h, s, min, max) {
    let mult = Math.random() > 0.7 ? 1 : 0.5
    return `hsl(${h}, ${s}%, ${p5.random(min * mult, max * mult).toFixed()}%)`
  }

  function _grid(cols, rows) {
    let grid = []
    for (let x = 0; x < cols + 1; x++) {
      for (let y = 0; y < rows + 1; y++) {
        let color = randomLevelFromHsl(230, 10, 10, 50)
        let size = randomFromRange(minCircleSize, maxCircleSize)
        grid.push(circle(color, x * p5.width / cols, y * p5.height / rows, size))
      }
    }
    return grid
  }

  function slideRow() {
    grid.forEach(circle => {
      circle.slide(p5.height / rows)
    })
  }
}

export default class ProbableFuture extends Component {
  render() {
    return <P5Wrapper sketch={Sketch} />
  }
}
