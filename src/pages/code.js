import React from "react";
import DancingLines from '../sketches/DancingLines'
import Layout from '../components/Layout'
import { Link } from 'gatsby'
import 'tachyons/css/tachyons.min.css';
import '../styles/global.css'

import probable from '../images/binaryraon-400x250.jpeg'
import lines from '../images/0808.png'
import mosaic from '../images/mosaic.png'
import fragment from '../images/fragment.png'

const array = [
  {
    title: "Probable Future",
    img: probable,
    link: "/probable-future"
  },
  {
    title: "0808",
    img: lines,
    link: "/8080"
  },
  {
    title: "Fragment",
    img: fragment,
    link: "/page1"
  },
  {
    title: "M0SAIC",
    img: mosaic,
    link: "/page1"
  },
  {
    title: "Fragment",
    img: fragment,
    link: "/page1"
  },
  {
    title: "M0SAIC",
    img: mosaic,
    link: "/page1"
  }
]

function SketchThumbnail({ title, img, link }) {
  return (
    <a href={link} className="dim fl w-100 w-33-ns pa1 link">
      <div className="cover _minH15" style={{backgroundImage: `url(${img})`}}>
      {/* <p className="f3 tc ma0 pa2">{title}</p> */}
      </div>
    </a>
  )
}

const Code = () => (
  <div className="">
    <Layout isDarkMode={true}>
      <div className="">
        <p className="fadeInAnimation b f-subheadline pb4">Generative, interactive and still images made with code.</p>
        <div className="cf">
        {array.map(sketch => {
          console.log({sketch})
          return <SketchThumbnail {...sketch} />
        })}
        </div>
      </div>
    </Layout>
    <div className=""></div>
  </div>
)

export default Code
