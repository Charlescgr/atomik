import React from 'react';
import { shallow } from 'enzyme';
import Heading from '../Heading';
import { ThemeProvider } from '../../../_settings/ThemeProvider/ThemeContext';

describe('Heading', () => {
  it('should display an default Heading', () => {
    const heading = shallow(<Heading>Test</Heading>);
    expect(heading.find('h1').length).toBe(1);
  });

  it('renders a h2 Heading', () => {
    expect(shallow(<Heading type="h2">Test</Heading>).find('h2')).toBeTruthy();
  });

  it('renders a Heading with red color and h3 font-size', () => {
    expect(shallow(<ThemeProvider><Heading type="h3" size="big" textColor="red">Test</Heading></ThemeProvider>).find('.fs--big.c--red'));
  });
});
