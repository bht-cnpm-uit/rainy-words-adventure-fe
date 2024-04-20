import React, { useEffect } from 'react';
import { topic_level, topics } from './fakeTopics';
import { useState } from 'react';
const ModelAddTopic = ({ level, isOpenModelAddTopic, setIsOpenModelAddTopic, currentTopics, setCurrentTopics }) => {
    const [topicAdd, setTopicAdd] = useState([]);
    const [listTopicsAdd, setListTopicsAdd] = useState([]);
    const topicNames = topics.map(topic => topic.topic);
    const [topicsState, setTopics] = useState(topicNames);

    useEffect(() => {
        let tp = topicsState.map(topic => !currentTopics.includes(topic));
        setListTopicsAdd(tp);
    }, [currentTopics]);

    const handleDeleteTopic = (name) => {
        setTopicAdd(prevTopics => prevTopics.filter(topic => topic !== name));
        let tp = topicNames.map(topic => !currentTopics.includes(topic));
        setListTopicsAdd(tp);
    };
    const handleCheckbox = (topic) => {
        const updatedTopics = [...topicAdd];

        const topicIndex = updatedTopics.indexOf(topic);
        console.log(topicIndex)
        if (topicIndex !== -1) {
            updatedTopics.splice(topicIndex, 1);
        } else {
            updatedTopics.push(topic);
        }

        setTopicAdd(updatedTopics);
    };
    const handleAddTopics = () => {
        setCurrentTopics(currentTopics.concat(topicAdd));
        setIsOpenModelAddTopic(false);
    }

    return (
        <div className="absolute inset-0 h-screen overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className=" bg-white rounded-lg overflow-hidden shadow-xl relative  w-1/2">
                    <h5 className="font-bold text-center uppercase text-2xl text-blue-900 border-b-2 pb-2">LEVEL {level}</h5>
                    <div className="m-5 grid grid-cols-4 gap-4">
                        {topics.map(topic => (
                            <div key={topic.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={currentTopics.includes(topic.topic) || topicAdd.includes(topic.topic)}
                                    onChange={() => handleCheckbox(topic.topic)}
                                    className="mr-3 w-6 h-6 cursor-pointer"
                                    disabled={currentTopics.includes(topic.topic)}
                                />
                                <label>{topic.topic}</label>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end space-x-4 px-4 py-3 bg-gray-100">
                        <button
                            type="button"
                            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out"
                            onClick={() => setIsOpenModelAddTopic(!isOpenModelAddTopic)}
                        >
                            Hủy
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 bg-blue-400 text-white border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition duration-150 ease-in-out"
                            onClick={() => handleAddTopics()}
                        >
                            Cập nhật
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
const ModelDelete = ({ level, nameTopicDelete, isOpenModalDelete, setIsOpenModalDelete, handleDeleteTopic }) => {
    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpenModalDelete ? '' : 'hidden'}`} onClick={() => setIsOpenModalDelete(false)}>
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl relative w-1/3">
                <h5 className="font-bold text-center uppercase text-2xl text-blue-900 border-b-2 pb-2">LEVEL {level}</h5>
                <div className="p-4">
                    <p className='flex content-center'>Bạn có muốn xóa chủ đề:
                        <p className='ml-1 font-bold underline decoration-sky-500'>{nameTopicDelete}</p>
                    </p>
                </div>
                <div className="flex justify-end space-x-4 px-4 py-3 bg-gray-100">
                    <button
                        type="button"
                        className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out"
                        onClick={() => setIsOpenModalDelete(false)}
                    >
                        Hủy
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 bg-blue-400 text-white border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition duration-150 ease-in-out"
                        onClick={() => { handleDeleteTopic(); setIsOpenModalDelete(false) }}
                    >
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    )
}

const Level = ({ level, list_topics, setLevelTopics }) => {
    const [currentTopics, setCurrentTopics] = useState([])
    const [isOpenModelAddTopic, setIsOpenModelAddTopic] = useState(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
    const [nameTopicDelete, setNameTopicDelete] = useState();
    useEffect(() => {
        let tp = list_topics.topicID.map(idx => topics[idx].topic);
        setCurrentTopics(tp);
    }, [list_topics]);
    const handleDeleteTopic = () => {
        setCurrentTopics(prevTopics => prevTopics.filter(topic => topic !== nameTopicDelete));
        setNameTopicDelete(null);
    };
    return (
        <div className="level mb-5">
            <div className="lv flex flex-row mb-1">
                <svg
                    className='w-6 h-6 fill-blue-400'
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M32 0C49.7 0 64 14.3 64 32V48l69-17.2c38.1-9.5 78.3-5.1 113.5 12.5c46.3 23.2 100.8 23.2 147.1 0l9.6-4.8C423.8 28.1 448 43.1 448 66.1V345.8c0 13.3-8.3 25.3-20.8 30l-34.7 13c-46.2 17.3-97.6 14.6-141.7-7.4c-37.9-19-81.3-23.7-122.5-13.4L64 384v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V400 334 64 32C0 14.3 14.3 0 32 0zM64 187.1l64-13.9v65.5L64 252.6V318l48.8-12.2c5.1-1.3 10.1-2.4 15.2-3.3V238.7l38.9-8.4c8.3-1.8 16.7-2.5 25.1-2.1l0-64c13.6 .4 27.2 2.6 40.4 6.4l23.6 6.9v66.7l-41.7-12.3c-7.3-2.1-14.8-3.4-22.3-3.8v71.4c21.8 1.9 43.3 6.7 64 14.4V244.2l22.7 6.7c13.5 4 27.3 6.4 41.3 7.4V194c-7.8-.8-15.6-2.3-23.2-4.5l-40.8-12v-62c-13-3.8-25.8-8.8-38.2-15c-8.2-4.1-16.9-7-25.8-8.8v72.4c-13-.4-26 .8-38.7 3.6L128 173.2V98L64 114v73.1zM320 335.7c16.8 1.5 33.9-.7 50-6.8l14-5.2V251.9l-7.9 1.8c-18.4 4.3-37.3 5.7-56.1 4.5v77.4zm64-149.4V115.4c-20.9 6.1-42.4 9.1-64 9.1V194c13.9 1.4 28 .5 41.7-2.6l22.3-5.2z" />
                </svg>
                <h3 className='ml-2 text-blue-500 text-lg font-bold uppercase'>Level {level}</h3>
            </div>
            <div className=" flex flex-row">
                <div className="topics">
                    {
                        currentTopics.map((name, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300">
                                {name}
                                <button type="button" className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                                    onClick={() => { setIsOpenModalDelete(!isOpenModalDelete); setNameTopicDelete(name) }}
                                >
                                    <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                </button>
                            </span>
                        ))
                    }
                </div>
                <div className="add-topics">
                    <button
                        className='w-12 h-7 bg-orange-300 border rounded flex justify-center items-center hover:bg-orange-400'
                        onClick={() => setIsOpenModelAddTopic(!isOpenModelAddTopic)}
                    >
                        <svg
                            className='w-5 h-5'
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512">
                            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                        </svg>
                    </button>
                </div>
                {
                    isOpenModalDelete && nameTopicDelete &&
                    <ModelDelete
                        level={level}
                        nameTopicDelete={nameTopicDelete}
                        isOpenModalDelete={isOpenModalDelete}
                        setIsOpenModalDelete={setIsOpenModalDelete}
                        handleDeleteTopic={handleDeleteTopic}
                    />
                }
                {
                    isOpenModelAddTopic &&
                    <ModelAddTopic
                        level={level}
                        isOpenModelAddTopic={isOpenModelAddTopic}
                        setIsOpenModelAddTopic={setIsOpenModelAddTopic}
                        currentTopics={currentTopics}
                        setCurrentTopics={setCurrentTopics}
                    />
                }
            </div>

        </div>
    );
};

const GameManagement = () => {
    const levels = Array.from({ length: 20 }, (_, index) => index + 1);
    const [levelTopics, setLevelTopics] = useState(topic_level)
    const levelsInColumns = [
        levels.slice(0, Math.ceil(levels.length / 2)),
        levels.slice(Math.ceil(levels.length / 2))
    ];

    return (
        <div className="h-screen flex flex-col">
            <header className='h-1/5 flex justify-center items-center content-center text-2xl uppercase font-bold text-blue-700 border-b-2'>
                Quản lý từ vựng các màn chơi
            </header>
            <div className="h-4/5 level-manage ml-5 flex overflow-auto mt-2 mb-10">
                {/* Render levels in two columns */}
                {levelsInColumns.map((column, columnIndex) => (
                    <div key={columnIndex}
                        className="flex flex-col w-1/2"
                    >
                        {column.map((level) => (
                            <Level key={level} level={level} list_topics={levelTopics[level - 1]} setLevelTopics={setLevelTopics} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};


export default GameManagement;
