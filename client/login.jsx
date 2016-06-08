import React from 'react'; 
import FacebookButton from './fbook-button'; 
import Button from 'react-bootstrap/lib/Button';

var Login = () => (
  <div>
      <div id="section-1" className="Aligner container">  
        <div className="col-md-8 col-md-offset-7 Aligner-item opaqueContainer">
          <h1>Photephra • /fʌ/ˈtɛ.fɹə/</h1>
          <h3>Photo curation for the perfect profile</h3>
          <FacebookButton className='col-md-3' />
        </div>
      </div>
  </div>
); 

export default Login; 

