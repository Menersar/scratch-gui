import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {FormattedMessage, defineMessages, injectIntl, intlShape} from 'react-intl';
import {getIsLoading} from '../reducers/project-state.js';
import DOMElementRenderer from '../containers/dom-element-renderer.jsx';
import AppStateHOC from '../lib/app-state-hoc.jsx';
import ErrorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import SidekickProjectMetaFetcherHOC from '../lib/sidekick-project-meta-fetcher-hoc.jsx';
import SidekickStateManagerHOC from '../lib/sidekick-state-manager-hoc.jsx';
import SidekickThemeHOC from '../lib/sidekick-theme-hoc.jsx';
import SBFileUploaderHOC from '../lib/sb-file-uploader-hoc.jsx';
import SidekickPackagerIntegrationHOC from '../lib/sidekick-packager-integration-hoc.jsx';
import SidekickRestorePointHOC from '../lib/sidekick-restore-point-hoc.jsx';
import SettingsStore from '../addons/settings-store-singleton';
import '../lib/sidekick-fix-history-api';
import GUI from './render-gui.jsx';
import MenuBar from '../components/menu-bar/menu-bar.jsx';
import ProjectInput from '../components/sidekick-project-input/project-input.jsx';
import FeaturedProjects from '../components/sidekick-featured-projects/featured-projects.jsx';
import Description from '../components/sidekick-description/description.jsx';
import WebGlModal from '../containers/webgl-modal.jsx';
import BrowserModal from '../components/browser-modal/browser-modal.jsx';
import CloudVariableBadge from '../components/sidekick-cloud-variable-badge/cloud-variable-badge.jsx';
import {isRendererSupported, isBrowserSupported} from '../lib/sidekick-environment-support-prober';
import AddonChannels from '../addons/channels';
import {loadServiceWorker} from './load-service-worker';
import runAddons from '../addons/entry';

import styles from './interface.css';

if (window.parent !== window) {
    // !!! CHANGE !!!
    // eslint-disable-next-line no-alert
    alert('This page contains an invalid Sidekick embed. Please read https://github.com/Menersar/Sidekick#embedding for instructions to create a working embed.');
    // alert('This page contains an invalid Sidekick embed. Please read https://github.com/Mixality/Sidekick#embedding for instructions to create a working embed.');
    throw new Error('Invalid embed');
}

let announcement = null;
// !!!
// Unproblematic to do since process.env.ANNOUNCEMENT is set at build time.
if (process.env.ANNOUNCEMENT) {
    announcement = document.createElement('p');
    announcement.innerHTML = process.env.ANNOUNCEMENT;
}

const handleClickAddonSettings = () => {
    const path = process.env.ROUTING_STYLE === 'wildcard' ? 'addons' : 'addons.html';
    window.open(`${process.env.ROOT}${path}`);
};

const messages = defineMessages({
    defaultTitle: {
        defaultMessage: 'Run Scratch projects faster',
        description: 'Title of homepage',
        id: 'gui.guiDefaultTitle'
    }
});

const WrappedMenuBar = compose(
    SBFileUploaderHOC,
    SidekickPackagerIntegrationHOC
)(MenuBar);

if (AddonChannels.reloadChannel) {
    AddonChannels.reloadChannel.addEventListener('message', () => {
        location.reload();
    });
}

if (AddonChannels.changeChannel) {
    AddonChannels.changeChannel.addEventListener('message', e => {
        SettingsStore.setStoreWithVersionCheck(e.data);
    });
}

runAddons();

