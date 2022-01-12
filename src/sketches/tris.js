import React, { Component } from 'react'
import { loadableP5 as P5Wrapper } from '../components/loadable'
import { getRandomArbitrary, getRandomFromArray } from '../helpers'
import p5, { Vector } from 'p5'
import Delaunator from 'delaunator'

let triangles
let canvasSize = 600
let vertexAmt
let vertex

let palette = [
  '#413C58',
  '#A3C4BC',
  '#BFD7B5',
  '#E7EFC5',
  '#F2DDA4'
]

function Sketch(p5) {
  // make into helper...
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

  p5.mouseClicked = () => {
    initializeTriangulation()
  }

  function initializeTriangulation() {
    triangles = [];
    let pts = [];
    // push canvas rect points
    pts.push(p5.createVector(0, 0))
    pts.push(p5.createVector(p5.width, 0))
    pts.push(p5.createVector(p5.width, p5.height))
    pts.push(p5.createVector(0, p5.height))

    var n = 20
    for (let i = 0; i < n; i++) {
      pts.push(p5.createVector(~~p5.random(p5.width), ~~p5.random(p5.height)))
    }

    // Delaunay.triangulate expect a list of vertices (which should be a bunch of two-element arrays, representing 2D Euclidean points)
    // and it will return you a giant array, arranged in triplets, representing triangles by indices into the passed array
    // Array.map function let's us create an Array of 2 elements arrays [ [x,y],[x,y],..] from our array of PVector [ PVector(x,y), PVector(x,y), ... ]
    let delunaySource = pts.map(pt => [pt.x, pt.y]).flat(Infinity)
    const triangulation = new Delaunator(delunaySource)

    //create Triangles object using indices returned by Delaunay.triangulate
    for (let i = 0; i < triangulation.triangles.length; i += 3) {
      triangles.push(new Triangle(
        pts[triangulation.triangles[i]],
        pts[triangulation.triangles[i + 1]],
        pts[triangulation.triangles[i + 2]]
      ))
    }
  }

  function Triangle(_a, _b, _c) {
    this.a = _a
    this.b = _b
    this.c = _c
    this.fill = getRandomFromArray(palette)
    this.strokeColor = getRandomFromArray(palette)

    this.draw = function () {
      p5.fill(this.fill)
      p5.stroke(30)
      p5.strokeJoin(p5.BEVEL)
      p5.strokeWeight(8)
      p5.triangle(this.a.x, this.a.y, this.b.x, this.b.y, this.c.x, this.c.y)
    }
  }
}

export default class Tris extends Component {
  render() {
    return <P5Wrapper sketch={Sketch} />
  }
}
