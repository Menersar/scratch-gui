import React from 'react';
import {FormattedMessage} from 'react-intl';

import musicIconURL from './music/music.png';
import musicInsetIconURL from './music/music-small.svg';

import penIconURL from './pen/pen.png';
import penInsetIconURL from './pen/pen-small.svg';

import videoSensingIconURL from './videoSensing/video-sensing.png';
import videoSensingInsetIconURL from './videoSensing/video-sensing-small.svg';

import text2speechIconURL from './text2speech/text2speech.png';
import text2speechInsetIconURL from './text2speech/text2speech-small.svg';

import translateIconURL from './translate/translate.png';
import translateInsetIconURL from './translate/translate-small.png';

import makeymakeyIconURL from './makeymakey/makeymakey.png';
import makeymakeyInsetIconURL from './makeymakey/makeymakey-small.svg';

import microbitIconURL from './microbit/microbit.png';
import microbitInsetIconURL from './microbit/microbit-small.svg';
import microbitConnectionIconURL from './microbit/microbit-illustration.svg';
import microbitConnectionSmallIconURL from './microbit/microbit-small.svg';

import ev3IconURL from './ev3/ev3.png';
import ev3InsetIconURL from './ev3/ev3-small.svg';
import ev3ConnectionIconURL from './ev3/ev3-hub-illustration.svg';
import ev3ConnectionSmallIconURL from './ev3/ev3-small.svg';

import wedo2IconURL from './wedo2/wedo.png'; // TODO: Rename file names to match variable/prop names?
import wedo2InsetIconURL from './wedo2/wedo-small.svg';
import wedo2ConnectionIconURL from './wedo2/wedo-illustration.svg';
import wedo2ConnectionSmallIconURL from './wedo2/wedo-small.svg';
import wedo2ConnectionTipIconURL from './wedo2/wedo-button-illustration.svg';

import boostIconURL from './boost/boost.png';
import boostInsetIconURL from './boost/boost-small.svg';
import boostConnectionIconURL from './boost/boost-illustration.svg';
import boostConnectionSmallIconURL from './boost/boost-small.svg';
import boostConnectionTipIconURL from './boost/boost-button-illustration.svg';

import gdxforIconURL from './gdxfor/gdxfor.png';
import gdxforInsetIconURL from './gdxfor/gdxfor-small.svg';
import gdxforConnectionIconURL from './gdxfor/gdxfor-illustration.svg';
import gdxforConnectionSmallIconURL from './gdxfor/gdxfor-small.svg';

// !!!
// import sidekickIcon from './sidekick/sidekick.svg';
import sidekickIconURL from './sidekick/icon.png';
import sidekickInsetIconURL from './sidekick/inset_icon.svg';

import customExtensionIcon from './custom/custom.svg';

// eslint-disable-next-line no-unused-vars
import unknownIcon from './gallery/unknown.svg';
import galleryIcon from './gallery/gallery.svg';
import animatedTextIcon from './gallery/animated-text.svg';
import stretchIcon from './gallery/stretch.svg';
import gamepadIcon from './gallery/gamepad.svg';
import cursorIcon from './gallery/cursor.svg';
import filesIcon from './gallery/files.svg';
import pointerlockIcon from './gallery/pointerlock.svg';
import runtimeOptionsIcon from './gallery/runtime-options.svg';
import utilitiesIcon from './gallery/utilities.svg';
import sensingPlusIcon from './gallery/sensingplus.svg';
import clonesPlusIcon from './gallery/clonesplus.svg';
import looksPlusIcon from './gallery/looksplus.svg';
import clippingBlendingIcon from './gallery/clippingblending.svg';
import regexIcon from './gallery/regex.svg';
import bitwiseIcon from './gallery/bitwise.svg';
import textIcon from './gallery/text.svg';
import fetchIcon from './gallery/fetch.svg';
import box2dIcon from './gallery/box2d.svg';
import localStorageIcon from './gallery/local-storage.svg';
import bigIntIcon from './gallery/bigint.svg';
import jsonIcon from './gallery/json.svg';

import pigpioIconURL from './pigpio/pigpio.png';
import pigpioInsetIconURL from './pigpio/pigpio-small.svg';

import pisensehatIconURL from './pisensehat/pisensehat.png';
import pisensehatInsetIconURL from './pisensehat/pisensehat-small.svg';

