import React from 'react';
import { Spinner } from 'react-bootstrap';
import "../index.css"
const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Spinner animation="border" role="status">
      </Spinner>
      <p className='loader'>loading please wait ...</p>
    </div>
  );
};

export default LoadingSpinner;
