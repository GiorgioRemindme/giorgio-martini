import React, { Component } from "react"
import { loadableP5 as P5Wrapper } from '../components/loadable'
import randomColor from 'randomcolor'
import {Vector} from "p5"
import '@fontsource/passion-one'
import { randomFromRange } from '../utils'

// Find out if we need p5, or if P5Wrapper includes p5... then remove p5 and import vector from P5Wrapper.
let textArray = ["AMAZING", "SHORTY", "HEYA!", "YUP", "BOOM", "FANTASTIC", "BALLIN'", "FAKE", "NICE", "GREAT", "FABULOUS", "FAB", "BEAST", "UNREAL", "MARVEL", "WOW", "ZOO", "CRAZY", "FUN", "RAD", "GOOD", "GORGEOUS", "REALLY", "YEAH", "LOVELY", "SCARY", "BAM!", "HOT", "SWEET", "NEAT", "SPACE", "COOL", "PURO", "SUPERB", "HURRA", "ALRIGHT", "INSANE", "MAMA", "PERFECT", "BREATH", "GRIND", "RAW", "WHAT", "OKAY", "BOSSY", "CHECK", "DAMN", "STONED", "DADA", "CUTE", "MK3", "AKA", "GROOVY", "DONE", "WICKED", "HYFR", "GLORY", "YUMMY", "BIG", "EPIC", "EXTRA", "DROP", "HUGE", "STUNNED", "HOAX", "INK", "FIRE", "HELLA", "LOOP", "YO", "EASY", "GEIL", "BIG", "SWEET", "KING", "OUTTA", "DANDY", "YIPPEE", "PIMPIN'", "YAY", "DUH", "FEAR", "STASH", "SURE", "PHAT", "GEEZ", "BAE", "BABE", "BABY", "PONG", "YASS", "NOISE", "HA!", "FUCK", "HOLLER", "RAVE", "CLASSIC", "GENIUS", "DOOMED", "BLUNT", "HELLO", "BANG", "LOOSE", "HOLLY", "MASSIVE", "FRESH", "SHINY", "PEACHY", "A-HA", "HELP!", "BOOZE", "BOYZ", "GIRLZ", "TAMALE", "HEROIN", "SAVAGE", "VIBE", "MUTTER", "GO", "BUDHA", "FATHER", "DANDY", "HEY", "0.0009", "MARY", "GANG", "FYI", "RALLY", "FRENZY"]
let textShadow
let randomXposForBubbles
let randomYposForBubbles
let indexOfArrayOfRandomXposForBubbles
let indexOfArrayOfRandomYposForBubbles
let randomXposForRects
let randomYposForRects
let randomXposForLines
let randomYposForLines
let colsArray
let randomSizesForBubbles
let randomSizesForRects
let colorTonesForBubbles
let colorTonesForRect
let collectionOfRotations
let arrayOfRandomPosForLines
let linesAngle
let collectionOfLengths
let collectionOfRotsForBeziers
let pointsForBezier
let someWord
let bubblesArr = []
let linesArr = []
let initialBubblesXPos
let initialBubblesYPos
let canvasX = 300
let canvasY = 500
let degreeProbs = [45, 135]
// Amount of elements
let amountOfBubbles = 40
let amountOfRects = 30
let amountOfLines = 25
let amountOfBeziers = 4
let maxBubblesXpos = 0.5 * canvasX
let maxBubblesYpos = 0.6 * canvasY
let maxRectsXpos = 0.8 * canvasX
let maxRectsYpos = 0.8 * canvasY

