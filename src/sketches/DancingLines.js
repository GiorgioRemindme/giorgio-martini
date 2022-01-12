import React, { Component } from "react"
import {loadableP5 as P5Wrapper} from '../components/loadable';

let dancingLine1
let dancingLine2
let worm1
let worm2

function isOdd(num) { // TODO move to utils
  return num % 2;
}

function Sketch(p5) {
  

  p5.setup = () => {
    let wormOpts1 = {color: 255, weight: p5.width/25, length: p5.height/8}
    let wormOpts2 = {color: 255, weight: p5.width/5, length: p5.height/20}
  
    p5.createCanvas(800,500)
    p5.background("#18020C")
    worm1 = worm(wormOpts1)
    worm2 = worm(wormOpts2)
    dancingLine1 = dancingLine(false, p5)
    dancingLine2 = dancingLine(true, p5)
  }

  p5.draw = () => {
    p5.background("#18020C")
    p5.translate(p5.width/2, p5.height/2)
    worm1.display()
    worm2.display()
    dancingLine1.display()
    dancingLine2.display()
  }

  function worm({color, weight, length}) {
    console.log({color, weight, length})
    let history = []
    let v1 = p5.createVector(0,0)
    let x1Angle = Math.random() * 10
    let y1Angle = Math.random() * 10
    let x1AngleOff = 0
    let y1AngleOff = 0
    let r1 = p5.width / 3
    let linesAmt = length
    let xoff = 0.0
    
    function display() {
      xoff = xoff + 0.01
      let n = p5.noise(xoff)
      let mappedFill = p5.map(n, 0, 1, -250, 200)

      if (history.length > linesAmt) history.splice(0,1)

      v1.set(r1 * p5.sin(x1Angle), r1 * p5.sin(y1Angle))
      history.push([v1.x, v1.y]) 
      p5.stroke(color) 
      p5.strokeWeight(weight)
      p5.strokeCap(p5.PROJECT)

      p5.beginShape()
        history.forEach((linea, i) => {
          p5.curveVertex(linea[0], linea[1])
          })
      p5.endShape()

      x1Angle += x1AngleOff + 0.010
      y1Angle += y1AngleOff + 0.011
    }

    return {
      display,
    }

  }
}


function dancingLine(flip = false, p5) {
  let history = []
  let linesAmt =60
  let col = 255
  let v1 = p5.createVector(0,0)
  let v2 = p5.createVector(0,0)
  
  let x1Angle = flip ? 90 : 0
  let y1Angle = flip ? 90 : 0
  let x2Angle = flip ? 90 : 0
  let y2Angle = flip ? 90 : 0

  let x1AngleOff = 0.03
  let y1AngleOff = 0.002
  let x2AngleOff = 0.015
  let y2AngleOff = 0.02  
  
  let r1 = flip ? 250 : 300 
  let r2 = flip ? 250 : 300 

  function display() {
    v1.set(r1 * p5.sin(x1Angle), r1 * p5.sin(y1Angle))
    v2.set(r2 * p5.sin(x2Angle), r2 * p5.sin(y2Angle))

    history.push([v1.x, v1.y, v2.x, v2.y]) 
    
    if (history.length > linesAmt) history.splice(0,1)
    
    col = flip
      ? "#E5FFDE"
      : "#634B66"

    history.forEach((linea, i) => {
      p5.stroke(col) 
      p5.strokeWeight(2)
      p5.line(linea[0],linea[1],linea[2],linea[3])
    })

    x1Angle += flip ? x1AngleOff : x1AngleOff + 0.01
    y1Angle += flip ? y1AngleOff : y1AngleOff + 0.01
    x2Angle += flip ? x2AngleOff : x2AngleOff + 0.01
    y2Angle += flip ? y2AngleOff : y2AngleOff + 0.01
  }

  return {
    display,
  }
}

export default class DancingLines extends Component{
  render() {
    return <P5Wrapper sketch={Sketch} />
  }
}
