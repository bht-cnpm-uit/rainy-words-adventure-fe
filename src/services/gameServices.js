import instance from '../axios';
const getLeaderboard = () => {
    return instance.get('api/leaderboard/get-all');
};

export { getLeaderboard };
