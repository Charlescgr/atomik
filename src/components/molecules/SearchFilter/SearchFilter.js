import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';

import { useAmp } from 'next/amp';

import InputField from '../../atoms/InputField';
import Heading from '../../atoms/Heading';
import Divider from '../../atoms/Divider';
import Button from '../../atoms/Button';
import Label from '../../atoms/Label';
import Icon from '../../atoms/Icon';
import Box from '../../atoms/Box';

import { handleCreateStyleClass, hexToRgb } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

function SearchFilter({
  messages, title, filtersList, returnFilter, ...props
}) {
  const { theme, getColor, direction } = useTheme();
  const isAmp = useAmp();

  // -- states
  const [showFilter, setShowFilter] = useState(false);
  const [filtersChecked, setFiltersChecked] = useState('');
  const [rangeVal, setRangeVal] = useState(null);

  // -- allowed props
  const propsBlacklist = [
    'title',
    'messages',
    'filtersList',
    'returnFilter',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const mediaStyles = css.resolve`
     @media only screen and (min-width: ${theme.medias.tablet}){
      .filter{
        width: 25%;
      }
    }
  `;

  // -- css/style
  const { className, styles } = css.resolve`
    .filter {
      position: fixed;
      visibility: hidden;
      backface-visibility: hidden;
      transform: translateX(-50%) translateY(-50%);
      top: 50%;
      height: 100vh;
      width: 100%;
    }
    .filter--show{
      visibility: visible;
    }
    .filter__overlay {
      position: fixed;
      top: 0;
      ${direction === 'rtl' ? 'right' : 'left'}: 0;
      width:100%;
      height: 100%;
      oopacity: 0;
      background: rgba(${hexToRgb(getColor('grey-cold.100'))}, 0.75);
      visibility: hidden;
    }
    .filter__overlay.fade{
      animation-duration:0.25s;
    }
    .filter__content {
      background-color: ${getColor('main.50')};
      box-shadow: ${theme.shadows.default};
      overflow-x: inherit;
      overflow-y: auto;
    }
    .filter--show.filter__content,
    .filter--show.filter__overlay{
      visibility: visible;
    }

    // Sticky on right - animation
    .sticky-right{
      ${direction === 'rtl' ? 'left' : 'right'}: 0;
      transform: translateY(-50%);
    }
    .sticky-right .filter__content {
      transform: translateX(${direction === 'rtl' ? '-200%' : '200%'});
      transition: all .3s;
      opacity: 0;
    }
    .filter--show.sticky-right .filter__content {
      transform: translateX(0%);
      border-radius: 3px 0 0 3px;
      opacity: 1;
    }

    @media only screen and (min-width: ${theme.medias.mobile}){
      .filter{
        width: 50%;
      }
    }
  `;

  // -- scripts
  const handleFilter = (v) => {
    setShowFilter(!showFilter);
    returnFilter(v);
    setFiltersChecked(!filtersChecked);
    document.body.classList.toggle('filter-open');
  };

  return (
    <Box
      className={`search-filter ${className} ${mediaStyles.className} ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      <Button
        hasIcon
        rounded
        color="main.400"
        textColor="white"
        onClick={handleFilter}
        className={`filter__button d--flex ${className} ${direction === 'rtl' ? 'fd--row' : ''}`}
      >
        <Icon
          name="filter-alt"
          color="white"
          className="mr--normal"
        />
        {messages.labelFilterButton}
      </Button>
      <Box className={`filter__group ${className} ${mediaStyles.className} zi--11`}>
        <Box className={`filter ${className} ${mediaStyles.className} sticky-right zi--11 ${showFilter} ${showFilter ? 'filter--show' : ''}`}>
          <Box className={`filter__content ${className} ${mediaStyles.className} p--x-big mtb--0 h--100 p--relative zi--11`}>
            <Button
              className={`filter__button ${className} ${mediaStyles.className} p--absolute t--0 ${direction === 'rtl' ? 'l' : 'r'}--0`}
              onClick={handleFilter}
              onlyIcon
            >
              <Icon name="x" color="black" />
            </Button>

            <Heading type="h3" textColor="main.800" lineType="dashed" lineColor="main.200" className="mb--normal">
              <Icon inline size="normal" color="grey-cold.300" prefix="bx" name="filter-alt" className="mr--normal" />
              {title}
            </Heading>

            {filtersList.map(({
              ID, title: subtitle, values, type
            }) => (
              <React.Fragment key={ID}>
                <Heading type="h3" textColor="main.800" size="medium" lineType="dashed" lineColor="main.200" className="pb--normal mb--normal">
                  {subtitle}
                </Heading>
                {values.map(({ ID: subId, label, posts }) => {
                  if (type === 'range') {
                    const objName = `label_${subId}`;
                    return (
                      <InputField
                        key={subId}
                        type="range"
                        min="10"
                        step="1"
                        max={label}
                        value={rangeVal !== null ? rangeVal[objName] : (label / 2)}
                        onChange={
                          (v) => setRangeVal((prevState) => ({
                            ...prevState,
                            [objName]: v
                          }))
                        }
                      />
                    );
                  }
                  return (
                    <React.Fragment key={subId}>
                      <InputField
                        type="checkbox"
                        id={`filter-${label}`}
                        name={`filter-${label}`}
                        className="d--inline-block"
                        borderColor="main.200"
                      />
                      <Label htmlFor={`filter-${label}`} className="d--inline-block c--main-700 fs--normal ff--sans lh--2 mtb--big">
                        {label}
                        {' '}
                        (
                        {posts}
                        )
                      </Label>
                    </React.Fragment>
                  );
                })}
                <Divider color="main.200" className="mb--big mt--x-big" />
              </React.Fragment>
            ))}

          </Box>
        </Box>
        <Box className={`filter__overlay ${className} ${mediaStyles.className} ${showFilter ? 'filter--show fade' : ''} zi--10`} onClick={handleFilter}></Box>
      </Box>

      {/* custom styles */}
      {styles}
      {!isAmp && mediaStyles.styles}
      <style jsx global>
        {`
        body.filter-open{
          overflow: hidden;
        }
        body.filter-open .reading-bar{
          display: none;
        }
      `}
      </style>
    </Box>
  );
}

SearchFilter.propTypes = {
  /**
   * Text for component
   */
  messages: PropTypes.shape({
    labelFilterButton: PropTypes.string
  }),

  /**
   * The title
   */
  title: PropTypes.string,

  /**
   * The filter object
   */
  filtersList: PropTypes.arrayOf(
    PropTypes.shape({
      ID: PropTypes.number,
      title: PropTypes.string,
      type: PropTypes.string,
      values: PropTypes.arrayOf(
        PropTypes.shape({
          ID: PropTypes.number,
          label: PropTypes.string,
          posts: PropTypes.number
        })
      )
    })
  ).isRequired,

  /**
   * Return selected filters
   */
  returnFilter: PropTypes.func,

  /**
   * The custom classnames
   */
  className: PropTypes.string
};

export default SearchFilter;
