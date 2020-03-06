import {
    HomePage,
    ContactsPage,
    JournalPage,
    ContactDetailPage,
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
        {
            path: '/contactDetail',
            name: 'ContactDetailPage',
            component: ContactDetailPage,
        },
    ],
};
