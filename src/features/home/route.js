import {
    HomePage,
} from './index';


export default {
    path: '/',
    name: 'Home',
    childRoutes: [
        {
            path: '/',
            name: 'Home',
            component: HomePage,
            isIndex: true,
        },
        // {
        //     path: '/TechnologyPage',
        //     name: 'TechnologyPage',
        //     component: TechnologyPage,
        // },
    ],
};
