import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import cloudIcon from './clouddata.svg';
import CloudServerButton from './cloud-server-button.jsx';
import styles from './cloud-variable-badge.css';
import {APP_NAME} from '../../lib/brand';

// const CloudVariableBadge = () => (
//     <div className={styles.badge}>
//         <div className={styles.icon}>
//             <img
//                 src={cloudIcon}
//                 alt="Cloud"
//                 width="32"
//                 height="32"
//             />
//         </div>
//         <div className={styles.text}>
const hosts = [
    {
        name: 'US East',
        cloudHost: 'wss://clouddata.turbowarp.org'
        // https://github.com/search?q=org%3ATurboWarp%20ws%3Alocalhost%3A8080&type=code
        // cloudHost: 'ws:localhost:8080'
    },
    {
        name: 'EU',
        cloudHost: 'wss://clouddata-eu.turbowarp.org',
        // cloudHost: 'ws:localhost:8080',
        provider: {
            name: '9gr',
            href: 'https://scratch.mit.edu/users/9gr/'
        }
    }
];

const CloudVariableBadge = props => {
    const selectedHost = hosts.find(i => i.cloudHost === props.cloudHost);
    return (
        <div className={styles.badge}>
            <div className={styles.title}>
                <img
                    className={styles.cloudIcon}
                    src={cloudIcon}
                    alt=""
                    width={32}
                    height={32}
                />
                <FormattedMessage
                    // eslint-disable-next-line max-len
                    defaultMessage="This project uses cloud variables."
                    description="Cloud variable information shown under projects with cloud variables"
                    id="gui.usesCloudVariables"
                />
            </div>
            <FormattedMessage
                // eslint-disable-next-line max-len
                // defaultMessage="This project uses cloud variables. The server is independent of Scratch. Important Note: Users can freely set their names to any name possible − unfortunately though, this allows for abuse such as user impersonation! {learnMore}"
                // description="Cloud variable information shown under projects with cloud variables"
                // id="gui.cloudVariableBadge"
                // eslint-disable-next-line max-len
                defaultMessage="{APP_NAME}'s cloud variables are not connected to Scratch's. Anyone can {changeTheirUsername} to anything, so beware of impersonation."
                // eslint-disable-next-line max-len
                description="Cloud variable information shown under projects with cloud variables. {changeTheirUsername} will be replaced with a link with text 'change their username' (translated)"
                id="gui.usesCloudVariables2"
                values={{
                    // learnMore: (
                    //     <a
                    //         // !!! CHANGE !!!
                    //         // href="https://github.com/Mixality/Sidekick#cloud-variables"
                    //         href="https://github.com/Menersar/Sidekick#cloud-variables"
                    //         target="_blank"
                    //         rel="noreferrer"
                    //     >
                    APP_NAME,
                    changeTheirUsername: (
                        <a onClick={props.onOpenChangeUsername}>
                            <FormattedMessage
                                // defaultMessage="Learn more."
                                // id="gui.alerts.cloudInfoLearnMore"
                                // !!! ???
                                defaultMessage="change their username"
                                // eslint-disable-next-line max-len
                                description="Link that opens modal to change one's username. Used in the context 'Anyone can change their username'"
                                id="gui.usesCloudVariables2.change"
                            />
                        </a>
                    )
                }}
            />

            {selectedHost ? (
                <div className={styles.servers}>
                    <FormattedMessage
                        defaultMessage="Pick a server near you:"
                        description="Appears before a list of cloud variable servers in different countries"
                        id="gui.cloudServers"
                    />
                    {hosts.map(i => (
                        <CloudServerButton
                            key={i.ws}
                            name={i.name}
                            cloudHost={i.cloudHost}
                            selected={props.cloudHost === i.cloudHost}
                            onClick={props.onSetCloudHost}
                        />
                    ))}
                </div>
            ) : (
                <FormattedMessage
                    defaultMessage="Using a custom cloud variable server: {server}"
                    // eslint-disable-next-line max-len
                    description="Appears when using a non-Sidekick provided cloud variable server. {server} is replaced with the server's URL, eg. wss://clouddata.turbowarp.org"
                    id="gui.customCloudServer"
                    values={{
                        server: props.cloudHost
                    }}
                />
            )}

            {selectedHost && selectedHost.provider && (
                <FormattedMessage
                    defaultMessage="Server provided by {name}."
                    description="Link to person/company who provided this cloud variable server"
                    id="gui.cloudProvider"
                    values={{
                        name: (
                            <a
                                href={selectedHost.provider.href}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {selectedHost.provider.name}
                            </a>
                        )
                    }}
                />
            )}

            <a
                target="_blank"
                rel="noreferrer"
                // !!! CHANGE !!!
                // !!! KA !!!
                // href="https://docs.turbowarp.org/cloud-variables"
                href="https://github.com/Menersar/Sidekick#cloud-variables"
            >
                <FormattedMessage
                    defaultMessage="Learn more about cloud variables."
                    description="Link for more information about cloud variables"
                    id="gui.moreCloud"
                />
            </a>
        </div>
    // </div>
    //  );
    );
};

CloudVariableBadge.propTypes = {
    cloudHost: PropTypes.string,
    onSetCloudHost: PropTypes.func,
    onOpenChangeUsername: PropTypes.func
};


export default CloudVariableBadge;
