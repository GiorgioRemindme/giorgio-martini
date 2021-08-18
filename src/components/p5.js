
import React, { Component } from "react"
import {loadableP5 as P5Wrapper} from './loadable';

let SketchSnowflakes = (p5) => {
  let snowflakes = []; // array to hold snowflake objects

   p5.setup = () =>  {
    p5.createCanvas(400, 600);
    p5.fill(240);
    p5.noStroke();
  }

  p5.draw = () => {
    p5.background('brown');
    let t = p5.frameCount / 60; // update time

    for (let i = 0; i < p5.random(5); i++) {
      snowflakes.push(new snowflake()); // append snowflake object
    }

    for (let flake of snowflakes) {
      flake.update(t); // update snowflake position
      flake.display(); // draw snowflake
    }
  }

  function snowflake() {
    this.posX = 0;
    this.posY = p5.random(-50, 0);
    this.initialangle = p5.random(0, 2 * p5.PI);
    this.size = p5.random(2, 5);

    this.radius = p5.sqrt(p5.random(p5.pow(p5.width / 2, 2)));
    this.update = function(time) {
      let w = 0.6; // angular speed
      let angle = w * time + this.initialangle;
      this.posX = p5.width / 2 + this.radius * p5.sin(angle);
      this.posY += p5.pow(this.size, 0.5);

      if (this.posY > p5.height) {
        let index = snowflakes.indexOf(this);
        snowflakes.splice(index, 1);
      }
    };

    this.display = function() {
      p5.ellipse(this.posX, this.posY, this.size);
    };
  }
}

export default class App extends Component{
  render() {
    return <P5Wrapper sketch={SketchSnowflakes} />
  }
}