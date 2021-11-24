import React from 'react';
import './Spin.css'

export const Spin = () => {
  return (
    <>
      <div className="container">
        <div className="loading-spinner-bean-eater aling-center">
          <div className="spin">
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};