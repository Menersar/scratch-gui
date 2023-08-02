let total = 0;
let complete = 0;
let state = 0;
let currentProgress = 0;

let progressHandler = (state, progress, complete, total) => {};

export const setProgressHandler = newHandler => {
    progressHandler = newHandler;
    progressHandler(state, currentProgress, complete, total);
};

let progressHandlerTimeout = null;
const fireProgressHandler = () => {
    progressHandler(state, currentProgress, complete, total);
    progressHandlerTimeout = null;
};

const queueProgressHandlerUpdate = () => {
    if (progressHandlerTimeout === null) {
        progressHandlerTimeout = requestAnimationFrame(fireProgressHandler);
    }
};

const setProgress = progress => {
    if (progress < 0) {
        progress = 0;
    }
    if (progress > 1) {
        progress = 1;
    }
    currentProgress = progress;
    queueProgressHandlerUpdate();
};

const setState = newState => {
    if (state === newState) {
        return;
    }
    state = newState;
    complete = 0;
    total = 0;
    setProgress(0);
};

export const fetchWithProgress = url => {
    setState(1);
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = () => {
            resolve(
                new Response(xhr.response, {
                    status: xhr.status,
                    statusText: xhr.statusText
                })
            );
        };
        xhr.onloadend = () => setProgress(1);
        xhr.onerror = () =>
            reject(new Error('[sidekick-progress-monitor] xhr failed'));
        xhr.onprogress = e => {
            if (e.lengthComputable) {
                setProgress(e.loaded / e.total);
            }
        };
        xhr.open('GET', url);
        xhr.send();
    });
};

const originalFetch = window.fetch;
window.fetch = (url, opts) => {
    const isGET = typeof opts === 'object' && opts && opts.method === 'GET';
    const isProjectURL =
        typeof url === 'string' &&
        /^https:\/\/projects\.scratch\.mit\.edu\/\d+$/.test(url);
    if (isGET && isProjectURL) {
        return fetchWithProgress(url);
    }
    return originalFetch(url, opts);
};

const handleWorkerMessage = e => {
    const data = e.data;
    if (Array.isArray(data)) {
        complete += data.length;
        setProgress(complete / total);
    }
};

if (window.Worker) {
    let downloadWorker = null;
    const originalPostMessage = window.Worker.prototype.postMessage;
    window.Worker.prototype.postMessage = function (message) {
        if (downloadWorker === null) {
            if (message && message.url && message.id && message.options) {
                downloadWorker = this;
                downloadWorker.addEventListener('message', handleWorkerMessage);
            }
        }
        if (downloadWorker === this) {
            setState(2);
            total++;
        }
        originalPostMessage.call(this, message);
    };
}
