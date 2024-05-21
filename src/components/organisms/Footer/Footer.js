import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import omit from 'object.omit';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { useDeviceScreen } from '../../_settings/Hooks/useDeviceScreen';
import { handleCreateStyleClass } from '../../_settings/Utils';

import Paragraph from '../../atoms/Paragraph';
import Divider from '../../atoms/Divider';
import Image from '../../atoms/Image';
import List from '../../atoms/List';
import Box from '../../atoms/Box';
import A from '../../atoms/A';

import LegalItems from '../../molecules/LegalItems';
import NewsletterBox from '../../molecules/NewsletterBox';
import SocialLinks from '../../molecules/SocialLinks';
import ExternalLinks from '../../molecules/ExternalLinks';
import LanguageVersions from '../../molecules/LanguageVersions';
import HONCodeBox from '../../molecules/HONCodeBox';
import TitleCustom from '../../molecules/TitleCustom';

import Container from '../../atoms/Container';
import Row from '../../atoms/Row';
import Col from '../../atoms/Col';

function Footer({
  honCode, platformConfig, showAppsLink, socialLinks, externalLinks, versionLinks,
  legalLinks, sidebars, basePath, messages, linksWithFullRefresh, showNewsletter,
  fnOnSubmitNewsletter, utm, ...props
}) {
  const {
    theme, cdnPath, locale, direction, getColor, colorMode
  } = useTheme();
  const { isDesktop } = useDeviceScreen();

  const {
    link,
    logo,
    copyrightName,
    since,
    name,
    description,
    disclaimer,
  } = platformConfig;

  const propsBlacklist = [
    'honCode',
    'platformConfig',
    'showAppsLink',
    'socialLinks',
    'externalLinks',
    'versionLinks',
    'legalLinks',
    'sidebars',
    'basePath',
    'messages',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const { className, styles } = css.resolve`
    @media only screen and (min-width: ${theme.medias.tablet}){
      .honcode_divider {
        display: none;
      }
    }

    .logo-area__image_container {
      position: relative;
      width: 198px;
      height: 48px;
    }

    .list__link{
      display: block;
      line-height: 1.5;
      color: ${getColor(colorMode === 'dark' ? 'main.1000' : 'main.50')};
      font-family: ${theme.fontFamilies.sans};
    }
  `;

  const baseColor = () => {
    if (theme.footerBaseColor !== undefined) return theme.footerBaseColor;
    return 'main';
  };

  return (
    <>
      {showNewsletter && (
        <NewsletterBox
          mainNewsletter
          withImage
          // eslint-disable-next-line no-alert
          onSubmit={fnOnSubmitNewsletter}
          title={messages.newsletter.title}
          description={messages.newsletter.description}
          messages={{
            subscribe: messages.subscribeNewsletter,
            acceptNewsletterTerms: messages.newsletter.acceptNewsletterTerms,
            registrationConfirmationMessage: messages.newsletter.registrationConfirmationMessage,
            inputPlaceholder: messages.newsletter.inputPlaceholder
          }}
          list="general"
        />
      )}
      <footer
        className={`footer ${handleCreateStyleClass(props)} zi--8 bc--${baseColor()}-${colorMode === 'dark' ? '100' : '800'} ptb--x-big p--relative`}
        {...allowedProps}
      >

        <Container wrap className="plr--big">
          <Row>
            { !logo && (
              <>
                {versionLinks?.length >= 1 ? (
                  <Col colSize="fixed" className="column__symbol">
                    <Box className="symbol-area d--table mlr--auto mb--normal">
                      <A to={basePath} utm={utm} className="d--inline-block">
                        <Image
                          className="symbol-area__image o--50"
                          src={`${cdnPath}themes/${theme.base}/symbol.svg`}
                          alt={platformConfig.name}
                          width={`${!isDesktop ? '72' : '232'}`}
                          height={`${!isDesktop ? '72' : '232'}`}
                          layout="intrinsic"
                          lazy
                        />
                      </A>
                    </Box>
                  </Col>
                ) : (
                  <Col colSize="12">
                    <Box className="logo-area d--table mlr--auto mb--normal">
                      <A to={basePath} className={`logo-area__image_container d--inline-block ${className}`} externalLink={linksWithFullRefresh}>
                        <Image
                          className="logo-area__image o--25"
                          src={`${cdnPath}themes/${theme.base}/${locale}/logo__mobile--reverse.svg`}
                          alt={platformConfig.name}
                          lazy
                        />
                      </A>
                    </Box>
                  </Col>
                )}
              </>
            )}

            <Col colSize={versionLinks?.length >= 1 ? 'auto' : '12'}>

              <Row>
                {versionLinks && (
                  <Col colSize="12">
                    <LanguageVersions links={versionLinks} messages={messages} utm={utm} platformConfig={platformConfig} />
                  </Col>
                )}
                {showAppsLink && (
                  <Col colSize="6" className="apps-buttons__col d--flex ai--center">
                    <Box className="w--100 d--flex ai--center jc--space-around">
                      <A externalLink to="https://play.google.com/store/apps/details?id=APP_ID" target="_blank" className="button__play-store d--table mlr--auto mtb--small">
                        <Image src={`${cdnPath}shared/button__play-store.png`} width="162" height="48" alt="Button Play Store" lazy />
                      </A>
                      <A externalLink to="https://play.google.com/store/apps/details?id=APP_ID" target="_blank" className="button__mobile-store d--table mlr--auto mtb--small">
                        <Image src={`${cdnPath}shared/button__apple-store.png`} width="162" height="48" alt="Button Apple Store" lazy />
                      </A>
                    </Box>
                  </Col>
                )}
                <Col colSize={versionLinks.length >= 1 && showAppsLink ? '6' : '12'}>
                  {(socialLinks.length > 0) && (
                    <TitleCustom titleIsSpan type="h3" textColor={`main.${colorMode === 'dark' ? '1000' : '50'}`} lineType="dashed" lineColor={`main.${colorMode === 'dark' ? '700' : '200'}`} className={`pt--big pb--normal ${versionLinks.length === 0 && 'ta--center'}`}>
                      {messages.followUs}
                    </TitleCustom>
                  )}
                  <SocialLinks links={socialLinks} iconColor={`${baseColor()}.${colorMode === 'dark' ? '700' : '300'}`} className={`social-list-footer ${className} d--flex ${isDesktop && ((versionLinks && versionLinks[0]) || showAppsLink) ? 'jc--start' : 'jc--center'} mtb--big`} />
                </Col>
              </Row>

            </Col>
          </Row>
          {(externalLinks?.length > 0 || sidebars.length > 0) && (
            <>
              { !logo && <Divider color={`${baseColor()}.${colorMode === 'dark' ? '300' : '600'}`} className="mtb--big" /> }
              <Row className={`${sidebars?.length < 2 ? 'two' : 'three'}__columns__padding`}>
                {sidebars && sidebars?.map((sidebar) => (
                  <Col colSize={`${sidebars.length < 2 ? '6' : '4'}`} key={sidebar.id}>
                    <Box className="about-area pt--big">
                      <TitleCustom titleIsSpan type="h3" textColor={`main.${colorMode === 'dark' ? '700' : '300'}`} lineType="dashed" lineColor={`main.${colorMode === 'dark' ? '700' : '300'}`} className="pb--normal">
                        {sidebar?.options?.title}
                      </TitleCustom>
                      <List className={`${className} footer__list`}>
                        {Array.isArray(sidebar?.content) && sidebar?.content?.map((item) => <li key={item.ID}><A to={item.link} externalLink target="_blank" hoverColor="main.300" className={`list__link ${className} ptb--normal`}>{item.title}</A></li>)}
                      </List>
                    </Box>
                  </Col>
                ))}

                <Col colSize={`${sidebars.length >= 2 ? '4' : `${sidebars.length === 1 ? '6' : '12'}`}`}>
                  <ExternalLinks utm={utm} links={externalLinks} messages={{ otherSites: messages.otherSites }} className="pt--big" />
                </Col>

              </Row>
            </>
          )}

          <Divider color={`${baseColor()}.${colorMode === 'dark' ? '300' : '600'}`} className="mtb--big" />

          <Row>
            <Col colSize="auto">
              <Box className="copyright-area">
                <A externalLink to={link || ''} target="_blank" rel="noopener" className="copyright-area__logo mtb--big mlr--auto d--table">
                  <Image src={`${cdnPath}${logo || 'shared/logo_.png'}`} alt={copyrightName || 'NAME'} width="190" height="32" lazy />
                </A>
                <Paragraph textColor={`${baseColor()}.${colorMode === 'dark' ? '700' : '300'}`} size="small" className="copyright-area__text lh--1-4 ptb--normal">
                  <strong>{name}</strong>
                  {' '}
                  {description}
                  <br />
                  {`© ${since || '2012'} – ${new Date().getFullYear()} `}
                  .
                  {' '}
                  {messages.allRightsReserved}
                  <br />
                  <br />
                  {disclaimer}
                </Paragraph>
              </Box>

            </Col>
            {honCode && (
              <>
                <Divider className={`honcode_divider ${className} mtb--big`} color={`${baseColor()}.${colorMode === 'dark' ? '400' : '600'}`} />
                <Col colSize="fixed" className="column__hon d--flex">
                  <HONCodeBox code={honCode} messages={messages} textColor={`${baseColor()}.${colorMode === 'dark' ? '700' : '300'}`} />
                </Col>
              </>
            )}
          </Row>

          <Divider color={`${baseColor()}.${colorMode === 'dark' ? '300' : '600'}`} className="mtb--big" />

          <LegalItems
            className="ta--center"
            legalLinks={legalLinks}
            textColor={`main.${colorMode === 'dark' ? '1000' : '50'}`}
          />

        </Container>

        {/* custom components styles */}
        {styles}
      </footer>

      <style jsx global>
        {`

          .copyright-area__logo {
            height: 32px;
            width: 190px;
          }

          /* ***
          This style can be placed in css.resolve, but all components,
          and html elements must use className
          */
          @media only screen and (min-width: ${theme.medias.tablet}){
            // ---
            .footer{
              padding-top: ${theme.sizes[6]};
            }

            // ---
            .column__symbol {
              width:232px;
              ${direction === 'rtl' ? 'margin-left:24px;' : 'margin-right:24px;'}
            }

            // ---
            .apps-buttons__col {
              order: 2;
            }

            // ---
            .copyright-area {
              display: flex;
              align-items: center;
            }
            .copyright-area__logo {
              min-width:190px;
              ${direction === 'rtl' ? 'margin-left:24px;' : 'margin-right:24px;'}
            }

            // ---
            .column__hon {
              width: 320px;
              align-items: center;
            }

          }

        `}
      </style>
    </>
  );
}

Footer.defaultProps = {
  showAppsLink: false,
  basePath: '/',
  messages: {
    isAvailableIn: 'también está disponible en:',
    allRightsReserved: 'All rights reserved.',
    otherSites: 'Otros websites',
    followUs: 'Síguenos en',
    honCodeAccreditation: 'Esta página cumple con los estándares de calidad informativa',
    honCodeLinkText: 'Compruébelo aquí.',
    honCodeImgDesc: 'Nosotros subscribimos Los Principios del código HONcode de la Fundación Salud en la Red',
    subscribeNewsletter: 'Suscribirse',
    newsletter: {
      acceptNewsletterTerms: 'Acepto los términos, condiciones y la política de privacidad.',
      registrationConfirmationMessage: 'Gracias, le enviamos un correo electrónico para confirmar su suscripción a nuestro boletín.',
      title: 'Suscríbete a nuestro boletín de noticias',
      description: 'Inspírate semanalmente con las novedades, los artículos más leídos, y sugerencias elegidas especialmente para ti.',
      inputPlaceholder: 'Insere tu correo'
    }
  },
  showNewsletter: false,
  fnOnSubmitNewsletter: () => {}
};

Footer.propTypes = {

  /**
   * List of social medias from the site
   */
  socialLinks: PropTypes.array,

  /**
   * List of legal links and pages links from the site
   */
  legalLinks: PropTypes.array,

  /**
   * Config info about current platform
   */
  platformConfig: PropTypes.shape({
    link: PropTypes.string,
    logo: PropTypes.string,
    copyrightName: PropTypes.string,
    since: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    disclaimer: PropTypes.string,
  }),

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * Enables Apps Links for download.
   */
  showAppsLink: PropTypes.bool,

  /**
   * About Links list.
   */
  sidebars: PropTypes.array,

  /**
   * External Links list.
   */
  externalLinks: PropTypes.array,

  /**
   * Version Links list.
   */
  versionLinks: PropTypes.array,

  /**
   * HONCode ID
   */
  honCode: PropTypes.string,

  /**
   * Path for home page
   */
  basePath: PropTypes.string,

  /**
   * Text for component
   */
  messages: PropTypes.shape({
    allRightsReserved: PropTypes.string,
    followUs: PropTypes.string,
    isAvailableIn: PropTypes.string,
    otherSites: PropTypes.string,
    honCodeAccreditation: PropTypes.string,
    honCodeLinkText: PropTypes.string,
    honCodeImgDesc: PropTypes.string,
    subscribeNewsletter: PropTypes.string,
    newsletter: PropTypes.shape({
      acceptNewsletterTerms: PropTypes.string,
      registrationConfirmationMessage: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      inputPlaceholder: PropTypes.string,
    })
  }),

  /**
   * for full refresh home
   */
  linksWithFullRefresh: PropTypes.bool,

  /**
   * Whether to render newsletter button or not.
   * Note: We should remove it when newsletter was implemented.
   */
  showNewsletter: PropTypes.bool,

  /**
   * function for sending email to api
   */
  fnOnSubmitNewsletter: PropTypes.func,

  /**
   * UTM informations
   */
  utm: PropTypes.shape({
    source: PropTypes.string,
    medium: PropTypes.string,
    campaign: PropTypes.string
  }),
};

export default Footer;