import pivsgpioIconURL from './pivsgpio/pivsgpio.png';
import pivsgpioInsetIconURL from './pivsgpio/pivsgpio-small.svg';

const galleryItem = object => ({
    ...object,
    tags: ['sidekick'],
    incompatibleWithScratch: true,
    featured: true
});


export default [
    {
        name: (
            <FormattedMessage
                defaultMessage="Music"
                description="Name for the 'Music' extension"
                id="gui.extension.music.name"
            />
        ),
        tags: ['scratch'],
        extensionId: 'music',
        iconURL: musicIconURL,
        insetIconURL: musicInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Play instruments and drums."
                description="Description for the 'Music' extension"
                id="gui.extension.music.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Pen"
                description="Name for the 'Pen' extension"
                id="gui.extension.pen.name"
            />
        ),
        tags: ['scratch'],
        extensionId: 'pen',
        iconURL: penIconURL,
        insetIconURL: penInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Draw with your sprites."
                description="Description for the 'Pen' extension"
                id="gui.extension.pen.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Video Sensing"
                description="Name for the 'Video Sensing' extension"
                id="gui.extension.videosensing.name"
            />
        ),
        tags: ['scratch'],
        extensionId: 'videoSensing',
        iconURL: videoSensingIconURL,
        insetIconURL: videoSensingInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Sense motion with the camera."
                description="Description for the 'Video Sensing' extension"
                id="gui.extension.videosensing.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Text to Speech"
                description="Name for the Text to Speech extension"
                id="gui.extension.text2speech.name"
            />
        ),
        tags: ['scratch'],
        extensionId: 'text2speech',
        collaborator: 'Amazon Web Services',
        iconURL: text2speechIconURL,
        insetIconURL: text2speechInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Make your projects talk."
                description="Description for the Text to speech extension"
                id="gui.extension.text2speech.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Translate"
                description="Name for the Translate extension"
                id="gui.extension.translate.name"
            />
        ),
        tags: ['scratch'],
        extensionId: 'translate',
        collaborator: 'Google',
        iconURL: translateIconURL,
        insetIconURL: translateInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Translate text into many languages."
                description="Description for the Translate extension"
                id="gui.extension.translate.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: 'Makey Makey',
        tags: ['scratch'],
        extensionId: 'makeymakey',
        collaborator: 'JoyLabz',
        iconURL: makeymakeyIconURL,
        insetIconURL: makeymakeyInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Make anything into a key."
                description="Description for the 'Makey Makey' extension"
                id="gui.extension.makeymakey.description"
            />
        ),
        featured: true
    },
    {
        name: 'micro:bit',
        tags: ['scratch'],
        extensionId: 'microbit',
        collaborator: 'micro:bit',
        iconURL: microbitIconURL,
        insetIconURL: microbitInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Connect your projects with the world."
                description="Description for the 'micro:bit' extension"
                id="gui.extension.microbit.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: microbitConnectionIconURL,
        connectionSmallIconURL: microbitConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their micro:bit."
                id="gui.extension.microbit.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/microbit'
    },
    {
        name: 'LEGO MINDSTORMS EV3',
        tags: ['scratch'],
        extensionId: 'ev3',
        collaborator: 'LEGO',
        iconURL: ev3IconURL,
        insetIconURL: ev3InsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Build interactive robots and more."
                description="Description for the 'LEGO MINDSTORMS EV3' extension"
                id="gui.extension.ev3.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: ev3ConnectionIconURL,
        connectionSmallIconURL: ev3ConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting. Make sure the pin on your EV3 is set to 1234."
                description="Message to help people connect to their EV3. Must note the PIN should be 1234."
                id="gui.extension.ev3.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/ev3'
    },
    {
        name: 'LEGO BOOST',
        tags: ['scratch'],
        extensionId: 'boost',
        collaborator: 'LEGO',
        iconURL: boostIconURL,
        insetIconURL: boostInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Bring robotic creations to life."
                description="Description for the 'LEGO BOOST' extension"
                id="gui.extension.boost.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: true,
        connectionIconURL: boostConnectionIconURL,
        connectionSmallIconURL: boostConnectionSmallIconURL,
        connectionTipIconURL: boostConnectionTipIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their BOOST."
                id="gui.extension.boost.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/boost'
    },
    {
        name: 'LEGO Education WeDo 2.0',
        tags: ['scratch'],
        extensionId: 'wedo2',
        collaborator: 'LEGO',
        iconURL: wedo2IconURL,
        insetIconURL: wedo2InsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Build with motors and sensors."
                description="Description for the 'LEGO WeDo 2.0' extension"
                id="gui.extension.wedo2.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: true,
        connectionIconURL: wedo2ConnectionIconURL,
        connectionSmallIconURL: wedo2ConnectionSmallIconURL,
        connectionTipIconURL: wedo2ConnectionTipIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their WeDo."
                id="gui.extension.wedo2.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/wedo'
    },
    {
        name: 'Go Direct Force & Acceleration',
        tags: ['scratch'],
        extensionId: 'gdxfor',
        collaborator: 'Vernier',
        iconURL: gdxforIconURL,
        insetIconURL: gdxforInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Sense push, pull, motion, and spin."
                description="Description for the Vernier Go Direct Force and Acceleration sensor extension"
                id="gui.extension.gdxfor.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: gdxforConnectionIconURL,
        connectionSmallIconURL: gdxforConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their force and acceleration sensor."
                id="gui.extension.gdxfor.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/vernier'
    },


    {
        name: (
            <FormattedMessage
                defaultMessage="Sidekick Extension Gallery"
                description="Name of extensions.sidekick.org in extension library"
                id="gui.extensionGallery.name"
            />
        ),
        // !!! CHANGE !!!
        // href: 'https://mixality.github.io/Sidekick/sidekick-extensions/',
        href: 'https://menersar.github.io/Sidekick/sidekick-extensions/',
        extensionId: '',
        iconURL: galleryIcon,
        description: (
            <FormattedMessage
                // eslint-disable-next-line max-len
                defaultMessage="We list many extensions here for convenience. You can find even more on extensions.sidekick.org."
                description="Description of extensions.sidekick.org in extension library"
                id="gui.extensionGallery.description"
            />
        ),
        tags: ['sidekick'],
        incompatibleWithScratch: true,
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Sidekick Blocks"
                description="Name of Sidekick extension"
                id="gui.sidekickExtension.name"
            />
        ),
        extensionId: 'sidekick',
        iconURL: sidekickIconURL,
        insetIconURL: sidekickInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Sidekick Blocks."
                description="Description of Sidekick extension"
                id="gui.sidekickExtension.description"
            />
        ),
        incompatibleWithScratch: true,
        tags: ['sidekick'],
        featured: true
    },

    
    {
        name: 'Raspberry Pi GPIO',
        extensionId: 'pigpio',
        collaborator: 'Raspberry Pi',
        iconURL: pigpioIconURL,
        insetIconURL: pigpioInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Control Raspberry Pi GPIO lines"
                description="Description for the 'Pi GPIO' extension"
                id="gui.extension.pigpio.description"
            />
        ),
        featured: true
    },
    {
        name: 'Raspberry Pi Sense HAT',
        extensionId: 'pisensehat',
        collaborator: 'Raspberry Pi',
        iconURL: pisensehatIconURL,
        insetIconURL: pisensehatInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Control Raspberry Pi Sense HAT"
                description="Description for the 'Pi Sense HAT' extension"
                id="gui.extension.pisensehat.description"
            />
        ),
        featured: true
    },
    {
        name: 'Raspberry Pi Simple Electronics',
        extensionId: 'pivsgpio',
        collaborator: 'Raspberry Pi',
        iconURL: pivsgpioIconURL,
        insetIconURL: pivsgpioInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Simple electronics with Raspberry Pi"
                description="Description for the 'Pi Simple Electronics' extension"
                id="gui.extension.pivsgpio.description"
            />
        ),
        featured: true
    },

    
    // Extensions loaded from URLs do not support localization, so unfortunately we will just leave English names here.
    galleryItem({
        name: 'Animated Text',
        // eslint-disable-next-line max-len
        description: 'An easy way to display and animate text. Compatible with Scratch Lab\'s Animated Text experiment.',
        extensionId: 'text',
        // extensionURL: 'https://mixality.github.io/Sidekick/sidekick-extensions/lab/text.js',
        extensionURL: 'https://menersar.github.io/Sidekick/sidekick-extensions/lab/text.js',
        iconURL: animatedTextIcon
    }),
    // !!!
    galleryItem({
        name: 'Stretch',
        description: 'Stretch sprites horizontally or vertically.',
        extensionId: 'stretch',
        // extensionURL: 'https://mixality.github.io/Sidekick/sidekick-extensions/stretch.js',
        extensionURL: 'https://menersar.github.io/Sidekick/sidekick-extensions/stretch.js',
        iconURL: stretchIcon
    }),
    galleryItem({
        name: 'Gamepad',
        description: 'Directly access gamepads instead of just mapping buttons to keys.',
        extensionId: 'Gamepad',
        // extensionURL: 'https://mixality.github.io/Sidekick/sidekick-extensions/gamepad.js',
        extensionURL: 'https://menersar.github.io/Sidekick/sidekick-extensions/gamepad.js',
        iconURL: gamepadIcon
    }),
    galleryItem({
        name: 'Files',
        description: 'Read and download files.',
        extensionId: 'files',
        // extensionURL: 'https://mixality.github.io/Sidekick/sidekick-extensions/files.js',
        extensionURL: 'https://menersar.github.io/Sidekick/sidekick-extensions/files.js',
        iconURL: filesIcon
    }),
    galleryItem({
        name: 'Pointerlock',
        // eslint-disable-next-line max-len
        description: 'Adds blocks for mouse locking. Mouse x & y blocks will report the change since the previous frame while the pointer is locked.',
        extensionId: 'pointerlock',
        // extensionURL: 'https://mixality.github.io/Sidekick/sidekick-extensions/pointerlock.js',
        extensionURL: 'https://menersar.github.io/Sidekick/sidekick-extensions/pointerlock.js',
        iconURL: pointerlockIcon
    }),
    galleryItem({
        name: 'Mouse Cursor',
        description: 'Use custom cursors or hide the cursor. Also allows replacing the cursor with any costume image.',
        extensionId: 'MouseCursor',
        // extensionURL: 'https://mixality.github.io/Sidekick/sidekick-extensions/cursor.js',
        extensionURL: 'https://menersar.github.io/Sidekick/sidekick-extensions/cursor.js',
        iconURL: cursorIcon
    }),
    galleryItem({
        name: 'Runtime Options',
        description: 'Get and modify turbo mode, framerate, interpolation, clone limit, stage size, and more.',
        extensionId: 'runtimeoptions',
        // extensionURL: 'https://mixality.github.io/Sidekick/sidekick-extensions/runtime-options.js',
        extensionURL: 'https://menersar.github.io/Sidekick/sidekick-extensions/runtime-options.js',
        iconURL: runtimeOptionsIcon
    }),
    galleryItem({
        name: 'Sensing Plus',
        description: 'An extension to the sensing category. Created by ObviousAlexC.',
        extensionId: 'obviousalexsensing',
        // extensionURL: 'https://mixality.github.io/Sidekick/sidekick-extensions/obviousAlexC/SensingPlus.js',
        extensionURL: 'https://menersar.github.io/Sidekick/sidekick-extensions/obviousAlexC/SensingPlus.js',
        iconURL: sensingPlusIcon
    }),
    galleryItem({
        name: 'Clones Plus',
        description: 'Expansion of Scratch\'s clone features. Created by LilyMakesThings.',
        extensionId: 'lmsclonesplus',
        // extensionURL: 'https://mixality.github.io/Sidekick/sidekick-extensions/Lily/ClonesPlus.js',
        extensionURL: 'https://menersar.github.io/Sidekick/sidekick-extensions/Lily/ClonesPlus.js',
        iconURL: clonesPlusIcon
    }),
    galleryItem({
        name: 'Looks Plus',
        // eslint-disable-next-line max-len
        description: 'Expands upon the looks category, allowing you to show/hide, get costume data and edit SVG skins on sprites. Created by LilyMakesThings.',
        extensionId: 'lmsLooksPlus',
        // extensionURL: 'https://mixality.github.io/Sidekick/sidekick-extensions/Lily/LooksPlus.js',
        extensionURL: 'https://menersar.github.io/Sidekick/sidekick-extensions/Lily/LooksPlus.js',
        iconURL: looksPlusIcon
    }),
    galleryItem({
        name: 'Clipping & Blending',
        description: 'Clipping outside of a specified rectangular area and additive color blending. Created by Vadik1.',
        extensionId: 'xeltallivclipblend',
        // extensionURL: 'https://mixality.github.io/Sidekick/sidekick-extensions/Xeltalliv/clippingblending.js',
        extensionURL: 'https://menersar.github.io/Sidekick/sidekick-extensions/Xeltalliv/clippingblending.js',
        iconURL: clippingBlendingIcon
    }),
    galleryItem({
        name: 'Text',
        description: 'Manipulate characters and text. Originally created by CST1229.',
        extensionId: 'strings',
        // extensionURL: 'https://mixality.github.io/Sidekick/sidekick-extensions/text.js',
        extensionURL: 'https://menersar.github.io/Sidekick/sidekick-extensions/text.js',
        iconURL: textIcon
    }),
    galleryItem({
        name: 'Bitwise',
        description: 'Blocks that operate on the binary representation of numbers in computers.',
        extensionId: 'Bitwise',
        // extensionURL: 'https://mixality.github.io/Sidekick/sidekick-extensions/bitwise.js',
        extensionURL: 'https://menersar.github.io/Sidekick/sidekick-extensions/bitwise.js',
        iconURL: bitwiseIcon
    }),
    galleryItem({
        name: 'BigInt',
        description: 'Math blocks that work on infinitely large integers (no decimals). Created by Skyhigh173.',
        extensionId: 'skyhigh173BigInt',
        // extensionURL: 'https://mixality.github.io/Sidekick/sidekick-extensions/Skyhigh173/bigint.js',
        extensionURL: 'https://menersar.github.io/Sidekick/sidekick-extensions/Skyhigh173/bigint.js',
        iconURL: bigIntIcon
    }),
    galleryItem({
        name: 'JSON',
        description: 'Work with JSON objects and arrays.',
        extensionId: 'skyhigh173JSON',
        // extensionURL: 'https://mixality.github.io/Sidekick/sidekick-extensions/Skyhigh173/json.js',
        extensionURL: 'https://menersar.github.io/Sidekick/sidekick-extensions/Skyhigh173/json.js',
        iconURL: jsonIcon
    }),
    galleryItem({
        name: 'RegExp',
        description: 'Full interface for working with Regular Expressions. Created by TrueFantom.',
        extensionId: 'truefantomregexp',
        // extensionURL: 'https://mixality.github.io/Sidekick/sidekick-extensions/true-fantom/regexp.js',
        extensionURL: 'https://menersar.github.io/Sidekick/sidekick-extensions/true-fantom/regexp.js',
        iconURL: regexIcon
    }),
    galleryItem({
        name: 'Box2D Physics',
        description: 'Two dimensional physics. Originally created by griffpatch.',
        extensionId: 'griffpatch',
        // extensionURL: 'https://mixality.github.io/Sidekick/sidekick-extensions/box2d.js',
        extensionURL: 'https://menersar.github.io/Sidekick/sidekick-extensions/box2d.js',
        iconURL: box2dIcon
    }),
    galleryItem({
        name: 'Fetch',
        description: 'Make requests to the broader internet.',
        extensionId: 'fetch',
        // extensionURL: 'https://mixality.github.io/Sidekick/sidekick-extensions/fetch.js',
        extensionURL: 'https://menersar.github.io/Sidekick/sidekick-extensions/fetch.js',
        iconURL: fetchIcon
    }),
    galleryItem({
        name: 'Local Storage',
        description: 'Store data persistently. Like cookies, but better.',
        extensionId: 'localstorage',
        // extensionURL: 'https://mixality.github.io/Sidekick/sidekick-extensions/local-storage.js',
        extensionURL: 'https://menersar.github.io/Sidekick/sidekick-extensions/local-storage.js',
        iconURL: localStorageIcon
    }),
    galleryItem({
        name: 'Utilities',
        description: 'A bunch of interesting blocks. Originally created by Sheep_maker.',
        extensionId: 'utilities',
        // extensionURL: 'https://mixality.github.io/Sidekick/sidekick-extensions/utilities.js',
        extensionURL: 'https://menersar.github.io/Sidekick/sidekick-extensions/utilities.js',
        iconURL: utilitiesIcon
    }),
    {
        name: (
            <FormattedMessage
                defaultMessage="Custom Extension"
                description="Name of library item to load a custom extension from a remote source"
                id="gui.customExtension.name"
            />
        ),
        extensionId: '',
        iconURL: customExtensionIcon,
        description: (
            <FormattedMessage
                defaultMessage="Load custom extensions from URLs, files, or JavaScript source code."
                description="Description of library item to load a custom extension from a custom source"
                id="gui.customExtension.description"
            />
        ),
        tags: ['sidekick'],
        incompatibleWithScratch: true,
        featured: true
    }


];
