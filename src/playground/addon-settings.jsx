import React from 'react';
import ReactDOM from 'react-dom';
import downloadBlob from '../lib/download-blob.js';
import Settings from '../addons/settings/settings.jsx';
import appTarget from './app-target';

const onExportSettings = settings => {
    const blob = new Blob([JSON.stringify(settings)]);
    downloadBlob('sidekick-addon-settings.json', blob);
};

ReactDOM.render((
    <Settings
        onExportSettings={onExportSettings}
    />
), appTarget);
