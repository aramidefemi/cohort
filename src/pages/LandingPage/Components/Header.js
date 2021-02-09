import React from 'react';
import Navbar from './Navbar';
import imgOne from '../../../assets/images/header/2.svg';
import imgTwo from '../../../assets/images/header/1.svg';
import imgThree from '../../../assets/images/header/3.svg';
import SwitchComponent from '../../../common/SwitchComponent';


const Header = () => {
  return (
    <div className="header">
      <Navbar />
      <div className="banner">
        <div className="title">
          <h1>Healthcare At<br/>Your Fingertips</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />Nunc odio in et, lectus sit lorem id integer.</h4>
          <button className="primary">Get Started</button>
        </div>
        <div className="images">
        {/* <SwitchComponent case={'one'} components={components} /> */}
        </div>

        
      </div>
    </div>
  );
};

const ImageOne = () => {
  return (
    <div className="ImageOne">
      <img src={imgOne} alt="" />
    </div>
  );
};

const components = {
  one: {
    component: ImageOne
  }
}
export default Header;
