import React from 'react';
import {FormattedMessage, defineMessages, intlShape, injectIntl} from 'react-intl';
import classNames from 'classnames';
import styles from './loader.css';
import PropTypes from 'prop-types';

import topBlock from './top-block.svg';
import middleBlock from './middle-block.svg';
import bottomBlock from './bottom-block.svg';

import bindAll from 'lodash.bindall';

import * as progressMonitor from './sidekick-progress-monitor';
import isScratchDesktop from '../../lib/isScratchDesktop';

const messages = defineMessages({
    generic: {
        defaultMessage: 'Loading project …',
        description: 'Initial generic loading message',
        id: 'gui.loader.generic'
    },
    projectData: {
        defaultMessage: 'Downloading project data …',
        description: 'Appears when loading project data',
        id: 'gui.loader.data'
    },
    assetsKnown: {
        defaultMessage: 'Downloading assets ({complete}/{total}) …',
        description: 'Appears when loading project assets and amount of assets is known',
        id: 'gui.loader.assets.known'
    },
    assetsUnknown: {
        defaultMessage: 'Downloading assets …',
        description: 'Appears when loading project assets but amount of assets is unknown',
        id: 'gui.loader.assets.unknown'
    }
});

const mainMessages = {
    'gui.loader.headline': (
        <FormattedMessage
            defaultMessage="Loading Project"
            description="Main loading message"
            id="gui.loader.headline"
        />
    ),
    'gui.loader.creating': (
        <FormattedMessage
            defaultMessage="Creating Project"
            description="Main creating message"
            id="gui.loader.creating"
        />
    )
};

class LoaderComponent extends React.Component {

    constructor (props) {
        super(props);
        this._state = 0;
        this.progress = 0;
        this.complete = 0;
        this.total = 0;
        bindAll(this, [
            'barInnerRef',
            'handleProgressChange',
            'messageRef'
        ]);
    }

    componentDidMount () {
        // // Start an interval to choose a new message every 5 seconds
        // progressMonitor.setProgressHandler(this.handleProgressChange);
        if (!isScratchDesktop()) {
            progressMonitor.setProgressHandler(this.handleProgressChange);
        }
        this.updateMessage();
    }

    componentDidUpdate () {
        this.update();
    }

    componentWillUnmount () {
        progressMonitor.setProgressHandler(() => {});
    }

    handleProgressChange (state, progress, complete, total) {
        if (state !== this._state) {
            this._state = state;
            this.updateMessage();
        }
        this.progress = progress;
        this.complete = complete;
        this.total = total;
        this.update();
    }

    update () {
        // this.barInner.style.width = `${this.progress * 100}%`;
        if (this.barInner) {
            this.barInner.style.width = `${this.progress * 100}%`;
        }
        if (this._state === 2) {
            this.updateMessage();
        }
    }

    updateMessage () {
        if (this._state === 0) {
            this.message.textContent = this.props.intl.formatMessage(messages.generic);
        } else if (this._state === 1) {
            this.message.textContent = this.props.intl.formatMessage(messages.projectData);
        } else if (this.total > 0) {
            this.message.textContent = this.props.intl.formatMessage(messages.assetsKnown, {
                complete: this.complete,
                total: this.total
            });
        } else {
            this.message.textContent = this.props.intl.formatMessage(messages.assetsUnknown);
        }
    }

    barInnerRef (element) {
        this.barInner = element;
    }

    messageRef (element) {
        this.message = element;
    }

    render () {
        return (
            <div
                className={classNames(styles.background, {
                    [styles.fullscreen]: this.props.isFullScreen
                })}
            >
                <div className={styles.container}>
                    <div className={styles.blockAnimation}>
                        <img
                            className={styles.topBlock}
                            src={topBlock}
                        />
                        <img
                            className={styles.middleBlock}
                            src={middleBlock}
                        />
                        <img
                            className={styles.bottomBlock}
                            src={bottomBlock}
                        />
                    </div>
                    <div className={styles.title}>
                        {mainMessages[this.props.messageId]}
                    </div>
                    <div className={styles.messageContainerOuter}>
                        <div
                            className={styles.messageContainerInner}
                            ref={this.messageRef}
                        />
                    </div>
                    {/* <div className={styles.sidekickProgressOuter}>
                        <div
                            className={styles.sidekickProgressInner}
                            ref={this.barInnerRef}
                        />
                    </div> */}
                    {!isScratchDesktop() && (
                        <div className={styles.sidekickProgressOuter}>
                            <div
                                className={styles.sidekickProgressInner}
                                ref={this.barInnerRef}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

LoaderComponent.propTypes = {
    isFullScreen: PropTypes.bool,
    messageId: PropTypes.string,
    intl: intlShape.isRequired
};
LoaderComponent.defaultProps = {
    isFullScreen: false,
    messageId: 'gui.loader.headline'
};

export default injectIntl(LoaderComponent);
