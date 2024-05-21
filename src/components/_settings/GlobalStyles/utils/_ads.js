import React from 'react';

function AdsClasses() {
  return (
    <style jsx global>
      {`
      .ads__small{
        min-height: 70px;
      }
      .ads__normal{
        min-height: 147px;
      }
      .ads__medium{
        min-height: 270px;
      }
      .ads__big{
        min-height: 620px;
      }
      `}
    </style>
  );
}

export default AdsClasses;
