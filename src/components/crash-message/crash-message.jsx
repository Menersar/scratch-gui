import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import {FormattedMessage} from 'react-intl';

import styles from './crash-message.css';
import reloadIcon from './reload.svg';

const CrashMessage = props => (
    <div className={styles.crashWrapper}>
        <Box className={styles.body}>
            <img
                className={styles.reloadIcon}
                src={reloadIcon}
            />
            <p className={styles.header}>
                <FormattedMessage
                    defaultMessage="Oops! Something went wrong."
                    description="Crash Message title"
                    id="gui.crashMessage.label"
                />
            </p>
            <p>
                <FormattedMessage
                    defaultMessage={'We are so sorry, but it looks like Sidekick has crashed.' +
                        ' Please refresh your page to try' +
                        ' again.'}
                    description="Message to inform the user that page has crashed."
                    id="gui.crashMessage.description"
                />
            </p>
            {props.errorMessage && (
                <p className={styles.errorMessage}>
                    {props.errorMessage}
                </p>
            )}
            {props.eventId && (
                <p>
                    <FormattedMessage
                        defaultMessage="Your error was logged with id {errorId}"
                        description="Message to inform the user that page has crashed."
                        id="gui.crashMessage.errorNumber"
                        values={{
                            errorId: props.eventId
                        }}
                    />
                </p>
            )}
            <button
                className={styles.reloadButton}
                onClick={props.onReload}
            >
                <FormattedMessage
                    defaultMessage="Reload"
                    description="Button to reload the page when page crashes"
                    id="gui.crashMessage.reload"
                />
            </button>
        </Box>
    </div>
);

CrashMessage.propTypes = {
    eventId: PropTypes.string,
    onReload: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

export default CrashMessage;
