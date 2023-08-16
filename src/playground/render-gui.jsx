// !!!
import React from 'react';
import GUI from '../containers/gui.jsx';
// import ReactDOM from 'react-dom';
// import {compose} from 'redux';

// import AppStateHOC from '../lib/app-state-hoc.jsx';
// import HashParserHOC from '../lib/hash-parser-hoc.jsx';
// import log from '../lib/log.js';

// const onClickLogo = () => {
//     window.location = 'https://scratch.mit.edu';
// };

// const handleTelemetryModalCancel = () => {
//     log('User canceled telemetry modal');
// };

// const handleTelemetryModalOptIn = () => {
//     log('User opted into telemetry');
// };

// const handleTelemetryModalOptOut = () => {
//     log('User opted out of telemetry');
// };

// /*
//  * Render the GUI playground. This is a separate function because importing anything
//  * that instantiates the VM causes unsupported browsers to crash
//  * {object} appTarget - the DOM element to render to
//  */
// export default appTarget => {
//     GUI.setAppElement(appTarget);

//     // note that redux's 'compose' function is just being used as a general utility to make
//     // the hierarchy of HOC constructor calls clearer here; it has nothing to do with redux's
//     // ability to compose reducers.
//     const WrappedGui = compose(
//         AppStateHOC,
//         HashParserHOC
//     )(GUI);

//     // TODO a hack for testing the backpack, allow backpack host to be set by url param
//     const backpackHostMatches = window.location.href.match(/[?&]backpack_host=([^&]*)&?/);
//     const backpackHost = backpackHostMatches ? backpackHostMatches[1] : null;

//     const scratchDesktopMatches = window.location.href.match(/[?&]isScratchDesktop=([^&]+)/);
//     let simulateScratchDesktop;
//     if (scratchDesktopMatches) {
//         try {
//             // parse 'true' into `true`, 'false' into `false`, etc.
//             simulateScratchDesktop = JSON.parse(scratchDesktopMatches[1]);
//         } catch {
//             // it's not JSON so just use the string
//             // note that a typo like "falsy" will be treated as true
//             simulateScratchDesktop = scratchDesktopMatches[1];
//         }
//     }

//     if (process.env.NODE_ENV === 'production' && typeof window === 'object') {
//         // Warn before navigating away
//         window.onbeforeunload = () => true;
//     }

//     ReactDOM.render(
//         // important: this is checking whether `simulateScratchDesktop` is truthy, not just defined!
//         simulateScratchDesktop ?
//             <WrappedGui
//                 canEditTitle
//                 isScratchDesktop
//                 showTelemetryModal
//                 canSave={false}
//                 onTelemetryModalCancel={handleTelemetryModalCancel}
//                 onTelemetryModalOptIn={handleTelemetryModalOptIn}
//                 onTelemetryModalOptOut={handleTelemetryModalOptOut}
//             /> :
//             <WrappedGui
//                 canEditTitle
//                 backpackVisible
//                 showComingSoon
//                 backpackHost={backpackHost}
//                 canSave={false}
//                 onClickLogo={onClickLogo}
//             />,
//         appTarget);
// };

const searchParams = new URLSearchParams(location.search);

// Cloud Data Server source code:
// https://github.com/Menersar/sidekick-cloud-server
// !!! t CHANGE !!!
// const cloudHost = searchParams.get('cloud_host') || 'wss://clouddata.turbowarp.org';
// const cloudHost = searchParams.get('cloud_host') || 'wss://mixality.github.io/Sidekick/clouddata';
// const cloudHost = searchParams.get('cloud_host') || 'wss://menersar.github.io/Sidekick/clouddata';
// const cloudHost = searchParams.get('cloud_host') || 'wss://clouddata.scratch.mit.edu';


// !!! TEST BUG FIX
// !!! NEU
// const cloudHost = searchParams.get('cloud_host') || 'https://scratch.mit.edu/?cloud_host=ws://0.0.0.0:9080';

// !!! TEST BUG FIX
// const cloudHost = searchParams.get('cloud_host') || 'wss://clouddata.turbowarp.org';
// const cloudHost = searchParams.get('cloud_host') || 'wss://clouddata.turbowarp.org';
// const cloudHost = searchParams.get('cloud_host') || 'ws:localhost:8080';
const cloudHost = searchParams.get('cloud_host') || 'ws:localhost:9080';

// !!! INFORMATION
// By default the server is listening on ws://localhost:9080/. To change the port or enable wss://, read below.
// To use a local cloud variable server in TurboWarp, you can use the cloud_host URL parameter, e.g.:
//  https://turbowarp.org/?cloud_host=ws://localhost:9080/

// !!! INFORMATION
// https://mixality.github.io/Sidekick/?cloud_host=ws://localhost:9080/
// https://menersar.github.io/Sidekick/?cloud_host=ws://localhost:9080/

// !!! INFORMATION
// Connect to Scratch's cloud variable server not possible as it requires additional account credentials.
// !!! TEST BUG FIX


const RenderGUI = props => (
    <GUI
        cloudHost={cloudHost}
        canSave={false}
        basePath={process.env.ROOT}
        canEditTitle
        enableCommunity
        {...props}
    />
);

export default RenderGUI;
