import React from 'react';
import {FormattedMessage} from 'react-intl';
import cloudIcon from './clouddata.svg';
import styles from './cloud-variable-badge.css';

const CloudVariableBadge = () => (
    <div className={styles.badge}>
        <div className={styles.icon}>
            <img
                src={cloudIcon}
                alt="Cloud"
                width="32"
                height="32"
            />
        </div>
        <div className={styles.text}>
            <FormattedMessage
                // eslint-disable-next-line max-len
                defaultMessage="This project uses cloud variables. The server is independent of Scratch. Important Note: Users can freely set their names to any name possible − unfortunately though, this allows for abuse such as user impersonation! {learnMore}"
                description="Cloud variable information shown under projects with cloud variables"
                id="gui.cloudVariableBadge"
                values={{
                    learnMore: (
                        <a
                            // !!! CHANGE !!!
                            // href="https://github.com/Mixality/Sidekick#cloud-variables"
                            href="https://github.com/Menersar/Sidekick#cloud-variables"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FormattedMessage
                                defaultMessage="Learn more."
                                id="gui.alerts.cloudInfoLearnMore"
                            />
                        </a>
                    )
                }}
            />
        </div>
    </div>
);

export default CloudVariableBadge;
