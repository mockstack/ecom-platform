export default class Key {
    // keys for cookies
    public static COOKIE_USER_ID = 'uId';
    public static COOKIE_USER = 'cU';
    public static COOKIE_USER_SESSION = 'uS';

    // keys for session storage
    public static SS_CATEGORY_LIST: string = 'ss-category-list';
    public static SS_PRODUCT_LIST: string = 'ss-product-list';    
    public static SS_LOGGED_USER: string = 'logged-user-model';
    public static SS_LOGGED_USER_SESSION: string = 'logged-user-session';
    public static SS_IS_USER_LOGGEDIN: string = 'is-user-loggedin';

    // Keys for local storage
    public static LS_CART: string = 'co-cart';

    // pack
    public static SS_PACK_PRIVATE: string = 'private-packs';
    public static SS_PACK_DEFAULT: string = 'default-packs'
    
    // cart
    public static CART_ID: string = 'cId';
}
