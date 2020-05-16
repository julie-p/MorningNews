export default function (selectLanguage = null, action) {

    switch (action.type) {
        case 'changeLanguage':
            return action.selectLanguage;

        default:
            return selectLanguage;
    }
}; 