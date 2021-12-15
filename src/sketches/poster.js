import React, { Component } from "react"
import { loadableP5 as P5Wrapper } from '../components/loadable';
import randomColor from 'randomcolor'
import {Vector} from "p5"
// figure out if i need p5, or if P5Wrapper includes p5.. then remove p5 and import vector from P5Wrapper...

const textArray = ["AMAZING", "SHORTY", "HEYA!", "YUP", "BOOM", "FANTASTIC", "BALLIN'", "FAKE", "NICE", "GREAT", "FABULOUS", "FAB", "BEAST", "UNREAL", "MARVEL", "WOW", "ZOO", "CRAZY", "FUN", "RAD", "GOOD", "GORGEOUS", "REALLY", "YEAH", "LOVELY", "SCARY", "BAM!", "HOT", "SWEET", "NEAT", "SPACE", "COOL", "PURO", "SUPERB", "HURRA", "ALRIGHT", "INSANE", "MAMA", "PERFECT", "BREATH", "GRIND", "RAW", "WHAT", "OKAY", "BOSSY", "CHECK", "DAMN", "STONED", "DADA", "CUTE", "MK3", "AKA", "GROOVY", "DONE", "WICKED", "HYFR", "GLORY", "YUMMY", "BIG", "EPIC", "EXTRA", "DROP", "HUGE", "STUNNED", "HOAX", "INK", "FIRE", "HELLA", "LOOP", "YO", "EASY", "GEIL", "BIG", "SWEET", "KING", "OUTTA", "DANDY", "YIPPEE", "PIMPIN'", "YAY", "DUH", "FEAR", "STASH", "SURE", "PHAT", "GEEZ", "BAE", "BABE", "BABY", "PONG", "YASS", "NOISE", "HA!", "FUCK", "HOLLER", "RAVE", "CLASSIC", "GENIUS", "DOOMED", "BLUNT", "HELLO", "BANG", "LOOSE", "HOLLY", "MASSIVE", "FRESH", "SHINY", "PEACHY", "A-HA", "HELP!", "BOOZE", "BOYZ", "GIRLZ", "TAMALE", "HEROIN", "SAVAGE", "VIBE", "MUTTER", "GO", "BUDHA", "FATHER", "DANDY", "HEY", "0.0009", "MARY", "GANG", "FYI", "RALLY", "FRENZY"]
let vignette,
  textShadow,
  bubble,
  // vars to use in Draw
  arrayOfRandomXposForBubbles,
  arrayOfRandomYposForBubbles,
  indexOfArrayOfRandomXposForBubbles,
  indexOfArrayOfRandomYposForBubbles,
  arrayOfRandomXposForRects,
  arrayOfRandomYposForRects,
  arrayOfRandomXposForLines,
  arrayOfRandomYposForLines,
  colsArray,
  randomSizesArrForBubbles,
  randomSizesArrForRects,
  collectionOfColorTonesForBubbles,
  collectionOfColorTonesForRect,
  collectionOfRotations,
  arrayOfRandomPosForLines,
  linesAngle,
  collectionOfLengths,
  collectionOfRotsForBeziers,
  pointsForBezier,
  someWord,
  bubblesArr = [],
  linesArr = [],
  arrayOfInitialBubblesXPos,
  arrayOfInitialBubblesYPos,
  lin

const canvasX = 300,
  canvasY = 500,
  degreeProbs = [45, 135],
  // Amount of elements
  amountOfBubbles = 20,
  amountOfRects = 10,
  amountOfLines = 6, //6
  amountOfBeziers = 4,
  // vars on for X
  firstProbStepX = 0.3 * canvasX,
  secondProbStepX = canvasX - (0.2 * canvasX),
  finalProbStepX = canvasX,
  // vars for Y
  firstProbStepY = 0.6 * canvasY,
  secondProbStepY = canvasY - (0.2 * canvasY),
  finalProbStepY = canvasY


