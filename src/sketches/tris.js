import React, { Component } from "react"
import { loadableP5 as P5Wrapper } from '../components/loadable';
import { getRandomArbitrary } from '../helpers'
import p5, { Vector } from "p5"
import Delaunator from 'delaunator';

let triangles
let canvasSize = 600
let vertexAmt
let vertex

let palette = [
  '#42CAFD',
  '#66B3BA',
  '#8EB19D',
  '#F6EFA6',
  '#F0D2D1'
]

function Sketch(p5) {
  // helper...
  function getRandomFromArray(items) {
    let result = items[Math.floor(Math.random() * items.length)]
    return result
  }

  p5.setup = () => {
    p5.createCanvas(600, 600)
    p5.background(255)
    initializeTriangulation()
  }

  p5.draw = () => {
    p5.background(0)
    triangles.forEach(t => t.draw())
  }

  function initializeTriangulation() {
    triangles = [];
    let pts = [];
    // push canvas rect points
    pts.push(p5.createVector(0, 0))
    pts.push(p5.createVector(p5.width, 0))
    pts.push(p5.createVector(p5.width, p5.height))
    pts.push(p5.createVector(0, p5.height))

    // add a certain nb of pts proportionally to the size of the canvas
    // ~~ truncates a floating point number and keeps the integer part, like floor()
    var n = 2
    for (let i = 0; i < n; i++) {
      pts.push(p5.createVector(~~p5.random(p5.width), ~~p5.random(p5.height)))
    }

    // Now, let's use Delaunay.js
    // Delaunay.triangulate expect a list of vertices (which should be a bunch of two-element arrays, representing 2D Euclidean points)
    // and it will return you a giant array, arranged in triplets, representing triangles by indices into the passed array
    // Array.map function let's us create an Array of 2 elements arrays [ [x,y],[x,y],..] from our array of PVector [ PVector(x,y), PVector(x,y), ... ]
    
    let delunaySource = pts.map(pt => [pt.x, pt.y]).flat(Infinity)
    console.log({delunaySource})

    const triangulation = new Delaunator(delunaySource)
    console.log({triangulation})


    //create Triangles object using indices returned by Delaunay.triangulate
    for (let i = 0; i < triangulation.triangles.length; i += 3) {
      console.log("xx: ", triangulation.triangles[i])
      triangles.push(new Triangle(
        pts[triangulation.triangles[i]],
        pts[triangulation.triangles[i + 1]],
        pts[triangulation.triangles[i + 2]]
      ))
    }
  }

  // class for keeping triangles from 3 PVectors
  function Triangle(_a, _b, _c) {
    // PVectors
    this.a = _a
    this.b = _b
    this.c = _c
    
    // used for drawing lines on triangles
    // number of lines to draw proportionnally to the triangle size
    this.n = ~~(p5.dist(_a.x, _a.y, (this.b.x + this.c.x) / 2, (this.b.y + this.c.y) / 2
    ) / p5.random(25, 50)) + 1
    // direction point for the lines
    this.drawTo = ~~p5.random(3);

    this.draw = function () {
      p5.background(255)
      p5.fill(100);
      p5.triangle(this.a.x, this.a.y, this.b.x, this.b.y, this.c.x, this.c.y)
      p5.stroke(0);
      p5.strokeJoin(p5.BEVEL)
      p5.strokeWeight(1)
      p5.triangle(this.a.x, this.a.y, this.b.x, this.b.y, this.c.x, this.c.y);
    }
  }
}

export default class Tris extends Component {
  render() {
    return <P5Wrapper sketch={Sketch} />
  }
}
