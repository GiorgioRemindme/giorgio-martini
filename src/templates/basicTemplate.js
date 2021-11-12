import React, { useLayoutEffect } from "react"
import { Link } from "gatsby"
import Layout from '../components/Layout'
import DancingLines from "../sketches/DancingLines";
import ProbableFuture from "../sketches/ProbableFuture";
import Fragment from "../sketches/Fragment";
import Mosaic from '../sketches/mosaic'
import Protocol from '../sketches/protocol'

let sketches = {
  dancingLines: <DancingLines />,
  probableFuture: <ProbableFuture />,
  fragment: <Fragment />,
  mosaic: <Mosaic />,
  protocol: <Protocol />,
}

// move somewhere...
const useScrollTo = id => {
  useLayoutEffect(() => {
    if (id) {
      const el = document.getElementById(id)
      const top = window.scrollY + el.getBoundingClientRect().top - 130 // add offset as props
      window.setTimeout(() => {
        window.scrollTo({ top, behavior: "smooth" })
      }, 100) // time too... as props
    }
  }, [id])
}

const BasicTemplate = props => {
  let sketch
  const { pageContext } = props
  const { pageContent } = pageContext
  useScrollTo('scrollTo')

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