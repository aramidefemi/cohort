import React, { useState } from 'react';
import DashboardWrapper from '../../components/DashboardWrapper';

// Components
import DashboardStats from './DashboardStats';
import PatientRecord from './PatientRecord';
import SearchPatientRecord from './SearchPatientRecord';

const ProvidersDashboard = () => {
  const [which, setWhich] = useState('DashboardStats');
  const toggleRecords = (x) => setWhich(x);

  return (
    <DashboardWrapper type="provider">
      <Which which={which} toggleRecords={toggleRecords} />
    </DashboardWrapper>
  );
};

const Which = ({ which, toggleRecords }) => {
  switch (which) {
    case 'DashboardStats':
      return <DashboardStats toggleRecords={toggleRecords} />;
    case 'SearchPatientRecord':
      return <SearchPatientRecord toggleRecords={toggleRecords} />;
    case 'PatientRecord':
      return <PatientRecord toggleRecords={toggleRecords} />;
    default:
      return <DashboardStats toggleRecords={toggleRecords} />;
  }
};
export default ProvidersDashboard;
