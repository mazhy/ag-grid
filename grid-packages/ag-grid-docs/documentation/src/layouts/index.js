import React from 'react';
import {Helmet} from 'react-helmet';
import {GlobalContextProvider} from 'components/GlobalContext';
import HeaderNav from 'components/HeaderNav';
import Menu from 'components/Menu';
import Footer from 'components/footer/Footer';
import Search from 'components/search/Search';
import FrameworkSelector from 'components/FrameworkSelector';
import favIcons from '../images/favicons';
import logo from '../images/ag-grid.svg';
import styles from './index.module.scss';
import './mailchimp.css';

const TopBar = ({frameworks, framework, path}) => (
    <div className={styles['top-bar']}>
        <div className={styles['top-bar__wrapper']}>
            <div className={styles['top-bar__search']}>
                <button
                    className={styles['top-bar__nav-button']}
                    type="button" data-toggle="collapse"
                    data-target="#side-nav"
                    aria-controls="side-nav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className={styles['top-bar__nav-button-icon']}></span>
                </button>
                <Search currentFramework={framework}/>
            </div>
            <div className={styles['top-bar__framework-selector']}>
                <FrameworkSelector frameworks={frameworks} path={path} currentFramework={framework}/>
            </div>
        </div>
    </div>
);

/**
 * This controls the layout template for all pages.
 */
export const Layout = ({children, pageContext: {frameworks, framework = 'javascript', layout, pageName}, location: {pathname: path}, data}) => {

    if (layout === 'bare') { // only for on the fly example runner
        return children;
    }

    // takes account of archives too
    const processedPath = path.replace(/.*archive\/[0-9]{1,2}.[0-9].[0-9]/,'');

    const fullScreenPage = processedPath === '/' ||
        processedPath === '/example' || processedPath === '/example/';

    const fullScreenWithFooter = processedPath === '/license-pricing' || processedPath === '/license-pricing/' ||
        processedPath === '/about' || processedPath === '/about/' ||
        processedPath === '/cookies' || processedPath === '/cookies/' ||
        processedPath === '/changelog' || processedPath === '/changelog/' ||
        processedPath === '/pipeline' || processedPath === '/pipeline/' ||
        processedPath === '/privacy' || processedPath === '/privacy/';

    return <GlobalContextProvider>
        <Helmet>
            {getFavicons()}
            {getAppleTouchIcons()}
        </Helmet>
        <div className={styles['main-container']}>
            <Helmet htmlAttributes={{lang: 'en'}}/>
            <header className={styles.header}>
                <div className={styles.header__wrapper}>
                    <a href="/" aria-label="Home" className={styles['header__logo']}><img src={logo} alt="AG Grid" style={{width: 235, height: 40}}/></a>
                    <HeaderNav path={path}/>
                </div>
            </header>
            {(!fullScreenPage && !fullScreenWithFooter) && <TopBar frameworks={frameworks} framework={framework} path={path}/>}
            <div className={styles['content-viewport']}>
                {(!fullScreenPage && !fullScreenWithFooter) &&
                    <aside className={`${styles['main-menu']}`}>
                        <Menu currentFramework={framework} currentPage={pageName}/>
                    </aside>}
                <main is="div" className={styles['content']}>
                    {children}
                </main>
            </div>
        </div>
        {(!fullScreenPage || fullScreenWithFooter) && <Footer framework={framework}/>}
    </GlobalContextProvider>;
};

const getFavicons = () =>
    [196, 192, 180, 167, 152, 128, 32].map(size => <link key={size} rel="icon" type="image/png" sizes={`${size}x${size}`}
                                                         href={favIcons[`favIcon${size}`]}/>);

const getAppleTouchIcons = () =>
    [180, 167, 152].map(size => <link key={size} rel="apple-touch-icon" sizes={`${size}x${size}`} href={favIcons[`favIcon${size}Touch`]}/>);

export default Layout;
