import React, { Component } from "react"
import {loadableP5 as P5Wrapper} from '../components/loadable';
import { randomFromRange } from '../utils'

let canvasWidth = 400
let canvasHeight = canvasWidth*1.5
let row
let grid
let amtOfHorizontalCircles = 40
let linesAmt = 50
let ySpacing = 10
let lineSpacing = canvasHeight/linesAmt
const interval = 500
let minCircleSize = 5
const maxCircleSize = 10
let rotation = 7
let _background = `hsl(200,52%,10%)`
let cols = 30
let rows = 30

function Sketch(p5) {
  let background = p5.color(_background)

  const circle = (fillColor, x, y, maxRadius) => {
    let xpos = x
    let ypos = y
     return {
       xpos,
       ypos,
       display() {
         p5.noStroke()
         p5.fill(fillColor)
         p5.ellipse(xpos/* -p5.width/2 */ , ypos/* -p5.height/2.5 */ , maxRadius, maxRadius)
       },
       slide(amt) {
        //  if( ypos >  linesAmt * lineSpacing ) {
        //    maxRadius = randomFromRange(minCircleSize, maxCircleSize)
        //    ypos = lineSpacing
        //  }
         ypos += amt
       },
     }
    }

    function randomLevelFromHsl(h, s, min, max) {
      // Probability of color being more lit
      const r = p5.random(1)
      if( r > 0.7 ) { 
        return `hsl(${h}, ${s}%, ${p5.random(min, max).toFixed()}%)`   
      }
      return `hsl(${h}, ${s}%, ${p5.random(min/2, max/2).toFixed()}%)` 
    }

    // function createLine(arr, amt, startingPoint, y) {
    //   if( arr.length < amt) {
    //      arr.push(circle(randomLevelFromHsl(220, 100, 50, 50), startingPoint,  y, randomFromRange(minCircleSize, maxCircleSize) ))
    //      createLine(arr, amt, startingPoint += p5.width/amtOfHorizontalCircles, y)
    //   }
    //   return arr
    // }
    
    // function createGrid(arr, linesAmt, y) {
    //   if( arr.length < linesAmt) {
    //     arr.push(createLine([], amtOfHorizontalCircles, 0, y))
    //     createGrid(arr, linesAmt, y += lineSpacing)} 
    //   return arr
    // }

    function _grid(cols, rows) {
      let grid = []
      for (let x = 0; x < cols+1; x++) {
        for (let y = 0; y < rows+1; y++) {
          grid.push(circle(randomLevelFromHsl(220, 100, 50, 50), x * p5.width/cols,  y * p5.height/rows, randomFromRange(minCircleSize, maxCircleSize) ))
          // grid.push(x * p5.width/20, y * p5.height/10)
        }
      }
      return  grid
    }

    function slideRow() {
      grid.forEach( circle => {
        circle.slide(10)
      })
    }

  p5.setup = () => {
    p5.createCanvas(canvasWidth, canvasHeight/* ,  p5.WEBGL */)
    p5.smooth() 
    p5.background(background)
    grid = _grid(cols,rows)
  }

  p5.draw = () => {
    // p5.rotateX(rotation)
    p5.frameRate(1)
    p5.translate(lineSpacing, -lineSpacing, p5.height/3)
    p5.background(background)
    grid.forEach( x => x.display())
    slideRow(grid)
  }
}

export default class ProbableFuture extends Component{
  render() {
    return <P5Wrapper sketch={Sketch} />
  }
}


