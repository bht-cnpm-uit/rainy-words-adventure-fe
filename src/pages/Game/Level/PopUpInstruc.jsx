import React, { useState } from 'react';

const cards = [
    {
        name: 'Hướng dẫn',
        content: `Chào mừng các bạn đến với "Rainy Words Adventure". Mình là Hướng Dương, sẽ hướng dẫn các bạn chơi trò chơi này nhé!
            Đầu tiên, các bé hãy đăng ký hoặc đăng nhập để bắt đầu cuộc phiêu lưu.
            Trò chơi có 20 level, mỗi level có 3 mức độ khó: dễ, trung bình, và khó. Các bạn sẽ chọn level và mức độ phù hợp để bắt đầu chơi.\n
            Trong trò chơi, các bạn sẽ tham gia vào hai phần: Hứng từ và Nối từ.
            Ở phần Hứng từ, các bạn sẽ di chuyển nhân vật bằng các phím trái và phải để hứng từ, đồng thời nhanh chóng ghi nhớ các từ vựng đó.
            Khi các bạn thu thập đủ 12 từ vựng, trò chơi sẽ tự động chuyển sang phần Nối từ.
            Mỗi màn chơi, các bạn sẽ có 3 mạng sống để tiếp tục cuộc phiêu lưu.
            Trong quá trình chơi, các bé có thể thu thập các vật phẩm bonus như hoa hướng dương để tăng lại mạng đã mất, hoa hồng, hoa trắng, lá cây ở level từ 1 đến 10, và kẹo, bánh, kẹo mút ở level từ 11 đến 20.\n
            Điểm được tính dựa trên độ khó của từ vựng: mức dễ (10 điểm/ từ), mức trung bình (20 điểm/ từ), và mức khó (30 điểm/ từ).\n
            Ở phần Nối từ, các bạn sẽ nối từ tiếng Anh với nghĩa tiếng Việt trong 3 lượt, mỗi lượt gồm 4 từ.
            Mỗi lượt nối kéo dài 20 giây.
            Điểm được tính dựa trên số từ nối đúng, với số điểm mỗi từ tương ứng với phần hứng từ.
            Kết quả mỗi màn chơi sẽ bao gồm tổng điểm và tổng thời gian hoàn thành cả hai phần.
            Chúc các bé chơi vui vẻ và học được nhiều từ vựng mới cùng mình nhé!`
    },
    {
        name: 'Giải thưởng',
        content: `
        Chào mừng các bé tiểu học đến với "Rainy Words Adventure". Mình là bạn Hướng Dương, sẽ hướng dẫn các bé chơi trò chơi này nhé!
        Các bạn cố gắng đạt điểm cao nhất trong mỗi màn chơi để đứng đầu bảng xếp hạng hằng tháng.
        Trong quá trình chơi, các bạn có thể thu thập các vật phẩm như kẹo, bánh, hoa hồng,... Khi các bé thu thập vượt ngưỡng 500 cái mỗi loại, các bạn sẽ được thưởng danh hiệu (cúp).
        Có các danh hiệu như Học sinh chăm chỉ nhất tháng dành cho bé hoàn thành màn chơi nhiều nhất tháng và Học sinh xuất sắc nhất tháng dành cho bé đạt top 1 trong tháng.
        Khi các bạn thu thập đủ số cúp, các bạn có thể mở khóa các ảnh đại diện đặc biệt: đồng (>=1 cúp), bạc (>=2 cúp), vàng (>=3 cúp), bạch kim (>=5 cúp), và kim cương (>=7 cúp). 
        Bảng xếp hạng sẽ xếp hạng các bé theo tổng điểm của các level đã mở khóa. Mỗi level chỉ tính điểm cao nhất và thời gian hoàn thành nhanh nhất. Nếu điểm bằng nhau, sẽ so sánh thời gian hoàn thành.
        Chúc các bé chơi vui vẻ và học được nhiều từ vựng mới cùng mình nhé!
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
            <div className="border border-4 border-yellow-600 w-10/12 rounded-lg bg-orange-100 p-2 py-2 shadow-md md:w-1/2 lg:w-1/2">
                <div className="relative flex grid w-full grid-cols-4 items-center justify-center p-3">
                    <button
                        className="absolute -right-6 -top-5 h-12 w-12 bg-[url('/assets/Asset/ButtonSliderAtlas_cuts/image_19.png')] bg-cover"
                        onClick={handleClosePopUpInstr}
                    ></button>
                    <div className="list-none divide-y divide-gray-200 font-mono text-white">
                        {cards.map((item, idx) => (
                            <li
                                className="cursor-pointer py-2 text-center"
                                key={idx}
                                onClick={() => handleClickCard(item)}
                            >
                                <p className={`text-xl rounded-lg font-semibold bg-orange-300 ${selectedCard.name === item.name ? 'bg-orange-500' : 'bg-orange-300'}`}>{item.name}</p>
                            </li>
                        ))}
                    </div>

                    {selectedCard && (
                        <div className=" col-span-3 ml-4 mr-4 mt-4 bg-orange-50 rounded-lg max-h-96 overflow-y-auto p-3 scrollbar-thin scrollbar-track-orange-200 scrollbar-thumb-orange-400">
                            <p className="text-lg text-justify whitespace-pre-line">
                                {selectedCard.content}
                            </p>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    );
};

export default PopUpInstruc;
