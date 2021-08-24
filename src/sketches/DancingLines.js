import React, { Component } from "react"
import {loadableP5 as P5Wrapper} from '../components/loadable';

let dancingLine1
let dancingLine2
function isOdd(num) { return num % 2;}


function Sketch(p5) {

  // React.useRef

  // React.useEffect(() => {
  //   const canvasWidth = document.getElementById('layoutWrapper').offsetWidth
  // },[])
  
  p5.setup = () => {
    
    p5.createCanvas(1024,600)
    p5.background("#18020C")
    dancingLine1 = makeDancingLine(false, p5)
    dancingLine2 = makeDancingLine(true, p5)
  }

  p5.draw = () => {
    p5.background("#18020C")
    p5.translate(p5.width/2, p5.height/2)
    dancingLine1.display()
    dancingLine2.display()
  }
}

function makeDancingLine(flip = false, p5) {
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

