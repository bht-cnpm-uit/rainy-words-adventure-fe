import React, { useState } from 'react';
function Level() {
    return (
        <div className="h-screen bg-[url('src/assets/img/background')] bg-cover bg-center">
            <div className="grid grid-cols-2">
                <div className="">
                    <button
                        className="ml-40 mt-20 rounded border-2 px-5 py-1.5 font-bold duration-200 hover:bg-[#ff2343] "
                        type="button"
                    >
                        Hướng dẫn
                    </button>
                </div>

                <div className="flex justify-end mt-5 scale-75">
                    <button className="mr-5 h-0">
                         <img src="src/assets/img/BtnInstr.png" alt="" />   
                    </button>
                    <button className="mr-5 h-0">
                        <img src="src/assets/img/BtnRank.png" alt="" />
                    </button>
                    <button className="">
                        <img src="src/assets/img/BtnLogin.png" alt="" />
                    </button>

                </div>
            </div>

            <div className='ml-5 grid grid-rows-3 grid-flow-col gap-4'>
                {/* <img src="src/assets/img/cat2.png" alt="" />
                <div className='row-span-2 h-20 w-20 bg-blue-500 rounded-full flex justify-center items-center'>1</div>
                <div className=' h-20 w-20 bg-blue-500 rounded-full flex justify-center items-center'>2</div>
                <div className='row-span-2 col-span-2 h-20 w-20 bg-blue-500 rounded-full flex justify-center items-center'>3</div> */}
            </div>

        </div>
    );
    
}

export default Level;
