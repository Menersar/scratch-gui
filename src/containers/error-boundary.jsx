import React from 'react';
import PropTypes from 'prop-types';
// import {connect} from 'react-redux';
// import BrowserModalComponent from '../components/browser-modal/browser-modal.jsx';
import CrashMessageComponent from '../components/crash-message/crash-message.jsx';
import log from '../lib/log.js';
import {recommendedBrowser} from '../lib/supported-browser';

// Renamed and changed variables:
// hasError -> error (false (Boolean) -> null (Error))
// errorId -> errorInfo (React.ErrorInfo)
class ErrorBoundary extends React.Component {
    constructor (props) {
        super(props);
        this.state = {


            // error: null,
            // errorInfo: null
            hasError: false,
            errorId: null


        };
    }


    // /**
    //  * Handle an error caught by this ErrorBoundary component.
    //  * @param {Error} error - the error that was caught.
    //  * @param {React.ErrorInfo} errorInfo - the React error info associated with the error.
    //  */
    // componentDidCatch (error, errorInfo) {
    //     error = error || {
    //         stack: 'Unknown stack',
    //         message: 'Unknown error'
    //     };
    //     errorInfo = errorInfo || {
    //         componentStack: 'Unknown component stack'
    //     };

    componentDidCatch (error, info) {
        // !!! ???
        // Error object may be undefined (IE?)
        error = error || {
            stack: 'Unknown stack',
            message: 'Unknown error'
        };

        // Log errors to analytics, leaving out browsers that are not in our recommended set
        if (recommendedBrowser() && window.Sentry) {
            window.Sentry.withScope(scope => {
                Object.keys(info).forEach(key => {
                    scope.setExtra(key, info[key]);
                });
                scope.setExtra('action', this.props.action);
                window.Sentry.captureException(error);
            });
        }

        // Display fallback UI
        this.setState({
            hasError: true,
            errorId: window.Sentry ? window.Sentry.lastEventId() : null,
            errorMessage: `${(error && error.message) || error}`
        });

        // Log error locally for debugging as well.
        log.error(`Unhandled Error: ${error.stack}\nComponent stack: ${info.componentStack}`);
    }


    // // Log errors to analytics, leaving out browsers that are not in our recommended set
    // if (recommendedBrowser() && window.Sentry) {
    //     window.Sentry.withScope(scope => {
    //         Object.keys(errorInfo).forEach(key => {
    //             scope.setExtra(key, errorInfo[key]);
    //         });
    //         scope.setExtra('action', this.props.action);
    //         window.Sentry.captureException(error);
    //     });
    // }

    // // Display fallback UI
    // this.setState({
    //     hasError: true,
    //     errorId: window.Sentry ? window.Sentry.lastEventId() : null
    // });

    //     // only remember the first error: later errors might just be side effects of that first one
    //     if (!this.state.error) {
    //         // store error & errorInfo for debugging
    //         this.setState({
    //             // hasError: true,
    //             error,
    //             errorInfo,
    //             errorMessage: `${(error && error.message) || error}`
    //         });
    //     }

    //     // only remember the first error: later errors might just be side effects of that first one
    //     if (!this.state.error) {
    //         // store error & errorInfo for debugging
    //         this.setState({
    //             error,
    //             errorInfo
    //         });
    //     }

    //     // report every error in the console
    //     log.error([
    //         `Unhandled Error with action='${this.props.action}': ${error.stack}`,
    //         `Component stack: ${errorInfo.componentStack}`
    //     ].join('\n'));
    // }

    handleBack () {
        window.history.back();
    }

    handleReload () {
        window.location.replace(window.location.origin + window.location.pathname);
    }

    render () {


        // if (this.state.error) {
        if (this.state.hasError) {


            // if (recommendedBrowser()) {
            //     return (
            //         <CrashMessageComponent
            //             onReload={this.handleReload}
            //         />
            //     );
            // }
            // return (<BrowserModalComponent
            //     error
            //     isRtl={this.props.isRtl}
            //     onBack={this.handleBack}
            // />);


            // return (<CrashMessageComponent
            //     eventId={this.state.errorInfo}
            //     onReload={this.handleReload}
            //     errorMessage={this.state.errorMessage}
            // />);
            return (
                <CrashMessageComponent
                    eventId={this.state.errorId}
                    errorMessage={this.state.errorMessage}
                    onReload={this.handleReload}
                />
            );


        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    action: PropTypes.string.isRequired, // Used for defining tracking action
    children: PropTypes.node
    // isRtl: PropTypes.bool
};

// const mapStateToProps = state => ({
//     isRtl: state.locales.isRtl
// });

// // ???
// // no-op function to prevent dispatch prop being passed to component
// const mapDispatchToProps = () => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
export default ErrorBoundary;
