import React from 'react';
import {FormattedMessage} from 'react-intl';

import turboIcon from './icon--turbo.svg';

import styles from './turbo-mode.css';

import PropTypes from 'prop-types';

const TurboMode = ({isSmall}) => (
    <div className={styles.turboContainer}>
        <img
            className={styles.turboIcon}
            src={turboIcon}
        />
        {!isSmall && (
            <div className={styles.turboLabel}>
                <FormattedMessage
                    defaultMessage="Turbo Mode"
                    description="Label indicating turbo mode is active"
                    id="gui.turboMode.active"
                />
            </div>
        )}
    </div>
);

TurboMode.propTypes = {
    isSmall: PropTypes.bool
};

TurboMode.defaultProps = {
    isSmall: false
};

export default TurboMode;
