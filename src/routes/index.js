import Home from "../pages/Home";
import VocabLib from "../pages/VocabLib"
import Level from "../pages/Game/Level"
import WordCollect from "../pages/Game/WordCollect"
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
        path: '/level',
        component: Level
    },
    {
        path: '/word-collect',
        component: WordCollect
    }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };