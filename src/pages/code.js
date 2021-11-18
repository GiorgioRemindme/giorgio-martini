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
import protocol from '../images/protocol.png'

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
    link: "/fragment"
  },
  {
    title: "M0SAIC",
    img: mosaic,
    link: "/mosaic"
  },
  {
    title: "Protocol",
    img: protocol,
    link: "/protocol"
  },
  {
    title: "M0SAIC",
    img: mosaic,
    link: "/page1"
  }
]

function SketchThumbnail({ title, img, link, location }) {
  const url = location.href ? location.href : '';
  return (
    <a href={url+link} className="f0 sketchThumbnail fl w-100 w-third-ns link">
      <div className="relative pa1">
        <img className="w-100" src={img} />
        <p className="b white top-0 tc w-100 absolute f3 tc ma0 pa2">{title}</p>
      </div>
    </a>
  )
}

const Code = ({ location }) => (
  <Layout isDarkMode={true}>
    <p className="fadeInAnimation b f-subheadline pb4">Generative, interactive and still images made with code.</p>
    <div className="cf">
      {array.map(sketch => <SketchThumbnail {...sketch} location={location} />)}
    </div>
  </Layout>
)

export default Code
