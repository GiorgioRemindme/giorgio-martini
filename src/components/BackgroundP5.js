import React, { Component } from "react"
import {loadableP5 as P5Wrapper} from './loadable'
import { getRandomArbitrary } from "../helpers"

let darkPurple = '#352D39'
let pink = '#FF6978'
const between = (x, min, max) =>  x >= min && x <= max

function isOverGridPoint (mouseX, mouseY, x, y, range = 20) {
  return (between(mouseX, x-range, x+range) && between(mouseY, y-range, y+range))
    ? true
    : false
}

// https://coolors.co/ff6978-fffcf9-b1ede8-6d435a-352d39
function Sketch(p5) {
  const windowResized = (p5) => p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
  const lineThresh = 80
  let color = pink
  let spots = []
  let cols = 20
  let canvas
  let rows

  function Spot(p5, x, y) {
    let _x = x
    let _y = y
    let _r = 2
    let hovered = false

    function display() {
      p5.noStroke()
      p5.fill(color)
      p5.ellipse(_x, _y, _r)
    }

    function fade() {
      if (_r >= 0) {
        _r -= 1
      } else {
        hovered = false
      }
    }

    function flash() {
        _r = 20
        hovered = true
    }

    function randomWalk() {
      _x += getRandomArbitrary(-1,1)
      _y += getRandomArbitrary(-1,1)
    }

    function values () {
      return {
        _x,
        _y,
        hovered,
      }
    }

    return {
      display,
      flash,
      randomWalk,
      values,
      fade,
    }
  }

  p5.setup = () => {
    p5.frameRate(24)
    canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight/* , p5.WEBGL */)
    p5.background(darkPurple);
    canvas.position(0, 0).style('z-index', '-1')
    
    cols = p5.map(p5.width, 0, 2000 , 2, 20)
    const gridSize  = p5.width/cols
    rows = p5.height/gridSize

    for (let x = 0; x < cols+1; x++) {
      for (let y = 0; y < rows+1; y++) {
        spots.push(Spot(p5, x * gridSize, y * gridSize))
      }
    }
  }

  p5.draw = () => {
    p5.background(darkPurple)
    p5.strokeWeight(1)
    spots.forEach((s, i) => {
      let { _x, _y, hovered } = s.values()
      s.randomWalk()
      s.display()
      if (i !== 0 && isOverGridPoint(p5.mouseX, p5.mouseY, _x, _y)) s.flash() 
      hovered && s.fade()

      spots.forEach(ref => {
        // set this depending of screen size
        if (between(_x, ref.values()._x-lineThresh, ref.values()._x+lineThresh) && between(_y, ref.values()._y-lineThresh, ref.values()._y+lineThresh)) {
          p5.stroke(color)
          p5.strokeWeight(1)
          p5.line(_x, _y, ref.values()._x, ref.values()._y)
        }
      })
    })
  }

  // p5.mouseWheel = (event) => {
  //   console.log(event.delta);
  //   // uncomment to block page scrolling
  //   return false;
  // }

}

export default class BackgroundP5 extends Component{

  render() {
    return <P5Wrapper sketch={Sketch} />
  }
}