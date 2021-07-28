const requireContext = require.context('modules', true, /i18n\/es\.json$/);
// import currentEnTranslations from '../en/translate.json';

export default requireContext.keys().reduce(
    (acc, filePath) => ({
        ...acc,
        ...requireContext(filePath),
    }),
    {},
);
