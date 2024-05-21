/* eslint-disable linebreak-style */
import { useEffect, useState } from 'react';
import { useAmp } from 'next/amp';

/**
 * useDeviceScreen
 * @param {object} sizes Categorical screen sizes
 * @param {object} devices Devices gathered by mobile-detect lib or compatible
 */
const MobileDetect = require('mobile-detect');

const getDevices = (userAgent) => {
  const md = new MobileDetect(userAgent);
  return {
    isPhone: !!md.phone(),
    isTablet: !!md.tablet(),
    isDesktop: !md.phone() && !md.tablet()
  };
};

export const useDeviceScreen = (userAgent = null, phone = 480, desktop = 900) => {
  const [width, setWidth] = useState(false);
  const devices = getDevices(userAgent);
  const isAmp = useAmp();

  useEffect(() => {
    if (!window) return width;

    if (!width) {
      setWidth(window.innerWidth);
    }

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  if (isAmp) {
    return {
      width, isPhone: true, isTablet: false, isDesktop: false, isMobile: true
    };
  }
  return {
    width,
    isPhone: width ? width <= phone : devices.isPhone,
    isTablet: width ? width > phone && width < desktop : devices.isTablet,
    isDesktop: width ? width >= desktop : devices.isDesktop,
    isMobile: width ? width <= phone || (width > phone && width < desktop) : devices.isPhone || devices.isTablet
  };
};

export default useDeviceScreen;
// export { useDeviceScreen };
