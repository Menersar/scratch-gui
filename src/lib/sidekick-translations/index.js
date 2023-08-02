import sidekickTranslations from './generated-translations.json';

const addAdditionalTranslations = editorMessages => {
    for (const locale of Object.keys(editorMessages)) {
        const toMixIn = sidekickTranslations[locale.toLowerCase()];
        if (toMixIn) {
            Object.assign(editorMessages[locale], toMixIn);
        }
    }

    // We reuse our `es` translations for `es-419` instead of maintaining separate translations.
    Object.assign(editorMessages['es-419'], sidekickTranslations.es);
};

export default addAdditionalTranslations;
