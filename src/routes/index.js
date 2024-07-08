import Home from '../pages/Home';
import VocabLib from '../pages/VocabLib';
import DifficultyComponent from '../pages/Game/DifficultyComponent';
import Level from '../pages/Game/Level';
import Game from '../pages/Game/Game';
//import LoginForm from '../pages/Login/login';
// import LoginForm from '../pages/Login/loginReal';
import Login from '../pages/Login/';
import Signin from '../pages/Signin/';
import Result from '../pages/Game/Result';
import Admin from '../pages/Admin'
// Public routes
const publicRoutes = [
    {
        requiresAuth: false,
        path: '/',
        component: Home,
        props: {
            heading: 'Trang chủ',
        },
    },
    {
        requiresAuth: true,
        path: '/vocab-library',
        component: VocabLib,
    },
    {
        requiresAuth: true,
        path: '/difficulty',
        component: DifficultyComponent,
    },
    {
        requiresAuth: false,
        path: '/level',
        component: Level,
    },
    {
        requiresAuth: true,
        path: '/result',
        component: Result,
    },
    {
        requiresAuth: false,
        path: '/login',
        component: Login,
    },
    {
        requiresAuth: false,
        path: '/signin',
        isAuth: false,
        component: Signin,
    },
    {
        requiresAuth: true,
        path: '/admin',
        component: Admin,
    },
    {
        requiresAuth: true,
        path: '/game',
        component: Game,
    }

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