const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles.footerContent}>
            <div className={styles.footerText}>
                <FormattedMessage
                    // eslint-disable-next-line max-len
                    defaultMessage="Sidekick is not affiliated with Scratch, the Scratch Team, or the Scratch Foundation."
                    description="Disclaimer that Sidekick is not connected to Scratch"
                    id="gui.footer.disclaimer"
                />
            </div>
            <div className={styles.footerColumns}>
                <div className={styles.footerSection}>
                    <a href="credits.html">
                        <FormattedMessage
                            defaultMessage="Credits"
                            description="Credits link in footer"
                            id="gui.footer.credits"
                        />
                    </a>
                    <a href="https://scratch.mit.edu/donate">
                        <FormattedMessage
                            defaultMessage="Donate to support Scratch."
                            description="Donation link for Scratch in footer"
                            id="gui.footer.donate"
                        />
                    </a>
                    <a href="https://github.com/sponsors/GarboMuffin">
                        <FormattedMessage
                            defaultMessage="Donate to support TurboWarp"
                            description="Donation link for TurboWarp in footer"
                            id="gui.footer.donate.turbowarp"
                        />
                    </a>
                </div>
                <div className={styles.footerSection}>
                    {/* !!! CHANGE !!! */}
                    {/* <a href="https://mixality.github.io/Sidekick/sidekick-desktop"> */}
                    <a href="https://menersar.github.io/Sidekick/desktop/">
                        {/* Do not translate */}
                        {'Sidekick Desktop'}
                    </a>
                    {/* !!! CHANGE !!! */}
                    {/* <a href="https://mixality.github.io/Sidekick/sidekick-packager"> */}
                    <a href="https://menersar.github.io/Sidekick/packager/">
                        {/* Do not translate */}
                        {'Sidekick Packager'}
                    </a>
                    {/* !!! CHANGE !!! */}
                    {/* <a href="https://github.com/Mixality/Sidekick#embedding"> */}
                    <a href="https://github.com/Menersar/Sidekick#embedding">
                        <FormattedMessage
                            defaultMessage="Embedding"
                            description="Link in footer to embedding documentation for embedding link"
                            id="gui.footer.embed"
                        />
                    </a>
                    {/* !!! CHANGE !!! */}
                    {/* <a href="https://github.com/Mixality/Sidekick#url-parameters"> */}
                    <a href="https://github.com/Menersar/Sidekick#url-parameters">
                        <FormattedMessage
                            defaultMessage="URL Parameters"
                            description="Link in footer to URL parameters documentation"
                            id="gui.footer.parameters"
                        />
                    </a>
                    {/* !!! CHANGE !!! */}
                    {/* <a href="https://github.com/Mixality/Sidekick#readme"> */}
                    <a href="https://github.com/Menersar/Sidekick#readme/">
                        <FormattedMessage
                            defaultMessage="Documentation"
                            description="Link in footer to additional documentation"
                            id="gui.footer.documentation"
                        />
                    </a>
                </div>
                <div className={styles.footerSection}>
                    {/* !!! CHANGE !!! */}
                    {/* <a href="https://github.com/Mixality/Sidekick/issues"> */}
                    <a href="https://github.com/Menersar/Sidekick/issues">
                        <FormattedMessage
                            defaultMessage="Feedback & Bugs"
                            description="Link to feedback/bugs page"
                            id="gui.feedback"
                        />
                    </a>
                    {/* !!! CHANGE !!! */}
                    {/* <a href="https://github.com/Mixality/Sidekick/"> */}
                    <a href="https://github.com/Menersar/Sidekick/">
                        <FormattedMessage
                            defaultMessage="Source Code"
                            description="Link to source code"
                            id="gui.code"
                        />
                    </a>
                    <a href="privacy.html">
                        <FormattedMessage
                            defaultMessage="Privacy Policy"
                            description="Link to privacy policy"
                            id="gui.privacy"
                        />
                    </a>
                </div>
            </div>
        </div>
    </footer>
);

