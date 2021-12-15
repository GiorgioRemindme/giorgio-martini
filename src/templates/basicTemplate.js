import React, { useLayoutEffect } from "react"
import Layout from '../components/Layout'
import DancingLines from "../sketches/DancingLines"
import ProbableFuture from "../sketches/ProbableFuture"
import Fragment from "../sketches/Fragment"
import Mosaic from '../sketches/mosaic'
import Protocol from '../sketches/protocol'
import Poster from '../sketches/poster'
import "tachyons/css/tachyons.min.css"

let sketches = {
  dancingLines: <DancingLines />,
  probableFuture: <ProbableFuture />,
  fragment: <Fragment />,
  mosaic: <Mosaic />,
  protocol: <Protocol />,
  poster: <Poster />,
}

const BasicTemplate = (props) => {
  let sketch
  const { pageContext } = props
  const { pageContent } = pageContext

  for (const [key, value] of Object.entries(sketches)) {
    if (pageContent[2].item.toLowerCase() === key.toLowerCase()) sketch = value
  }

  !sketch && console.log("Sketch not found...")

  let title = pageContent[0].item
  let description = pageContent[1].item
  let columns = pageContent[3]?.item
  
  return (
    <Layout isDarkMode={false}>
      <div className="flex pt5">
        <div className="pr3 flex flex1">
          <div>
            <p className="b f2">{title}</p>
            <p className="f4 lh-copy measure">{description}</p>
          </div>
        </div>
        <div className="flex2">
          {sketch}
        </div>
      </div>
    </Layout>        
  )
}

export default BasicTemplate
