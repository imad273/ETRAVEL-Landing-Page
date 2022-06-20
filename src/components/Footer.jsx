import React from 'react';

function Footer() {
  return (
    <div className='absolute bottom-0 w-full left-0 md:mx-0 '>
      <div className='container bg-footerBg px-3 py-4 text-mainText mt-5 md:mb-5 md:rounded-xl'>
        <div className='flex justify-between items-center flex-wrap'>
          <p className='text-sm m-auto md:m-0'>Copyright © 2022 Travelo. All rights reserved</p>
          <div className='m-auto md:m-0 pt-3 md:pt-0'>
            <i className='bx bxl-facebook mx-2 text-xl cursor-pointer'></i>
            <i className='bx bxl-linkedin mx-2 text-xl cursor-pointer'></i>
            <i className='bx bxl-instagram mx-2 text-xl cursor-pointer'></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer