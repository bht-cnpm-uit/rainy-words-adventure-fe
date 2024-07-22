import instance from '../axios';
const getLeaderboard = () => {
    return instance.get('api/leaderboard/get-all');
};
const createNewGame = (data) => {
    return instance.post(`api/game/create-new-game`, data);
};
const saveGame = (data) => {
    return instance.post(`api/game/save-game`, data);
}
export { getLeaderboard, createNewGame, saveGame };
