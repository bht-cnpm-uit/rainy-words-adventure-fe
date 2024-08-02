import React, { useState } from 'react';

const cards = [
    {
        name: 'Hướng dẫn',
        content: `Chào mừng các bạn đến với "Rainy Words Adventure". Mình là Hướng Dương - sẽ cùng các bạn chinh phục trò chơi này nhé!
            Trò chơi có 20 level, mỗi level có 3 mức độ khó: dễ, trung bình, và khó.
            Trong mỗi lượt chơi sẽ có hai màn chơi: Hứng từ và Nối từ.
            Ở phần Hứng từ, các bạn di chuyển nhân vật bằng các phím trái và phải để hứng từ, đồng thời nhanh chóng ghi nhớ các từ vựng đó. Khi các bạn thu thập đủ 12 từ vựng, trò chơi sẽ tự động chuyển sang phần Nối từ.
            Mỗi màn chơi, các bạn sẽ có 3 mạng sống để tiếp tục cuộc phiêu lưu.
            Trong quá trình chơi, các bạn có thể thu thập các vật phẩm bonus như hoa hướng dương để tăng lại mạng đã mất, hoa hồng, hoa trắng, lá cây, kẹo, bánh, kẹo mút để mở khóa những phần thưởng nhé.
            Điểm được tính dựa trên độ khó của từ vựng: mức dễ (10 điểm/ từ), mức trung bình (20 điểm/ từ), và mức khó (30 điểm/ từ). Hãy nhớ rằng từ càng dài thì độ khó càng tăng nhé.\n
            Ở phần Nối từ, các bạn sẽ nối từ tiếng Anh với nghĩa tiếng Việt trong 3 lượt, mỗi lượt gồm 4 trong thời gian 25s (đối với mức dễ), 20s (đối với mức trung bình) và 15s (đối với mức khó).
            Điểm được tính dựa trên số từ nối đúng, với số điểm mỗi từ tương ứng với phần hứng từ.
            Kết quả mỗi màn chơi sẽ bao gồm tổng điểm và tổng thời gian hoàn thành cả hai phần.
            Mỗi level chỉ tính điểm đạt được cao nhất và thời gian hoàn thành nhanh nhất.
            Chúc các bạn chơi vui vẻ và học được nhiều từ vựng mới cùng mình nhé!`
    },
    {
        name: 'Giải thưởng',
        content: `
        Trong quá trình chơi, các bạn có thể thu thập các vật phẩm như kẹo, bánh, hoa hồng,... Khi các bé thu thập vượt ngưỡng 500 cái mỗi loại, các bạn sẽ được thưởng danh hiệu (cúp).
        Khi thu thập đủ số cúp, các bạn có thể mở khóa các khung ảnh đại diện:
        Khung đồng (>=2 cúp)
        Khung bạc (>=3 cúp) 
        Khung vàng (>=4 cúp)
        Khung kim cương (>=6 cúp)
        Chúc các đạt được nhiều giải thưởng !
        `
    },
];

const PopUpInstruc = ({ openPopUp, closePopUp }) => {
    const [selectedCard, setSelectedCard] = useState(cards[0]);

    const handleClickCard = (card) => {
        setSelectedCard(card);
    };
    const handleClosePopUp = (e) => {
        if (e.target.id === 'ModelContainer') {
            closePopUp();
        }
    };

    const handleClosePopUpInstr = (e) => {
        closePopUp();
    };
    if (!openPopUp) return null;

    return (
        <div
            id="ModelContainer"
            onClick={handleClosePopUp}
            className="bg-black fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-sm"
        >
            <div className="border-4 border-yellow-600 w-10/12 h-3/5 rounded-lg bg-orange-100 p-2 py-2 shadow-md md:w-1/2 lg:w-1/2 flex flex-col">
                <div className="relative flex flex-row w-full h-full">
                    <button
                        className="absolute -right-6 -top-6 h-12 w-12 bg-[url('/assets/Asset/ButtonSliderAtlas/image_19.png')] bg-cover"
                        onClick={handleClosePopUpInstr}
                    ></button>
                    <div className="list-none w-1/5 divide-y font-mono text-white ">
                        {cards.map((item, idx) => (
                            <div
                                className="cursor-pointer py-2 text-center w-full "
                                key={idx}
                                onClick={() => handleClickCard(item)}
                            >
                                <p className={`text-lg rounded-lg font-semibold ${selectedCard.name === item.name ? 'bg-orange-500' : 'bg-orange-300'}`}>{item.name}</p>
                            </div>
                        ))}
                    </div>

                    <div className="relative w-4/5 col-span-3 ml-6 mr-6 mt-6 p-5 bg-orange-200 rounded-lg overflow-y-auto scrollbar-thin scrollbar-track-orange-200 scrollbar-thumb-orange-400 flex-grow">
                        {selectedCard && (
                            <p className="text-sm text-justify whitespace-pre-line">
                                {selectedCard.content}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopUpInstruc;
