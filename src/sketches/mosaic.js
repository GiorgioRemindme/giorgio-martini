import React, { Component } from "react"
import {loadableP5 as P5Wrapper} from '../components/loadable';

let frame
let canvas 
let img
let uploadImg
let gridAmount = 10
let matrix = []
let xSpacing
let ySpacing
let w
let h
let input
let colors
let dotsSize
let palette = [
  '#227c9d',
  '#17c3b2',
  '#ffcb77',
  '#fef9ef',
  '#fe6d73'
]

function Sketch(p5) {

  function getColors(items) {
    let _items = [...items]
    let randomColId = Math.floor(Math.random() * _items.length)
    _items.splice(randomColId, 1)
  
    return {
      bg: items[randomColId],
      colors: _items
    }
  }
  
  function getRandomFromArray(items) {
    let result = items[Math.floor(Math.random() * items.length)]
    return result
  }
  
  
  function randomDeg(_x, _y, w, h) {
    let randomNumber = (Math.random() * 10).toFixed(1) // make util 
    if (randomNumber >= 0 && randomNumber < 2.5) {
      return 0
    } else if (randomNumber >= 2.5 && randomNumber < 5) {
      return p5.HALF_PI
    } else if (randomNumber >= 5 && randomNumber < 7.5) {
      return p5.PI
    } else {
      return p5.TWO_PI
    }
  }
  
  function randomSign(w,h) {
    let randomNumber = (Math.random() * 10).toFixed(1)
  
    if (randomNumber >= 0 && randomNumber < 3.3) {
      let col1 = getRandomFromArray(colors.colors)
      p5.fill(col1)
      p5.arc(0, 0, w, h, 0, p5.HALF_PI)
  
      p5.fill(getRandomFromArray(colors.colors))
      p5.ellipse(0,0,dotsSize)
    } else if (randomNumber >= 3.3 && randomNumber < 6.6) {
      let col2 = getRandomFromArray(colors.colors)
      p5.fill(col2)
      p5.arc(0, 0, w, h, 0, p5.PI)
  
      p5.fill(getRandomFromArray(colors.colors))
      p5.ellipse(0,0,dotsSize)
    } else if (randomNumber >= 6.6 && randomNumber <= 10) {
      let col3 = getRandomFromArray(colors.colors)
      p5.fill(col3)
      p5.arc(0, 0, w, h, 0, p5.PI)
      let col4 = getRandomFromArray(colors.colors)
      p5.fill(col4)
      p5.arc(0, 0, w, h, p5.PI, p5.PI + p5.HALF_PI)
  
      p5.fill(getRandomFromArray(colors.colors))
      p5.ellipse(0,0,dotsSize)
    } 
  }
  
  function Spot(x, y, w, h) {
    let _x = x
    let _y = y
  
    function display(xoff, yoff) {
      p5.noStroke()
      p5.push()
        p5.translate(_x+xoff/2,_y+yoff/2)
        let r = randomDeg()
        p5.rotate(r)
        randomSign(w,h)
        p5.translate(0,0)
      p5.pop()
    }
  
    return {
      display,
    }
  }

  p5.setup = () => {
    canvas = p5.createCanvas(600,600)
  }

  p5.draw = () => {
    p5.frameCount > 0
    ? p5.frameRate(5)
    : p5.frameRate(1)

    canvas.mouseOver(() => p5.frameRate(0))
    canvas.mouseOut(() => p5.frameRate(10))

  gridAmount = Math.ceil(p5.random(1,15))
  w = p5.width/gridAmount
  h = p5.height/gridAmount
  xSpacing = p5.width/gridAmount
  ySpacing = p5.height/gridAmount
  colors = getColors(palette)
  dotsSize = p5.random(p5.width/80, p5.width/18)

  for (let i = 0; i < gridAmount; i++) {
    for (let j = 0; j < gridAmount; j++) {
      matrix.push([
        Spot(i*xSpacing,j*ySpacing, xSpacing, ySpacing)
      ])
    }
  }

  p5.background(colors.bg)
  matrix.forEach((cell, i) => {
    p5.noStroke()
    cell[0].display(xSpacing, ySpacing)
  })  
  matrix = []
  }
}


export default class Mosaic extends Component{
  render() {
    return <P5Wrapper sketch={Sketch} />
  }
}
