import React from "react";
import Background from "../components/BackgroundP5";
import Layout from '../components/Layout'
import { Link } from "gatsby"
import "tachyons/css/tachyons.min.css";

const IndexPage = () => (
    <div className="">
        {/* <Background/> */}
        <Layout>
        <div className="">
          <p className="">Hey!</p>
          <p className="">I'm a Berlin based web developer with a passion for music.</p>
          <p className="">I love creating stuff with
            <Link className="green" to='/code'> code</Link>, making
            <Link className="" to='/code'> music</Link> and taking
            <Link className="" to='/code'> pics</Link>.
          </p>
          <p className="">You can find me on
          <Link className="" to='/code'> twitter</Link>, 
          <Link className="" to='/code'> soundcloud</Link> and
          <Link className="" to='/code'> instagram</Link>.</p>
        </div>
      </Layout>        
    </div>

  )

  export default IndexPage
  