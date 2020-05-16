export default function (wishlist = [], action) {

    let wishlistCopy = [...wishlist];

    switch (action.type) {
        case 'addArticle':
            let findArticle = wishlist.every(e => e.title !== action.articleLike.title);
            if (findArticle === true) {
                wishlistCopy.push(action.articleLike);
            };
            return wishlistCopy;

        case 'deleteArticle':
            wishlistCopy = wishlist.filter(e => e.title !== action.title);
            return wishlistCopy;

        default:
            return wishlist;
    };
};