import StartAudioContext from 'startaudiocontext';
import bowser from 'bowser';
import log from '../log';

let AUDIO_CONTEXT;

if (!bowser.msie) {
    /**
     * AudioContext can be initialized only when user interaction event happens
     */
    const event =
        typeof document.ontouchstart === 'undefined' ?
            'mousedown' :
            'touchstart';
    const initAudioContext = () => {
        document.removeEventListener(event, initAudioContext);
        // AUDIO_CONTEXT = new (window.AudioContext ||
        //     window.webkitAudioContext)();
        // StartAudioContext(AUDIO_CONTEXT);

        try {
            AUDIO_CONTEXT = new (window.AudioContext || window.webkitAudioContext)();
            StartAudioContext(AUDIO_CONTEXT);
        } catch (e) {
            log.error('Could not create shared audio context. Sound-related features will not be available.', e);
        }
    };
    document.addEventListener(event, initAudioContext);
}

/**
 * Wrap browser AudioContext because we shouldn't create more than one
 * @return {AudioContext} The singleton AudioContext
 */
export default function () {
    return AUDIO_CONTEXT;
}
