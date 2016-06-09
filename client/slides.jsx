import React from 'react';
import Slider from 'react-viewport-slider';


const Slides = () => (
  <Slider>
    <div itemStyle={{ backgroundColor: '#002D8E' }}>
      <div className="Aligner  centering text-center">
        <div className="col-md-8 Aligner-item choiceContainer">
          <div className="content h1">You</div>
        </div>
      </div>
    </div>
    <div itemStyle={{ backgroundColor: '#00B1F2' }}>
      <div className="Aligner centering text-center">
        <div className="col-md-8 Aligner-item choiceContainer">
          <div className="content h1">Casual</div>
        </div>
      </div>
    </div>
    <div itemStyle={{ backgroundColor: '#0099F2'}}>
      <div className="Aligner  centering text-center">
        <div className="col-md-8 Aligner-item choiceContainer">
          <div className="content h1">Professional</div>
        </div>
      </div>
    </div>
    <div itemStyle={{ backgroundColor: '#F2D500' }}>
      <div className="Aligner  centering text-center">
        <div className="col-md-8 Aligner-item choiceContainer">
          <div className="content h1">Outdoors</div>
        </div>
      </div>
    </div>
    <div itemStyle={{ backgroundColor: '#C9009D' }}>
      <div className="Aligner  centering text-center">
        <div className="col-md-8 Aligner-item choiceContainer">
          <div className="content h1">You're done!</div>
        </div>
      </div>
    </div>
  </Slider>
);

export default Slides;
