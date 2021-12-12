import React, { useLayoutEffect } from "react"
import Layout from '../components/Layout'
import DancingLines from "../sketches/DancingLines"
import ProbableFuture from "../sketches/ProbableFuture"
import Fragment from "../sketches/Fragment"
import Mosaic from '../sketches/mosaic'
import Protocol from '../sketches/protocol'
import "tachyons/css/tachyons.min.css"

let sketches = {
  dancingLines: <DancingLines />,
  probableFuture: <ProbableFuture />,
  fragment: <Fragment />,
  mosaic: <Mosaic />,
  protocol: <Protocol />,
}

const BasicTemplate = (props) => {
  let sketch
  const { pageContext } = props
  const { pageContent } = pageContext

  for (const [key, value] of Object.entries(sketches)) {
    for (let i = 0; i < pageContent.length; i++) {
      if (pageContent[i].item.toLowerCase() === key.toLowerCase()) {
        sketch = value
      }
    }
  }

  !sketch && console.log("Sketch not found...")

  return (
    <Layout isDarkMode={false}>
      <div>
        <p className="b f-subheadline mb2">{pageContent[0].item}</p>
        <p>{pageContent[1].item}</p>
        <div className="pt4" id="scrollTo" ></div>
        {sketch}
      </div>
    </Layout>        
  )
}

export default BasicTemplate
