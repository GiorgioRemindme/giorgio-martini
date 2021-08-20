import React from "react";
import DancingLines from "../sketches/DancingLines";
import Layout from '../components/Layout'
import { Link } from "gatsby"
import "tachyons/css/tachyons.min.css";
import "../styles/global.css";

const array = [
  {
    title: "Fragments",
    img: "https://i.imgur.com/ny6aGBx.jpeg",
    slug: ""
  },
  {
    title: "Bits",
    img: "https://i.imgur.com/q3jFBwq.jpeg"
  }
]

function SketchThumbnail({ title, img }) {
  return (
    <a className="pa1">
      <h2>{title}</h2>
      <div className="cover" style={{backgroundImage: `url(${img})`}}>
        yolo
      </div>
    </a>
  )
}

const Code = () => (
  <div className="">
    <Layout isDarkMode={true}>
      <div className="pt1">
        <p className="b f-subheadline">I like to programm creative pieces with code.</p>
        {array.map(sketch => {
          console.log({sketch})
          return <SketchThumbnail {...sketch} />
        })}
        <DancingLines />
      </div>
    </Layout>
  </div>
)

export default Code
