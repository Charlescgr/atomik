import React from 'react';

function AnimationClasses() {
  return (
    <style jsx global>
      {`
      .fade {
        animation-name: fadeIn;
        animation-duration: 1s;
        will-change: opacity;
      }
      @keyframes fadeIn {
        from {opacity: 0;}
        to {opacity: 1;}
      }

      `}
    </style>
  );
}

export default AnimationClasses;
