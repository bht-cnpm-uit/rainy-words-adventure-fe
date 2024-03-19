import Home from "../pages/Home";
import VocabLib from "../pages/VocabLib"
import DifficultyComponent from "../pages/Game/DifficultyComponent"
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
        path: '/difficulty',
        component: DifficultyComponent,
    },
    {
        path: '/word-collect',
        component: WordCollect
    },
    {
        path: '/level',
        component: Level,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };