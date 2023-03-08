import React, { useReducer } from 'react';
import { fetchWrapper } from '../../helpers/fetch-wrapper';
import GlobalContext from './GlobalContext';
import GlobalReducer from './GlobalReducer';
import {
    SET_BLOG_DATA,
    SET_BLOG_LOADING,
    SET_FEATURED_BLOGS,
    SET_SEARCH_BLOGS,
    SET_CAREER_DATA,
    SET_CAREER_LOADING,
} from '../types';
import { BLOG_TAG_TYPE } from '../../config/constants';

const GlobalState = ({ children }) => {
    const initialState = {
        blogData: [],
        featuredBlogs: [],
        searchBlogs: [],
        blogLoaded: false,
        careerData: [],
        careerLoaded: false,
    };

    const [state, dispatch] = useReducer(GlobalReducer, initialState);

    const { blogData, featuredBlogs, searchBlogs, blogLoaded, careerData, careerLoaded } = state;

    const setSearchBlogs = (value) => {
        dispatch({
            type: SET_SEARCH_BLOGS,
            payload: value,
        });
    };

    const setFeaturedBlogs = (value) => {
        dispatch({
            type: SET_FEATURED_BLOGS,
            payload: value,
        });
    };

    const setBlogLoaded = (value) => {
        dispatch({
            type: SET_BLOG_LOADING,
            payload: value,
        });
    };

    const setCareerLoaded = (value) => {
        dispatch({
            type: SET_CAREER_LOADING,
            payload: value,
        });
    };

    const setCareerData = () => {
        fetchWrapper
            .get('/wp-json/wp/v2/career?_embed=true')
            .then((res) => {
                dispatch({
                    type: SET_CAREER_DATA,
                    payload: res,
                });
                setCareerLoaded(true);
            })
            .catch((msg) => {
                console.log(msg);
                setCareerLoaded(true);
            });
    };

    const setBlogData = () => {
        fetchWrapper
            .get('/wp-json/wp/v2/posts?_embed=true&categories=9')
            .then((res) => {
                for (let i = 0; i < res.length; i++) {
                    res[i].title.rendered = res[i].title.rendered.replace('#038;', '');
                }

                dispatch({
                    type: SET_BLOG_DATA,
                    payload: res,
                });

                const temp = res.filter((item, index) => {
                    item.blogIndex = index;
                    if (item.tags.includes(BLOG_TAG_TYPE.FEATURED)) return true;
                    return false;
                });

                setFeaturedBlogs(temp);
                setBlogLoaded(true);
                setSearchBlogs(res);
            })
            .catch((msg) => {
                console.log(msg);
                setBlogLoaded(true);
            });
    };

    return (
        <GlobalContext.Provider
            value={{
                blogData,
                blogLoaded,
                featuredBlogs,
                searchBlogs,
                careerData,
                careerLoaded,
                setBlogData,
                setBlogLoaded,
                setFeaturedBlogs,
                setSearchBlogs,
                setCareerData,
                setCareerLoaded,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalState;
