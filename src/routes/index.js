import Home from '../pages/Home';
import VocabLib from '../pages/VocabLib';
import Level from '../pages/Game/Level';
import Game from '../pages/Game/Game';
//import LoginForm from '../pages/Login/login';
// import LoginForm from '../pages/Login/loginReal';
import Login from '../pages/Login/';
import SignUp from '../pages/Signup';
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
        path: '/signup',
        isAuth: false,
        component: SignUp,
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