class Interface extends React.Component {
    constructor (props) {
        super(props);
        this.handleUpdateProjectTitle = this.handleUpdateProjectTitle.bind(this);
    }
    componentDidUpdate (prevProps) {
        if (prevProps.isLoading && !this.props.isLoading) {
            loadServiceWorker();
        }
    }
    handleUpdateProjectTitle (title, isDefault) {
        if (isDefault || !title) {
            document.title = `Sidekick - ${this.props.intl.formatMessage(messages.defaultTitle)}`;
        } else {
            document.title = `${title} - Sidekick`;
        }
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            intl,
            hasCloudVariables,
            description,
            isFullScreen,
            isLoading,
            isPlayerOnly,
            isRtl,
            onClickTheme,
            projectId,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        const isHomepage = isPlayerOnly && !isFullScreen;
        const isEditor = !isPlayerOnly;
        return (
            <div
                className={classNames(styles.container, {
                    [styles.playerOnly]: isHomepage,
                    [styles.editor]: isEditor
                })}
            >
                {isHomepage ? (
                    <div className={styles.menu}>
                        <WrappedMenuBar
                            canChangeLanguage
                            canManageFiles
                            enableSeeInside
                            onClickAddonSettings={handleClickAddonSettings}
                            onClickTheme={onClickTheme}
                        />
                    </div>
                ) : null}
                <div
                    className={styles.center}
                    style={isPlayerOnly ? ({
                        // !!! TODO ???
                        // Set Pixels as a border (HACKY).
                        width: `${Math.max(480, props.customStageSize.width) + 2}px`
                    }) : null}
                >
                    {isHomepage && announcement ? <DOMElementRenderer domElement={announcement} /> : null}
                    <GUI
                        onClickAddonSettings={handleClickAddonSettings}
                        onClickTheme={onClickTheme}
                        onUpdateProjectTitle={this.handleUpdateProjectTitle}
                        backpackVisible
                        backpackHost="_local_"
                        {...props}
                    />
                    {isHomepage ? (
                        <React.Fragment>
                            {isRendererSupported() ? null : (
                                <WebGlModal isRtl={isRtl} />
                            )}
                            {isBrowserSupported() ? null : (
                                <BrowserModal isRtl={isRtl} />
                            )}
                            <div className={styles.section}>
                                <ProjectInput />
                            </div>
                            {(
                                // eslint-disable-next-line max-len
                                description.instructions === 'unshared' || description.credits === 'unshared'
                            ) && (
                                <div className={styles.unsharedUpdate}>
                                    <p>
                                        <FormattedMessage
                                            defaultMessage="Unshared projects are no longer visible."
                                            description="Appears on unshared projects"
                                            id="gui.unshared2.1"
                                        />
                                    </p>
                                    <p>
                                        <FormattedMessage
                                            defaultMessage="For more information, visit: {link}"
                                            description="Appears on unshared projects"
                                            id="gui.unshared.2"
                                            values={{
                                                link: (
                                                    <a
                                                        // !!! CHANGE !!!
                                                        // href="https://github.com/Mixality/Sidekick#unshared-projects"
                                                        href="https://github.com/Menersar/Sidekick#unshared-projects"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {/* !!! CHANGE !!! */}
                                                        {/* {'https://github.com/Mixality/Sidekick#unshared-projects'} */}
                                                        {'https://github.com/Menersar/Sidekick#unshared-projects'}
                                                    </a>
                                                )
                                            }}
                                        />
                                    </p>
                                    <p>
                                        <FormattedMessage
                                            // eslint-disable-next-line max-len
                                            defaultMessage="If the project was shared recently, this message may appear incorrectly for a few minutes."
                                            description="Appears on unshared projects"
                                            id="gui.unshared.cache"
                                        />
                                    </p>
                                    <p>
                                        <FormattedMessage
                                            // eslint-disable-next-line max-len
                                            defaultMessage="If this project is actually shared, please report a bug."
                                            description="Appears on unshared projects"
                                            id="gui.unshared.bug"
                                        />
                                    </p>
                                </div>
                            )}
                            {hasCloudVariables && projectId !== '0' && (
                                <div className={styles.section}>
                                    <CloudVariableBadge />
                                </div>
                            )}
                            {description.instructions || description.credits ? (
                                <div className={styles.section}>
                                    <Description
                                        instructions={description.instructions}
                                        credits={description.credits}
                                        projectId={projectId}
                                    />
                                </div>
                            ) : null}
                            <div className={styles.section}>
                                <p>
                                    <FormattedMessage
                                        // eslint-disable-next-line max-len
                                        defaultMessage="Sidekick is based on Scratch and TurboWarp."
                                        description="Description of Sidekick"
                                        id="gui.home.description"
                                    />
                                </p>
                            </div>
                            <div className={styles.section}>
                                {/* !!! CHANGE !!! */}
                                {/* <FeaturedProjects studio="27205657" /> */}
                                <FeaturedProjects studio="" />
                            </div>
                        </React.Fragment>
                    ) : null}
                </div>
                {isHomepage && <Footer />}
            </div>
        );
    }
}

Interface.propTypes = {
    intl: intlShape,
    hasCloudVariables: PropTypes.bool,
    customStageSize: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    }),
    description: PropTypes.shape({
        credits: PropTypes.string,
        instructions: PropTypes.string
    }),
    isFullScreen: PropTypes.bool,
    isLoading: PropTypes.bool,
    isPlayerOnly: PropTypes.bool,
    isRtl: PropTypes.bool,
    onClickTheme: PropTypes.func,
    projectId: PropTypes.string
};

const mapStateToProps = state => ({
    hasCloudVariables: state.scratchGui.sidekick.hasCloudVariables,
    customStageSize: state.scratchGui.customStageSize,
    description: state.scratchGui.sidekick.description,
    isFullScreen: state.scratchGui.mode.isFullScreen,
    isLoading: getIsLoading(state.scratchGui.projectState.loadingState),
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
    isRtl: state.locales.isRtl,
    projectId: state.scratchGui.projectState.projectId
});

const mapDispatchToProps = () => ({});

const ConnectedInterface = injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(Interface));

const WrappedInterface = compose(
    AppStateHOC,
    ErrorBoundaryHOC('Sidekick Interface'),
    SidekickProjectMetaFetcherHOC,
    SidekickStateManagerHOC,
    SidekickThemeHOC,
    SidekickRestorePointHOC,
    SidekickPackagerIntegrationHOC
)(ConnectedInterface);

export default WrappedInterface;
