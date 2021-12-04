import React, { Component } from "react"
import {loadableP5 as P5Wrapper} from '../components/loadable'
import { getRandomArbitrary } from "../helpers"

let img
let circle1 
let circle2 
let squares 
let cropElement
let c1Opts
let c2Opts
let squaresOpts
let color = '#fff'

function evenRandomNumber(amt) { // add to utils
  return Math.ceil( Math.random() * amt / 2 ) * 2
}

function Sketch(p5) {
  function cropElement(opts) {
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
    let isFill = true
    let strokeWeight = []

    function drawingSettings(isFill, strokeWeight) {
      if (isFill) {
        p5.fill(color)
        p5.noStroke()        
      } else {
        p5.noFill() 
        p5.strokeWeight(strokeWeight) 
        p5.stroke(color)  
      }
    }

    function generatePositions() {
      p5.angleMode(p5.DEGREES)
      r = getRandomArbitrary(5, opts.maxSize) // use native
      amt = evenRandomNumber(opts.amt)
      angle = 360 / amt
      // these are some ugly magic numbers... try to fix the jumping between intro and outro other way...
      introAngle = 362.5 / amt
      outroAngle = 364.5 / amt
      let cropRadius = getRandomArbitrary(opts.cropRadius[0], opts.cropRadius[1])

      if(opts.strokeWeight === undefined || opts.strokeWeight.length == 0) {
        isFill = true
      } else {
        const [strokeMin, strokeMax] = opts.strokeWeight
        isFill = false
        strokeWeight = getRandomArbitrary(strokeMin, strokeMax)
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
        drawingSettings(isFill, strokeWeight)
        animation++
        introPosArray.forEach((pos, i) => {
          let subtractor = pos[0] / animation
          let rotation = pos[0] - subtractor
          
          p5.push() // make this whole part into a function and repeat below...
            p5.rotate(rotation)
            p5.translate(pos[1], 0)
            if (opts.ellipse) {
              p5.ellipse(0, 0, r, r)
            } else {
              p5.rectMode(p5.CENTER)
                p5.push()
                  p5.rotate(45)
                  p5.rect(0, 0, r, r)
                p5.pop()
            }
          p5.pop()
        })
      } else if (animation === maxAnimation && resting <= initialResting ) {
        // Resting
        drawingSettings(isFill, strokeWeight)
        resting ++
        posArray.forEach((pos, i) => {
          p5.push()
            p5.rotate(pos[0])
            p5.translate(pos[1], 0)
            if (opts.ellipse) {
              p5.ellipse(0, 0, r, r)
            } else {
              p5.rectMode(p5.CENTER)
              p5.push()
                p5.rotate(45)
                p5.rect(0, 0, r, r)
              p5.pop()
            }
          p5.pop()
        })   
      } else if (resting >= initialResting && fade > 1 ) {
      // Outro
      drawingSettings(isFill, strokeWeight)
        fade--
        outroPosArray.forEach((pos, i) => {
          let outroRotation = pos[0] - (pos[0] / fade)
          p5.push()
            p5.rotate(-outroRotation)
            p5.translate(pos[1], 0)
            if (opts.ellipse) {
              p5.ellipse(0, 0, r, r)
            } else {
              p5.rectMode(p5.CENTER)
              p5.push()
                p5.rotate(45)
                p5.rect(0, 0, r, r)
              p5.pop()
            }
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
      maxSize: p5.width/2,
      cropRadius: [p5.width/16, p5.width/4],
      ellipse: true,
    }
    c2Opts = {
      amt: 8,
      maxSize: p5.width/4,
      cropRadius: [p5.width/8, p5.width/3],
      strokeWeight: [10, 15],
      ellipse: true,
    }

    squaresOpts = {
      amt: 4,
      maxSize: p5.width/6,
      strokeWeight: [4, 25],
      cropRadius: [p5.width/6, p5.width/4],
    }
    
    circle1 = cropElement(c1Opts)
    circle2 = cropElement(c2Opts)
    squares = cropElement(squaresOpts)
    p5.translate(-p5.width / 2, -p5.height / 2) 
    circle1.generatePositions()
    circle2.generatePositions()
    squares.generatePositions()
  }

  p5.draw = () => {
    p5.frameRate(30)
    p5.translate(p5.width / 2, p5.height / 2) 
    // reset to black
    p5.blendMode(p5.REPLACE) 
    p5.background(0)
    // set to difference to make the ngative space stuff
    p5.blendMode(p5.DIFFERENCE) 
    circle1.display()
    circle2.display()
    squares.display()
    p5.filter(p5.INVERT)
  }
}

export default class Protocol extends Component{
  render() {
    return <P5Wrapper sketch={Sketch} />
  }
}
