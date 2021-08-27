import React from 'react';
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
    img: lines,
    link: "/probable-future"
  },
  {
    title: "0808",
    img: lines,
    link: "/8080"
  },
  {
    title: "Fragment",
    img: lines,
    link: "/page1"
  },
  {
    title: "M0SAIC",
    img: lines,
    link: "/page1"
  },
  {
    title: "Fragment",
    img: lines,
    link: "/page1"
  },
  {
    title: "M0SAIC",
    img: lines,
    link: "/page1"
  }
]

function SketchThumbnail({ title, img, link }) {
  return (
    <a href={link} className="f0 sketchThumbnail fl w-100 w-third-ns link">
      <div className="relative">
        <img className="w-100" src={img} />
        <p className="b white top-0 tc w-100 absolute f3 tc ma0 pa2">{title}</p>
      </div>
    </a>
  )
}

const Code = () => (
  <Layout isDarkMode={true}>
    <p className="fadeInAnimation b f-subheadline pb4">Generative, interactive and still images made with code.</p>
    <div className="cf">
      {array.map(sketch => <SketchThumbnail {...sketch} />)}
    </div>
  </Layout>
)

export default Code
