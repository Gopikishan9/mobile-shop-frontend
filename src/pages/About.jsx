import React from 'react'

function About() {
  return (
    <div className='about'>
      <img src="./slider/two.png" alt="shop-owner" className="hero"/>
      <img src="./slider/three.png" alt="shop-name" className="hero"/>
      <div className="goals">
        <div className="goal">
          <h4>Our Mission</h4>
          <p>Fair prices and real service for every customer.</p>
        </div>
        <div className="goal">
          <h4>Our Vision</h4>
          <p>The most trusted phone in this ciry.</p>
        </div>
      </div>
      <div className="experiences">
        <div className="experience">
          <p>10+</p>
          <p>Years</p>
        </div>
        <div className="experience">
          <p>10k+</p>
          <p>Buyers</p>
        </div>
        <div className="experience">
          <p>50+</p>
          <p>Models</p>
        </div>
      </div>
    </div>
  )
}

export default About
