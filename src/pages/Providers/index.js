import React, { useState } from 'react';
import DashboardWrapper from '../../components/DashboardWrapper';

// Components
import DashboardStats from './DashboardStats';
import PatientRecord from './PatientRecord';
import SearchPatientRecord from './SearchPatientRecord';

const ProvidersDashboard = () => {
  const [showRecords, setShowRecords] = useState(false);
  const toggleRecords = () => setShowRecords(!showRecords);

  return (
    <DashboardWrapper type="provider">
      {showRecords ? (
        <SearchPatientRecord toggleRecords={toggleRecords} />
      ) : (
        <DashboardStats toggleRecords={toggleRecords} />
      )}
    </DashboardWrapper>
  );
};
const Which = ({ which, toggleRecords }) => {
  switch (which) {
    case 'DashboardStats':
      return <DashboardStats toggleRecords={toggleRecords} />;

    default:
      break;
  }
};
export default ProvidersDashboard;
