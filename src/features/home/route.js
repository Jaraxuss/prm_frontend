import {
    HomePage,
    ContactsPage,
    JournalPage,
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
        {
            path: '/journal',
            name: 'JournalPage',
            component: JournalPage,
        },
    ],
};
