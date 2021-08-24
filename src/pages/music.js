import React from "react";
import ReactPlayer from "react-player"
import Layout from '../components/Layout'
import { Link } from 'gatsby'
import 'tachyons/css/tachyons.min.css';
import '../styles/global.css'
import DancingLines from '../sketches/DancingLines'

const Music = () => (
  <div className="">
    <Layout>
      <div className="">
        <p className="fadeInAnimation b f-subheadline pb4">A mix of electronic Jazz, glitch and experimental sounds.</p>
        <div className="cf">
          <div className="fl w-100 w-50-ns pa0">
            <p className="ma0 pr4">
              From traditional electronic music to pure sound design and unorthodox rhythms,
              I like  to create music that is a bit unconventional.
            </p>
          </div>

          <div className="fl w-100 w-50-ns pa0">
            <ReactPlayer
              url="https://soundcloud.com/giorgiomartini"
              width="100%"
            />
          </div>
        </div>
      </div>
    </Layout>
    <div className=""></div>
  </div>
)

export default Music
