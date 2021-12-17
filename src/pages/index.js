import React from 'react';
import DancingLines from '../sketches/DancingLines'
import Layout from '../components/Layout'
import { Link } from 'gatsby'
import 'tachyons/css/tachyons.min.css';
import '../styles/global.css'
import probable from '../images/binaryraon-400x250.jpeg'
import lines from '../images/0808.png'
import mosaic from '../images/mosaic.png'
import fragment from '../images/fragment.png' // make these jpgs
import protocol from '../images/protocol.png'
import poster from '../images/poster.jpg'

const array = [
  {
    title: "Probable Future",
    img: probable,
    link: "probable-future"
  },
  {
    title: "0808",
    img: lines,
    link: "8080"
  },
  {
    title: "Fragment",
    img: fragment,
    link: "fragment"
  },
  {
    title: "M0SAIC",
    img: mosaic,
    link: "mosaic"
  },
  {
    title: "Protocol",
    img: protocol,
    link: "protocol"
  },
  {
    title: "POSTER",
    img: poster,
    link: "poster"
  }
]

function SketchThumbnail({ title, img, link, location }) {
  const url = 'code/' + link
  console.log('url: ', url)

  return (
    <Link to={url} className="f0 sketchThumbnail fl w-100 w-third-ns link">
      <div className="relative pa1">
        <img className="w-100" src={img} />
        <p className="b white top-0 tc w-100 absolute f3 tc ma0 pa2">{title}</p>
      </div>
    </Link>
  )
}

// can make the grid a reusable component
const Home = ({ location }) => {
  return (
    <Layout>
      <p className="b f-subheadline">Creative and Interactive Web experiences.</p>
      <p className="f3 mb5">Web developer with a focus on interactive and creative programming.</p>
        <div className="cf">
          <p className="f2 tc pt4">Archives</p>
          {array.map(sketch => <SketchThumbnail {...sketch} location={location} />)}
        </div>
    </Layout>
  )
}


export default Home
// the casing of the component name sometimes makes hotreload not work
