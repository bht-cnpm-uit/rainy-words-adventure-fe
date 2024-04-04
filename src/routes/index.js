import Home from '../pages/Home';
import VocabLib from '../pages/VocabLib';
import DifficultyComponent from '../pages/Game/DifficultyComponent';
import Level from '../pages/Game/Level';
import WordCollect from '../pages/Game/WordCollect';
//import LoginForm from '../pages/Login/login';
import LoginForm from '../pages/Login/loginReal';
import Result from '../pages/Game/Result';
// Public routes
const publicRoutes = [
    {
        path: '/',
        component: Home,
        props: {
            heading: 'Trang chủ',
        },
    },
    {
        path: '/vocab-library',
        component: VocabLib,
    },
    {
        path: '/difficulty',
        component: DifficultyComponent,
    },
    {
        path: '/word-collect',
        component: WordCollect,
    },
    {
        path: '/level',
        component: Level,
    },
    {
        path: '/result',
        component: Result,
    },
    {
        path: '/login',
        component: LoginForm,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
