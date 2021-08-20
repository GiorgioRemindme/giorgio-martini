import React from "react";
import Background from "../components/BackgroundP5";
import Layout from '../components/Layout'
import { Link } from "gatsby"
import "tachyons/css/tachyons.min.css";
import "../styles/global.css";

const IndexPage = () => (
    <div className="">
        <Background/>
        <Layout isDarkMode={false}>
        <div className="pt1">
          <p className="b white f-subheadline">Hey, I'm Giorgio Martini.</p>
          <p className="b white f-title">I'm a Frontend developer based in Berlin.</p>
          <p className="white">I also love to create Art with <Link className="_pink" to='/code'>code</Link>, making <Link className="_pink" to='/code'>music</Link> and taking <Link className="_pink" to='/code'>pics</Link>.
          <p className="white">You can read more about me <Link className="_pink" to='/code'>here</Link>.</p>
          </p>
        </div>
      </Layout>        
    </div>
  )

  export default IndexPage
  