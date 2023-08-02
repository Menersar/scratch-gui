import './import-first';

import ReactDOM from 'react-dom';
import React from 'react';
import {setAppElement} from 'react-modal';

import Interface from './render-interface.jsx';
import appTarget from './app-target';

setAppElement(appTarget);
ReactDOM.render(<Interface />, appTarget);
