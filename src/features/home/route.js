import {
    HomePage,
    ContactsPage,
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
        {
            path: '/contacts',
            name: 'ContactsPage',
            component: ContactsPage,
        },
    ],
};
