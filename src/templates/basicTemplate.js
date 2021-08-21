import React from "react"
import { Link } from "gatsby"
import DancingLines from "../sketches/DancingLines";
import Layout from '../components/Layout'

const basicTemplate = props => {
  const { pageContext } = props
  const { pageContent } = pageContext

  return (
    <Layout isDarkMode={false}>
      <div>
        <h1>{pageContent[0].item}</h1>
        <h1>{pageContent[1].item}</h1>
        <DancingLines />
      </div>
    </Layout>        

  )
}
export default basicTemplate