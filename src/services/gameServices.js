import instance from '../axios';
const getLeaderboard = () => {
    return instance.get('api/leaderboard/get-all');
};
const createNewGame = (data) => {
    return instance.get(`api/game/create-new-game/${data.level}/${data.diff}`);
};

export { getLeaderboard, createNewGame };
