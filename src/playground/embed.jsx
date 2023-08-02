import './import-first';

import ReactDOM from 'react-dom';
import React from 'react';
import {compose} from 'redux';
import {setAppElement} from 'react-modal';
import GUI from './render-gui.jsx';
import AppStateHOC from '../lib/app-state-hoc.jsx';
import SidekickEmbedFullScreenHOC from '../lib/sidekick-embed-fullscreen-hoc.jsx';
import SidekickStateManagerHOC from '../lib/sidekick-state-manager-hoc.jsx';
import runAddons from '../addons/entry';

import appTarget from './app-target';

const getProjectId = () => {
    const hashMatch = location.hash.match(/#(\d+)/);
    if (hashMatch !== null) {
        return hashMatch[1];
    }
    // Like wildcard routing (after checking the hash).
    const pathMatch = location.pathname.match(/(\d+)\/embed/);
    if (pathMatch !== null) {
        return pathMatch[pathMatch.length - 1];
    }
    return '0';
};

const projectId = getProjectId();
const urlParams = new URLSearchParams(location.search);

let vm;

const onVmInit = _vm => {
    vm = _vm;
};

const onProjectLoaded = () => {
    if (urlParams.has('autoplay')) {
        vm.start();
        vm.greenFlag();
    }
};

const WrappedGUI = compose(
    AppStateHOC,
    SidekickStateManagerHOC,
    SidekickEmbedFullScreenHOC
)(GUI);

setAppElement(appTarget);
ReactDOM.render(<WrappedGUI
    isEmbedded
    projectId={projectId}
    onVmInit={onVmInit}
    onProjectLoaded={onProjectLoaded}
    routingStyle="none"
/>, appTarget);

if (urlParams.has('addons')) {
    runAddons();
}