function Sketch(p5) {
  p5.setup = () => {
    p5.colorMode(p5.HSB, 360)
    p5.createCanvas(canvasX, canvasY)
    // Initialize values for first run
    randomXposForBubbles = evenRandomNums(amountOfBubbles, 0, maxBubblesXpos)
    randomYposForBubbles = evenRandomNums(amountOfBubbles, 0, maxBubblesYpos)
    initialBubblesXPos = randomXposForBubbles.map(x => x + p5.random(-canvasX / 2, canvasX / 2))
    initialBubblesYPos = randomYposForBubbles.map(x => x + p5.random(-canvasY / 2, canvasY / 2))
    randomXposForRects = evenRandomNums(amountOfRects, 0, maxRectsXpos)
    randomYposForRects = evenRandomNums(amountOfRects, 0, maxRectsYpos)
    randomXposForLines = evenRandomNums(amountOfLines, 0, canvasX / 2)
    randomYposForLines = evenRandomNums(amountOfLines, 0, canvasY / 2)
    colsArray = randomColor({ luminosity: 'light', format: 'hsl', count: 5 })
    randomSizesForBubbles = returnArrOfRandomSizes(amountOfBubbles, 10, 80)
    randomSizesForRects = returnArrOfRandomSizes(amountOfRects, 5, 30)
    colorTonesForBubbles = returnCollectionOfColorTones(colsArray[1], amountOfBubbles)
    colorTonesForRect = returnCollectionOfColorTones(colsArray[2], amountOfRects)
    collectionOfRotations = returnCollectionOfRotations(amountOfRects)
    linesAngle = returnlinesAngle()
    collectionOfLengths = returnCollectionOfLengths(amountOfLines, 100)
    someWord = returnRandomFromArray(textArray)
    // pointsForBezier = returnCollectionOfPointsForBezier(amountOfBeziers)
    // collectionOfRotsForBeziers = returnCollectionOfRotations(amountOfBeziers)

    for (let i = 0; i < amountOfBubbles; i++) {
      bubblesArr.push(new Bubble(initialBubblesXPos[i], initialBubblesYPos[i], randomXposForBubbles[i], randomYposForBubbles[i], randomSizesForBubbles[i], colorTonesForBubbles[i]))
    }

    for (let i = 0; i < amountOfLines; i++) {
      linesArr.push(new linea(colsArray[2], linesAngle, collectionOfLengths[i], randomXposForLines[i], randomYposForLines[i]))
    }
  }

  p5.draw = () => {

    p5.translate(p5.width / 2, p5.height / 2)
    p5.background(colsArray[0])

    for (let i = 0; i < bubblesArr.length; i++) {
      bubblesArr[i].wobble();
    }

    for (let i = 0; i < linesArr.length; i++) {
      linesArr[i].slideIn();
    }

    addText(colsArray, someWord)
    drawRects(randomXposForRects, randomYposForRects, randomSizesForRects, collectionOfRotations, colorTonesForRect)
  }

  p5.mouseClicked = () => {
    // Positions
    someWord = returnRandomFromArray(textArray)
    randomXposForBubbles = evenRandomNums(amountOfBubbles, 0, maxBubblesXpos)
    randomYposForBubbles = evenRandomNums(amountOfBubbles, 0, maxBubblesYpos)
    randomXposForRects = evenRandomNums(amountOfRects, 0, maxRectsXpos)
    randomYposForRects = evenRandomNums(amountOfRects, 0, maxRectsYpos)
    randomXposForLines = evenRandomNums(amountOfLines, 0, canvasX / 2)
    randomYposForLines = evenRandomNums(amountOfLines, 0, canvasY / 2)
    initialBubblesXPos = randomXposForBubbles.map(x => x + p5.random(-canvasX / 2, canvasX / 2))
    initialBubblesYPos = randomYposForBubbles.map(x => x + p5.random(-canvasY / 2, canvasY / 2))
    // pointsForBezier = returnCollectionOfPointsForBezier(amountOfBeziers)
    // Collections of colors, sizes etc..
    colsArray = randomColor({ luminosity: 'light', format: 'hsl', count: 5 })
    randomSizesForBubbles = returnArrOfRandomSizes(amountOfBubbles, 10, 80)
    randomSizesForRects = returnArrOfRandomSizes(amountOfRects, 5, 30)
    colorTonesForBubbles = returnCollectionOfColorTones(colsArray[1], amountOfBubbles)
    colorTonesForRect = returnCollectionOfColorTones(colsArray[2], amountOfRects)
    collectionOfRotations = returnCollectionOfRotations(amountOfRects)
    linesAngle = returnlinesAngle()
    collectionOfLengths = returnCollectionOfLengths(amountOfLines, 60)
    // collectionOfRotsForBeziers = returnCollectionOfRotations(amountOfBeziers)
    addText(colsArray, someWord)

    bubblesArr = []
    for (let i = 0; i < amountOfBubbles; i++) {
      bubblesArr.push(new Bubble(initialBubblesXPos[i], initialBubblesYPos[i], randomXposForBubbles[i], randomYposForBubbles[i], randomSizesForBubbles[i], colorTonesForBubbles[i]))
    }

    linesArr = []
    for (let i = 0; i < amountOfLines; i++) {
      linesArr.push(new linea(colsArray[3], linesAngle, collectionOfLengths[i], randomXposForLines[i], randomYposForLines[i]))
    }
  }


  function Bubble(initialXpos, initialYpos, indexOfArrayOfRandomXposForBubbles, indexOfArrayOfRandomYposForBubbles, randomSizesArr, colorTonesForBubbles) {
    this.x = indexOfArrayOfRandomXposForBubbles
    this.y = indexOfArrayOfRandomYposForBubbles
    this.target = p5.createVector(0, 0)
    this.initialXpos = initialXpos
    this.initialYpos = initialYpos
    this.pos = p5.createVector(this.initialXpos / 2, this.initialYpos / 2)
    this.vel = p5.createVector(0, 0)
    this.strength = 0.15 // 0.15
    this.drag = 0.90 //  0.76
    this.diameter = randomSizesArr
    this.tone = colorTonesForBubbles

    this.wobble = function () {
      this.target.set(this.x / 2, this.y / 2)
      this.force = Vector.sub(this.target, this.pos)
      this.force = this.force.mult(this.strength)
      this.vel = this.vel.mult(this.drag)
      this.vel = this.vel.add(this.force);
      this.pos = this.pos.add(this.vel);

      p5.fill(this.tone)
      p5.noStroke()
      p5.ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter)
    }
  }

  function drawRects(randomXposForRects, randomYposForRects, randomSizesArr, rot, colorTonesForRect) {
    randomXposForRects.forEach((o, i) => {
      const x = o
      const y = randomYposForRects[i]
      const elementSize = randomSizesArr[i]
      p5.noStroke()
      p5.push()
      p5.translate(x / 2, y / 2)
      p5.rotate(rot[i])
      p5.rectMode(p5.CENTER)
      const c = p5.color('hsla(0, 0%, 0%, 0.05)')
      p5.fill(c)
      p5.rect(-4, -4, elementSize, elementSize)
      p5.fill(colorTonesForRect[i])
      p5.rect(0, 0, elementSize, elementSize)
      p5.pop()
    })
  }

  function returnlinesAngle() {
    let angle = Math.random() < 0.5 ? 45 : 90
    return angle
  }

  function returnCollectionOfLengths(amountOfLines, lengthMax) {
    let lengthsArray = []
    while (lengthsArray.length < amountOfLines) {
      lengthsArray.push(p5.random(2, lengthMax))
    }
    return lengthsArray
  }

  function linea(colsArray, linesAngle, collectionOfLengthsElement, xPos, yPos) {
    this.angle = Vector.fromAngle(linesAngle)
    this.pos = p5.createVector(xPos, yPos)
    this.vel = p5.createVector(this.angle.x, this.angle.y)
    this.vel.mult(30)
    this.acc = p5.createVector(this.angle.x / 3, this.angle.y / 3)
    this.strokeWeight = Math.ceil(Math.random()*10)

    this.slideIn = function () {
      // Mirroring
      if (this.pos.x > (canvasX / 2)) {
        this.pos.x = -canvasX / 2
      } else if (this.pos.x < -canvasX / 2) {
        this.pos.x = canvasX / 2
      }
      if (this.pos.y > (canvasY / 2)) {
        this.pos.y = -canvasY / 2
      } else if (this.pos.y < -canvasY / 2) {
        this.pos.y = canvasY / 2
      }
      // Stop if speed is 0
      if (this.vel.x < 0.4 && this.vel.x > 0) {
        this.acc.set(0, 0)
        this.vel.set(0, 0)
      }

      this.vel.sub(this.acc)
      this.pos.sub(this.vel)
      p5.push()
        p5.translate(this.pos.x, this.pos.y)
        p5.push()
          p5.rotate(linesAngle)
          p5.translate(-collectionOfLengthsElement / 2, 0)
          p5.stroke(colsArray)
          p5.strokeCap(p5.SQUARE)
          p5.strokeWeight(this.strokeWeight)
          p5.line(0, 0, collectionOfLengthsElement, 0)
        p5.pop()
      p5.pop()
    }
  }

  function addText(colsArray, someWord) {
    p5.textSize(60)
    p5.fill('hsl(160, 100%, 100%)')
    p5.textAlign(p5.CENTER)
    p5.rectMode(p5.CENTER)
    p5.textFont('Passion One')
    p5.strokeWeight(10)
    p5.fill('hsla(160, 100%, 100%)')
    p5.stroke(colsArray[3])
    p5.text(someWord, 0, canvasY / 2.3, canvasX / 1.5, canvasY)
  }


  function returnCollectionOfPointsForBezier(amtOfBeziers) {
    let arr = []
    for (let i = 0; i < amtOfBeziers; i++) {
      arr.push([])
      // Here we get 2 random nums to use as the origin of the bezier
      // and then we create the anchor points by adding or subtracting some random value from x or y... 
      const origin = evenRandomNums(2, 0, canvasX / 2),
        x = Math.round(Math.random() < 0.5 ? origin[0] : origin[0] * -1),
        y = Math.round(Math.random() < 0.5 ? origin[1] : origin[1] * -1),
        // Fist point 
        anchorOneX = x + p5.random(p5.random(canvasX / 4, canvasX * 2), p5.random(canvasX / 4, canvasX * 2)),
        anchorOneY = y - p5.random(p5.random(canvasX / 4, canvasX * 2), p5.random(canvasX / 4, canvasX * 2)),
        controlOneX = x - p5.random(p5.random(canvasX / 4, canvasX * 2), p5.random(canvasX / 4, canvasX * 2)),
        controlOneY = y - p5.random(p5.random(canvasX / 4, canvasX * 2), p5.random(canvasX / 4, canvasX * 2)),
        // Second Point
        anchorTwoX = x - p5.random(p5.random(canvasX / 4, canvasX * 2), p5.random(canvasX / 4, canvasX * 2)),
        anchorTwoY = y + p5.random(p5.random(canvasX / 4, canvasX * 2), p5.random(canvasX / 4, canvasX * 2)),
        controlTwoX = x + p5.random(p5.random(canvasX / 4, canvasX * 2), p5.random(canvasX / 4, canvasX * 2)),
        controlTwoY = y + p5.random(p5.random(canvasX / 4, canvasX * 2), p5.random(canvasX / 4, canvasX * 2))
      arr[i].push(anchorOneX, anchorOneY, controlOneX, controlOneY, anchorTwoX, anchorTwoY, controlTwoX, controlTwoY)
    }
    return arr
  }

  function drawBeziers(bezierPointsArr, colsArray, rotationsArr) {
    for (let i = 0; i < bezierPointsArr.length; i++) {
      p5.strokeWeight(1)
      p5.noFill()
      // stroke( colsArray[4] )
      let c = p5.color('hsla(0, 0%, 100%, 0.2)')
      p5.stroke(c)
      p5.push()
      p5.rotate(rotationsArr[i])
      // debugger ellipses to see where the points are
      // ellipse(bezierPointsArr[i][0],bezierPointsArr[i][1], 10,10)
      // ellipse(bezierPointsArr[i][2],bezierPointsArr[i][3], 10,10)
      // ellipse(bezierPointsArr[i][6],bezierPointsArr[i][7], 10,10)
      // ellipse(bezierPointsArr[i][4],bezierPointsArr[i][5], 10,10)
      p5.bezier(bezierPointsArr[i][0], bezierPointsArr[i][1], bezierPointsArr[i][2], bezierPointsArr[i][3], bezierPointsArr[i][6], bezierPointsArr[i][7], bezierPointsArr[i][4], bezierPointsArr[i][5])
      p5.pop()
    }
  }


  function drawTextShadow(someWord) {
    p5.textShadow.clear()
    p5.textShadow.translate(p5.width / 2, p5.height / 2)
    p5.textShadow.textSize(60)
    p5.textShadow.textAlign(p5.CENTER)
    p5.textShadow.rectMode(p5.CENTER)
    p5.textShadow.textFont('Passion One')
    p5.textShadow.strokeWeight(10)
    p5.textShadow.stroke('hsl(0, 0%, 20%)')
    p5.textShadow.text(someWord, 0, canvasY / 2.3, canvasX / 1.5, canvasY)
    p5.textShadow.translate(-p5.width / 2, -p5.height / 2)
    //textShadow.filter(BLUR,24)
  }

  function returnArrFromHslColor(stringInHsl) {
    const tono = p5.color(stringInHsl),
      h = p5.hue(tono),
      firstPartOfSat = stringInHsl.substring(stringInHsl.indexOf(",") + 1),
      satArray = firstPartOfSat.split(","),
      s = parseInt(satArray[0]),
      l = p5.lightness(tono)
    return [Math.round(h), Math.round(s), Math.round(l)]
  }

  function returnCollectionOfColorTones(colsArrayItem, amt) {
    let colorValues = returnArrFromHslColor(colsArrayItem),
      colVarAmt,
      lightnessRandom,
      array = []
  
    while (array.length < amt) {
      colVarAmt = Math.round(Math.random() * 3)
      lightnessRandom = Math.round(Math.random() < 0.5 ? colorValues[2] + colVarAmt : colorValues[2] - colVarAmt)
      array.push(`hsl(${colorValues[0]}, ${colorValues[1]}%, ${lightnessRandom}%)`)
    }
    return array
  }  

}


// Helpers
function returnCollectionOfRotations(amt) {
  let array = []
  while (array.length < amt) {
    array.push(randomFromRange(0,360))
    // array.push(p5.random(360))
  }
  return array
}



function returnArrOfRandomSizes(amt, elmntSizeMin, elmntSizeMax) {
  let arr = []
  while (arr.length < amt) {
    arr.push(Math.round(randomFromRange(elmntSizeMin, elmntSizeMax)))
  }
  return arr
}

function returnRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function evenRandomNums(amt, min, max) {
  const array = []
  while (array.length < amt) {
  // randomFromRange() nums have a 50% of being multiplied by -1 so they're evenly distributed on screen
    array.push(Math.round(Math.random() < 0.5 ? randomFromRange(min, max) : randomFromRange(min, max) * -1))
  }
  return array
}

export default class Poster extends Component {
  render() {
    return <P5Wrapper sketch={Sketch} />
  }
}

