import React, { Component } from "react"
import {loadableP5 as P5Wrapper} from '../components/loadable';

let img
let uploadImg
const cols = 35
const rows = 35
let matrix = []
let xSpacing
let ySpacing
let w
let h
let input;

function Sketch(p5) {

  function saveColors(matrix) {
    matrix.forEach((cell, i) => {
      matrix[i].push(p5.get(cell[0], cell[1]))
    })    
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function buildNewMatrix(rows, cols, xS, yS) {
    let m = []
    for (let i = 0; i < rows+1; i++) {
      for (let j = 0; j < cols+1; j++) {
        m.push([i*xS,j*yS])
      }
    }
    return m
  }
  
  p5.preload = () => {
    img = p5.loadImage('https://i.imgur.com/6B788ty.jpg')
  }
  
  p5.setup = () => {
    var myCanvas = p5.createCanvas(img.width, img.height)
    w = p5.width/cols
    h = p5.height/rows
    xSpacing = p5.width/cols
    ySpacing = p5.height/cols
  
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        matrix.push([i*xSpacing,j*ySpacing])
      }
    }    
  }

  p5.draw = () => {
    p5.frameRate(24)
    let _newCols = p5.map(p5.mouseX, 0, p5.width, 0, 40)
    let newCols = Math.ceil(_newCols)
    let _newRows = p5.map(p5.mouseY, 0, p5.height, 0, 40)
    let newRows = Math.ceil(_newRows)
  
    if (p5.mouseX > 1 && p5.mouseX < p5.width && p5.mouseY > 1 && p5.mouseY < p5.height) {
      w = p5.width/newCols
      h = p5.height/newRows
      matrix = buildNewMatrix(newCols, newRows, p5.width/newCols, p5.height/newRows)
    } else {
      w = p5.width/cols
      h = p5.height/rows
      matrix = buildNewMatrix(cols, rows, p5.width/cols, p5.height/rows)
    }
    p5.image(img, 0, 0)
    saveColors(matrix)
    p5.background(0)
    shuffleArray(matrix)
  
    matrix.forEach((cell, i) => {
      p5.fill(cell[2])
      p5.noStroke()
      p5.ellipseMode(p5.CORNER)
      p5.ellipse(cell[0], cell[1], w, h)
    })       
  }
}

export default class Fragment extends Component{
  render() {
    return <P5Wrapper sketch={Sketch} />
  }
}
