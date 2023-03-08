import {
    SET_BLOG_DATA,
    SET_BLOG_LOADING,
    SET_FEATURED_BLOGS,
    SET_SEARCH_BLOGS,
    SET_CAREER_DATA,
    SET_CAREER_LOADING,
} from '../types';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_BLOG_LOADING:
            return {
                ...state,
                blogLoaded: action.payload,
            };
        case SET_BLOG_DATA:
            return {
                ...state,
                blogData: action.payload,
            };
        case SET_CAREER_LOADING:
            return {
                ...state,
                careerLoaded: action.payload,
            };
        case SET_CAREER_DATA:
            return {
                ...state,
                careerData: action.payload,
            };
        case SET_FEATURED_BLOGS:
            return {
                ...state,
                featuredBlogs: action.payload,
            };
        case SET_SEARCH_BLOGS:
            return {
                ...state,
                searchBlogs: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export default reducer;
