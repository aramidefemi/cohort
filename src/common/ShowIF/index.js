import React from 'react';

const ShowIF = ({ show, props, Child }) => { 
  return  show ?  <Child {...props} /> : '';
};

export default ShowIF;
