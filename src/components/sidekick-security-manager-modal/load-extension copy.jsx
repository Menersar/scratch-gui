import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import styles from './load-extension.css';
import URL from './url.jsx';
import DataURL from './data-url.jsx';
import FancyCheckbox from '../sidekick-fancy-checkbox/checkbox.jsx';
import {APP_NAME} from '../../lib/brand';

// /**
//  * @param {string} dataURI data: URI
//  * @returns {string} A hopefully human-readable version
//  */
// const decodeDataURI = dataURI => {
//     const delimeter = dataURI.indexOf(',');
//     if (delimeter === -1) {
//         return dataURI;
//     }
//     const contentType = dataURI.substring(0, delimeter);
//     const data = dataURI.substring(delimeter + 1);
//     if (contentType.endsWith(';base64')) {
//         try {
//             return atob(data);
//         } catch (e) {
//             return dataURI;
//         }
//     }
//     try {
//         return decodeURIComponent(data);
//     } catch (e) {
//         return dataURI;
//     }
// };

const LoadExtensionModal = props => (
    <div>
        {props.url.startsWith('data:') ? (
            <React.Fragment>
                <FormattedMessage
                    defaultMessage="The project wants to load a custom extension with the code:"
                    description="Part of modal asking for permission to automatically load custom extension"
                    id="gui.loadExtension.embedded"
                />
                {/* <textarea
                    className={styles.code}
                    value={decodeDataURI(props.url)}
                    readOnly
                    spellCheck={false}
                /> */}
            </React.Fragment>
        ) : (
            <React.Fragment>
                <FormattedMessage
                    defaultMessage="The project wants to load a custom extension from the URL:"
                    description="Part of modal asking for permission to automatically load custom extension"
                    id="gui.loadExtension.url"
                />
                <URL url={props.url} />
            </React.Fragment>
        )}

        {props.onChangeUnsandboxed && (
            <React.Fragment>
                <label className={styles.unsandboxedContainer}>
                    <FancyCheckbox
                        className={styles.unsandboxedCheckbox}
                        checked={props.unsandboxed}
                        onChange={props.onChangeUnsandboxed}
                    />
                    <FormattedMessage
                        defaultMessage="Run extension without sandbox"
                        description="Part of modal asking for permission to automatically load custom extension"
                        id="gui.loadExtension.unsandboxed"
                    />
                </label>
                {props.unsandboxed && (
                    <div className={styles.unsandboxedWarning}>
                        <FormattedMessage
                            // eslint-disable-next-line max-len
                            defaultMessage="Loading extensions without the sandbox is dangerous. It will be able to corrupt your project, delete your settings, phish for passwords, and other bad things. The {APP_NAME} developers are not responsible for any resulting issues."
                            description="Part of modal asking for permission to automatically load custom extension"
                            id="gui.loadExtension.unsandboxedWarning"
                            values={{
                                APP_NAME
                            }}
                        />
                    </div>
                )}
            </React.Fragment>
        )}
        {!props.unsandboxed && (
            <div className={styles.sandboxed}>
                <FormattedMessage
                    // eslint-disable-next-line max-len
                    defaultMessage="While the code will be sandboxed, it will still have access to information about your device such as your IP and general location. Make sure you trust the author of this extension before continuing."
                    description="Part of modal asking for permission to automatically load custom extension"
                    id="gui.loadExtension.sandboxed"
                />
            </div>
        )}
    </div>
);

LoadExtensionModal.propTypes = {
    url: PropTypes.string.isRequired,
    unsandboxed: PropTypes.bool.isRequired,
    onChangeUnsandboxed: PropTypes.func
};

export default LoadExtensionModal;
