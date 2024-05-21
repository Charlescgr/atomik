import React from 'react';
import { shallow } from 'enzyme';
import Paragraph from '../Paragraph';
import { ThemeProvider } from '../../../_settings/ThemeProvider/ThemeContext';

describe('Paragraph', () => {
  it('should display an Paragraph', () => {
    const paragraph = shallow(<Paragraph>text</Paragraph>);
    expect(paragraph.find('p').length).toBe(1);
  });

  it('should display an Paragraph with text color style', () => {
    expect(shallow(<ThemeProvider><Paragraph textColor="red.400">text</Paragraph></ThemeProvider>).find('.c--red-400'));
  });
});