function Sketch(p5) {
  p5.setup = () => {
    // ask where colorMode goes and how many times it should be defifined
    //pixelDensity(1)
    //frameRate(1)
    p5.colorMode(p5.HSB, 360)
    p5.createCanvas(canvasX, canvasY)

    // Initialize values for first run
    ///////////////////////////////////////////////////////    amt   -   initial  -  range
    arrayOfRandomXposForBubbles = createArrayOfRandomNums(amountOfBubbles, 0, firstProbStepX)
    arrayOfRandomYposForBubbles = createArrayOfRandomNums(amountOfBubbles, 0, firstProbStepY)

    arrayOfInitialBubblesXPos = arrayOfRandomXposForBubbles.map(x => x)
    arrayOfInitialBubblesYPos = arrayOfRandomYposForBubbles.map(x => x)

    arrayOfRandomXposForRects = createArrayOfRandomNums(amountOfRects, 0, secondProbStepX)
    arrayOfRandomYposForRects = createArrayOfRandomNums(amountOfRects, 0, secondProbStepY)
    arrayOfRandomXposForLines = createArrayOfRandomNums(amountOfLines, 0, canvasX / 2)
    arrayOfRandomYposForLines = createArrayOfRandomNums(amountOfLines, 0, canvasY / 2)
    colsArray = randomColor({ luminosity: 'light', format: 'hsl', count: 5 })
    randomSizesArrForBubbles = returnArrOfRandomSizes(amountOfBubbles, 10, 80)
    randomSizesArrForRects = returnArrOfRandomSizes(amountOfRects, 5, 30)
    collectionOfColorTonesForBubbles = returnCollectionOfColorTones(colsArray[1], amountOfBubbles)
    collectionOfColorTonesForRect = returnCollectionOfColorTones(colsArray[2], amountOfRects)
    collectionOfRotations = returnCollectionOfRotations(amountOfRects)
    linesAngle = returnlinesAngle()
    collectionOfLengths = returnCollectionOfLengths(amountOfLines, 50)
    someWord = returnRandomFromArray(textArray)
    pointsForBezier = returnCollectionOfPointsForBezier(amountOfBeziers)
    collectionOfRotsForBeziers = returnCollectionOfRotations(amountOfBeziers)

    for (let i = 0; i < amountOfBubbles; i++) {
      bubblesArr.push(new Bubble(arrayOfInitialBubblesXPos[i], arrayOfInitialBubblesYPos[i], arrayOfRandomXposForBubbles[i], arrayOfRandomYposForBubbles[i], randomSizesArrForBubbles[i], collectionOfColorTonesForBubbles[i]))
    }

    for (let i = 0; i < amountOfLines; i++) {
      linesArr.push(new linea(colsArray[2], linesAngle, collectionOfLengths[i], arrayOfRandomXposForLines[i], arrayOfRandomYposForLines[i]))
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
    drawRects(arrayOfRandomXposForRects, arrayOfRandomYposForRects, randomSizesArrForRects, collectionOfRotations, collectionOfColorTonesForRect)
  }


  function mouseClicked() {
    // Positions
    arrayOfRandomXposForBubbles = createArrayOfRandomNums(amountOfBubbles, 0, firstProbStepX)
    arrayOfRandomYposForBubbles = createArrayOfRandomNums(amountOfBubbles, 0, firstProbStepY)
    arrayOfRandomXposForRects = createArrayOfRandomNums(amountOfRects, 0, secondProbStepX)
    arrayOfRandomYposForRects = createArrayOfRandomNums(amountOfRects, 0, secondProbStepY)
    arrayOfRandomXposForLines = createArrayOfRandomNums(amountOfLines, 0, canvasX / 2)
    arrayOfRandomYposForLines = createArrayOfRandomNums(amountOfLines, 0, canvasY / 2)
    pointsForBezier = returnCollectionOfPointsForBezier(amountOfBeziers)
    arrayOfInitialBubblesXPos = arrayOfRandomXposForBubbles.map(x => x + p5.random(-canvasX / 2, canvasX / 2))
    arrayOfInitialBubblesYPos = arrayOfRandomYposForBubbles.map(x => x + p5.random(-canvasY / 2, canvasY / 2))

    // Collections of colors, sizes etc..
    colsArray = randomColor({ luminosity: 'light', format: 'hsl', count: 5 })
    randomSizesArrForBubbles = returnArrOfRandomSizes(amountOfBubbles, 10, 80)
    randomSizesArrForRects = returnArrOfRandomSizes(amountOfRects, 5, 30)
    collectionOfColorTonesForBubbles = returnCollectionOfColorTones(colsArray[1], amountOfBubbles)
    collectionOfColorTonesForRect = returnCollectionOfColorTones(colsArray[2], amountOfRects)
    collectionOfRotations = returnCollectionOfRotations(amountOfRects)
    linesAngle = returnlinesAngle()
    collectionOfLengths = returnCollectionOfLengths(amountOfLines, 50)
    someWord = returnRandomFromArray(textArray)
    collectionOfRotsForBeziers = returnCollectionOfRotations(amountOfBeziers)
    addText(colsArray, someWord)

    bubblesArr = []
    for (let i = 0; i < amountOfBubbles; i++) {
      bubblesArr.push(new Bubble(arrayOfInitialBubblesXPos[i], arrayOfInitialBubblesYPos[i], arrayOfRandomXposForBubbles[i], arrayOfRandomYposForBubbles[i], randomSizesArrForBubbles[i], collectionOfColorTonesForBubbles[i]))
    }

    linesArr = []
    for (let i = 0; i < amountOfLines; i++) {
      linesArr.push(new linea(colsArray[3], linesAngle, collectionOfLengths[i], arrayOfRandomXposForLines[i], arrayOfRandomYposForLines[i]))
    }
  }


  function Bubble(initialXpos, initialYpos, indexOfArrayOfRandomXposForBubbles, indexOfArrayOfRandomYposForBubbles, randomSizesArr, collectionOfColorTonesForBubbles) {
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
    this.tone = collectionOfColorTonesForBubbles

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

  function drawRects(arrayOfRandomXposForRects, arrayOfRandomYposForRects, randomSizesArr, rot, collectionOfColorTonesForRect) {
    arrayOfRandomXposForRects.forEach((o, i) => {
      const x = o,
        y = arrayOfRandomYposForRects[i],
        elementSize = randomSizesArr[i]
      p5.noStroke()
      p5.push()
      p5.translate(x / 2, y / 2)
      p5.rotate(rot[i])
      p5.rectMode(p5.CENTER)
      const c = p5.color('hsla(0, 0%, 0%, 0.04)')
      p5.fill(c)
      p5.rect(-4, -4, elementSize, elementSize)
      p5.fill(collectionOfColorTonesForRect[i])
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
      lengthsArray.push(p5.random(5, lengthMax))
    }
    return lengthsArray
  }


  function linea(colsArray, linesAngle, collectionOfLengthsElement, xPos, yPos) {
    this.angle = Vector.fromAngle(linesAngle)
    this.pos = p5.createVector(xPos, yPos)
    this.vel = p5.createVector(this.angle.x, this.angle.y)
    this.vel.mult(30)
    this.acc = p5.createVector(this.angle.x / 3, this.angle.y / 3)

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
      p5.strokeWeight(6)
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
      const origin = createArrayOfRandomNums(2, 0, canvasX / 2),
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
    array.push(returnRandomNumFromRange(0,360))
    // array.push(p5.random(360))
  }
  return array
}



function returnArrOfRandomSizes(amt, elmntSizeMin, elmntSizeMax) {
  let arr = []
  while (arr.length < amt) {
    arr.push(Math.round(returnRandomNumFromRange(elmntSizeMin, elmntSizeMax)))
  }
  return arr
}

function returnRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function returnRandomNumFromRange(initialVal, range) {
  return Math.floor(Math.random() * (range - initialVal + 1)) + initialVal;
}

// Creates an array of randomly picket numbers based on the params you enter
function createArrayOfRandomNums(amt, initial, range) {
  const array = []
  while (array.length < amt) {
    // Here the numers that get returned from returnRandomNumFromRange() have a 50% of being multiplied by -1
    // so that they are evenly distributed on screen 
    array.push(Math.round(Math.random() < 0.5 ? returnRandomNumFromRange(initial, range) : returnRandomNumFromRange(initial, range) * -1))
  }
  return array
}

export default class Poster extends Component {
  render() {
    return <P5Wrapper sketch={Sketch} />
  }
}

