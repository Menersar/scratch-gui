/* eslint-disable require-await */
/* eslint-disable require-jsdoc */

export default async function ({addon}) {
    addon.tab.redux.dispatch({
        type: 'sidekick/SET_CLOUD',
        cloud: false
    });
}
