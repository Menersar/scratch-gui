import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button/button.jsx';

import communityIcon from './icon--see-community.svg';
import styles from './sidekick-see-inside.css';

const SeeInsideButton = ({
    className,
    onClick
}) => (
    <Button
        className={classNames(
            className,
            styles.seeInsideButton
        )}
        iconClassName={styles.seeInsideButtonIcon}
        iconSrc={communityIcon}
        iconWidth="20"
        iconHeight="20"
        onClick={onClick}
    >
        <FormattedMessage
            defaultMessage="See inside"
            description="Label for see inside button"
            id="gui.menuBar.seeInside"
        />
    </Button>
);

SeeInsideButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
};

SeeInsideButton.defaultProps = {
    onClick: () => {}
};

export default SeeInsideButton;
