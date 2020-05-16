export default function (wishlist = [], action) {

    let wishlistCopy = [...wishlist];

    switch (action.type) {
        
        case 'saveArticle':
            return action.articles;

        case 'addArticle':
            let findArticle = wishlist.every(e => e.title !== action.articleLike.title);
            if (!findArticle) {
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