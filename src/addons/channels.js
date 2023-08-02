let changeChannel;
let reloadChannel;

// BroadcastChannel instances allow asynchronous one-to-many communication with all
// other BroadcastChannel instances bound to the same channel name
// (Source: https://nodejs.org/api/worker_threads.html#class-broadcastchannel-extends-eventtarget)
if (typeof BroadcastChannel !== 'undefined') {
    changeChannel = new BroadcastChannel('addons-change');
    reloadChannel = new BroadcastChannel('addons-reload');
}

export default {
    changeChannel,
    reloadChannel
};
