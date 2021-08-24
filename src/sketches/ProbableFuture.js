import React, { Component } from "react"
import {loadableP5 as P5Wrapper} from '../components/loadable';

let canvasWidth = 400
let canvasHeight = canvasWidth*1.5
let row
let grid
let amtOfHorizontalCircles = 20
let linesAmt = 50
let ySpacing = 10
let lineSpacing = canvasHeight/linesAmt
const interval = 500
let circleSizeMultiplier = 9 
const circleSizeProbability = 0.6   
let rotation = 6.7


function Sketch(p5) {

  const createCircle = (fillColor, x, y, maxRadius) => {
    let xpos = x
    let ypos = y
     return {
       xpos,
       ypos,
       display() {
         p5.noStroke()
         p5.fill(fillColor)
         p5.ellipse(xpos, ypos, maxRadius, maxRadius)
       },
       slide(amt) {
         if( ypos >  linesAmt * lineSpacing ) {
           maxRadius = randomCircleSize(circleSizeMultiplier, circleSizeProbability)
           ypos = lineSpacing
         }
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
    
    function randomCircleSize(multiplier, probabilityToBeSmall/* e.g. 0.7 */) {
      // Probability of size
      const r = p5.random(1)
      if( r < probabilityToBeSmall ) { 
        return r * multiplier/2
      }
      return r * multiplier
    }
    
    function createLine(arr, amt, startingPoint, y) {
      if( arr.length < amt) {
         arr.push(createCircle(randomLevelFromHsl(20, 80, 20, 50), startingPoint,  y, randomCircleSize(circleSizeMultiplier, circleSizeProbability) ))
         createLine(arr, amt, startingPoint += p5.width/amtOfHorizontalCircles, y)
      }
      return arr
    }
    
    function createGrid(arr, linesAmt, y) {
      if( arr.length < linesAmt) {
        arr.push(createLine([], amtOfHorizontalCircles, 0, y))
        createGrid(arr, linesAmt, y += lineSpacing)} 
      return arr
    }
    
    function slideRow() {
      // shifts heights, and moves y's to begginig of they are higher tha Height
      grid.forEach( (line) => {
        line.forEach( x => {
        x.slide(ySpacing)
        })
      })
    }
    

  p5.setup = () => {
    p5.createCanvas(canvasWidth, canvasHeight, /* p5.WEBGL */)
    p5.smooth() 
    p5.background("#140c28")
    grid = createGrid([], linesAmt, lineSpacing, p5)
    setInterval(slideRow, interval)    
  }

  p5.draw = () => {
    // p5.rotateX(rotation)
    p5.translate(lineSpacing, -lineSpacing)
    p5.background("#140c28")
    grid.forEach( row => {
      row.forEach( x => {
        x.display()
      })
    })
  }
}


export default class ProbableFuture extends Component{
  render() {
    return <P5Wrapper sketch={Sketch} />
  }
}


