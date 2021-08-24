import React, { useLayoutEffect } from "react"
import { Link } from "gatsby"
import DancingLines from "../sketches/DancingLines";
import ProbableFuture from "../sketches/ProbableFuture";
import Layout from '../components/Layout'

let sketches = {
  dancingLines: <DancingLines />,
  probableFuture: <ProbableFuture />,
}

// move somewhere...
const useScrollTo = id => {
  useLayoutEffect(() => {
    if (id) {
      const el = document.getElementById(id)
      const top = window.scrollY + el.getBoundingClientRect().top - 130 // add offset as props
      window.setTimeout(() => {
        window.scrollTo({ top, behavior: "smooth" })
      }, 1000) // time too... as props
    }
  }, [id])
}

const BasicTemplate = props => {
  let sketch
  useScrollTo('scrollTo')
  const { pageContext } = props
  const { pageContent } = pageContext

  for (const [key, value] of Object.entries(sketches)) {
    if (key.toLocaleLowerCase === pageContent[0].item.toLocaleLowerCase) {
      sketch = value
    } // else
  }
  

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