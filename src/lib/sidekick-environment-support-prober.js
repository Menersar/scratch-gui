import Renderer from 'scratch-render';

// let _isRendererSupported = null;
let cachedRendererSupport = null;
export const isRendererSupported = () => {
    // if (_isRendererSupported === null) {
    //     _isRendererSupported = Renderer.isSupported();
    if (cachedRendererSupport === null) {
        cachedRendererSupport = Renderer.isSupported();
    }
    // return _isRendererSupported;
    return cachedRendererSupport;
};

// let _canConstructNewFunctions = null;
// export const canConstructNewFunctions = () => {
//     if (_canConstructNewFunctions === null) {
let cachedNewFunctionSupport = null;
export const isNewFunctionSupported = () => {
    if (cachedNewFunctionSupport === null) {
        try {
            // !!! KA !!!
            // This will throw if blocked by CSP.
            // eslint-disable-next-line no-new
            new Function('');
            // _canConstructNewFunctions = true;
            cachedNewFunctionSupport = true;
        } catch (e) {
            // _canConstructNewFunctions = true;
            cachedNewFunctionSupport = false;
        }
    }
    // return _canConstructNewFunctions;
    return cachedNewFunctionSupport;
};

// export const isAudioContextSupported = () => !!(window.AudioContext || window.webkitAudioContext);

// export const isBrowserSupported = () => canConstructNewFunctions() && isAudioContextSupported();
export const isBrowserSupported = () => (
    isNewFunctionSupported() &&
    isRendererSupported()
);
