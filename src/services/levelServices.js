import instance from '../axios';


const getTopicLevels = () => {
    return instance.get('api/level/get-all');
}

const addTopicToLevel = (topics) => {
    return instance.post('api/level/add-topic', topics);
}

const deleteTopicsFromLevel = (topics) => {
    return instance.post('api/level/delete-topic', topics);
}

export { getTopicLevels, addTopicToLevel, deleteTopicsFromLevel };
