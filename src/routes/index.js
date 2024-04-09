import Home from '../pages/Home';
import VocabLib from '../pages/VocabLib';
import DifficultyComponent from '../pages/Game/DifficultyComponent';
import Level from '../pages/Game/Level';
import WordCollect from '../pages/Game/WordCollect';
//import LoginForm from '../pages/Login/login';
// import LoginForm from '../pages/Login/loginReal';
import Login from '../pages/Login/';
import Result from '../pages/Game/Result';
import WordChain from '../pages/Game/WordChain';
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
        path: '/word-chain',
        component: WordChain,
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
        component: Login,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
