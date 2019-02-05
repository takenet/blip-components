const requireContext = require.context('modules', true, /i18n\/pt\.json$/);
// import currentPtTranslations from '../pt/translate.json';

export default requireContext.keys().reduce(
    (acc, filePath) => ({
        ...acc,
        ...requireContext(filePath),
    }),
    {},
);
