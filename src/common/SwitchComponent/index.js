import React from 'react';

const SwitchComponent = ({ case: key, components, data }) => { 
  const Component = components[key]['component'];
  return <Component {...data} />;
};

export default SwitchComponent;
