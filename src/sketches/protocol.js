import React, { Component } from "react"
import {loadableP5 as P5Wrapper} from '../components/loadable';

let img
let c1
let c2
let c1Opts
let c2Opts
let color = '#fff'

function evenRandomNumber(amt) { // add to utils
  return Math.ceil( Math.random() * amt / 2 ) * 2
}

function Sketch(p5) {
  // function squares(opts) {
  //   let squaresRadius 
  //   let angle
  //   let amt
  //   // if size is small use fewe squares 2
  //   function display() {
  //     squaresRadius = p5.random(p5.width/8, opts.squareSize)
  //     console.log("squaresRadius: ", squaresRadius);
  //     amt = Math.ceil(p5.random(opts.amt))
  //     if (squaresRadius < 160) amt = 2 // make it into a p5.map
      
  //     angle = (360/amt)/4
  //     if(opts.strokeWeight) {
  //       opts.strokeWeight && p5.noFill() 
  //       opts.strokeWeight && p5.strokeWeight(p5.random(2, opts.strokeWeight)) 
  //       opts.strokeWeight && p5.stroke(color)  
  //     }
      
  //     !opts.strokeWeight && p5.fill(color)
  //     !opts.strokeWeight && p5.noStroke()
  //     p5.angleMode(p5.DEGREES)
      

  //     for (let i = 0; i < amt; i++) {
  //       p5.push()
  //       p5.rotate(angle * i)
  //       p5.rectMode(p5.CENTER)
  //       p5.rect(0, 0, squaresRadius, squaresRadius)
  //       p5.pop()
  //     }    
  //   }
  
  //   return {
  //     display
  //   }
  // }

  function circles(opts) {
    let r 
    let angle
    let introAngle
    let outroAngle
    let amt
    let posArray = []
    let introPosArray = []
    let outroPosArray = []
    let animation = 0
    let initialAnimation = animation
    let maxAnimation = 150
    let resting = 0
    let initialResting = 40
    let fade = 80

   
    function generatePositions() {
      p5.angleMode(p5.DEGREES)
      r = p5.random(5, opts.maxCircleSize) // use native
      amt = evenRandomNumber(opts.amt)
      angle = 360 / amt
      // these are some ugly magic numbers... try to fix the jumping between intro and outro other way...
      introAngle = 362.5 / amt
      outroAngle = 364.5 / amt
      let cropRadius = p5.random(opts.cropRadius[0], opts.cropRadius[1])

      if(opts.strokeWeight === undefined || opts.strokeWeight.length == 0) {
        // set fill no stroke
        p5.fill(color)
        p5.noStroke()
      } else {
        // set nofill and stroke
        const [strokeMin, strokeMax] = opts.strokeWeight
        opts.strokeWeight && p5.noFill() 
        opts.strokeWeight && p5.strokeWeight(p5.random(strokeMin, strokeMax)) 
        opts.strokeWeight && p5.stroke(color)  
      } 

      // we should just use one posArray, but we are doing a hack
      // of scaling the rotation so there is no jumping between intro and outro
      posArray = [] // reseting array b4 filling it again...
      for (let i = 0; i < amt; i++) {
        posArray.push([angle * i, cropRadius])
      }    
      introPosArray = []
      for (let i = 0; i < amt; i++) {
        introPosArray.push([introAngle * i, cropRadius])
      }    
      outroPosArray = []
      for (let i = 0; i < amt; i++) {
        outroPosArray.push([outroAngle * i, cropRadius])
      }    
    }

    function display() {
      
      // Intro...
      if (animation < maxAnimation) {
        animation++
        introPosArray.forEach((pos, i) => {
          let subtractor = pos[0] / animation
          let rotation = pos[0] - subtractor
          
          p5.push()
            p5.rotate(rotation)
            p5.translate(pos[1], 0)
            p5.ellipse(0, 0, r, r)
          p5.pop()
        })
      } else if (animation === maxAnimation && resting <= initialResting ) {
        // Resting
        resting ++
        posArray.forEach((pos, i) => {
          p5.push()
            p5.rotate(pos[0])
            p5.translate(pos[1], 0)
            p5.ellipse(0, 0, r, r)
          p5.pop()
        })   
      } else if (resting >= initialResting && fade > 1 ) {
      // Outro
        fade--
        outroPosArray.forEach((pos, i) => {
          let outroRotation = pos[0] - (pos[0] / fade)
          p5.push()
            p5.rotate(-outroRotation)
            p5.translate(pos[1], 0)
            p5.ellipse(0, 0, r, r)
          p5.pop()
        })        
      } else if (fade === 1) {
        // Reset values to start again...
        generatePositions()
        fade = 80
        animation = 0
        resting = 0        
      }
    }    
    return {
      generatePositions,
      display
    }
  }

  p5.setup = () => {
    p5.createCanvas(600, 600)
    p5.translate(p5.width / 2, p5.height / 2) 

    c1Opts = {
      amt: 8,
      maxCircleSize: p5.width/2,
      cropRadius: [p5.width/8, p5.width/4],
    }
    c2Opts = {
      amt: 8,
      maxCircleSize: p5.width/4,
      cropRadius: [p5.width/8, p5.width/3],
      strokeWeight: [10, 15]
    }
    let squaresOpts = {
      amt: 4,
      squareSize: p5.width/2,
      strokeWeight: 10,
    }
    
    c1 = circles(c1Opts)
    c2 = circles(c2Opts)
    // squares = squares(squaresOpts)
    p5.translate(-p5.width / 2, -p5.height / 2) 
    c1.generatePositions()
    c2.generatePositions()
  }

  p5.draw = () => {
    // p5.frameRate(1)
    p5.translate(p5.width / 2, p5.height / 2) 
    // reset to black
    p5.blendMode(p5.REPLACE) 
    p5.background(0)
    // set to difference to make the ngative space stuff
    p5.blendMode(p5.DIFFERENCE) 
    c1.display()
    c2.display()
    // squares.display()
    p5.filter(p5.INVERT)
  }
}

export default class Protocol extends Component{
  render() {
    return <P5Wrapper sketch={Sketch} />
  }
}
