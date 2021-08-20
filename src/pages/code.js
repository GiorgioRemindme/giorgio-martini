import React from "react";
import Background from "../components/BackgroundP5";
import Layout from '../components/Layout'
import { Link } from "gatsby"
import "tachyons/css/tachyons.min.css";
import "../styles/global.css";

const array = [
  {
    title: "Fragments",
    img: "https://i.imgur.com/ny6aGBx.jpeg"
  },
  {
    title: "Bits",
    img: "https://i.imgur.com/ny6aGBx.jpeg"
  }
]

function SketchThumbnail({ title, img }) {
  return (
    <div className="pa1">
      <h2>{title}</h2>
      <div className="cover" style={{backgroundImage: `url(${img})`}}>
        yolo
      </div>
    </div>
  )
}

const Code = () => (
  <div className="">
    <Layout isDarkMode={true}>
      <div className="pt1">
        <p className="b f-subheadline">Code as an artistic medium.</p>
        {array.map(sketch => {
          console.log({sketch})
          return <SketchThumbnail {...sketch} />
        })}
      </div>
    </Layout>
  </div>
)

export default Code
