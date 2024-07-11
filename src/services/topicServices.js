import instance from '../axios';


const getTopics = () => {
    return instance.get('api/topic/get-all');
};
const createTopics = (listTopic) => {
    return instance.post('api/topic/create', {listTopic});
};


export { createTopics, getTopics };
