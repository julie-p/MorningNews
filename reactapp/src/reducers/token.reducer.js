export default function (token = '', action) {

    switch (action.type) {
        case 'addToken':
            let newToken = action.token;
            return newToken;

        default:
            return token;
    };
};