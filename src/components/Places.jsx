import React from 'react';
// Images
import Singapore from '../images/Singapore.jpg';
import Bora from '../images/Bora.jpg';
import Thailand from '../images/Thailand.jpg';
import NewZealand from '../images/NewZealand.jpg';
import Paris from '../images/Paris.jpg';

function Places() {
  return (
    <div className='my-6'>
      <h1 className='text-3xl text-center pt-4 pb-6 font-semibold'>Recommended Destination</h1>
      <div className='flex flex-wrap'>
        <div className='md:w-4/12 w-full'>
          <div className="m-2 text-mainText">
            <img src={Singapore} alt='Singapore' className='rounded-xl shadow' />
            <h3 className='py-2 text-lg font-semibold'>Singapore</h3>
            <p className='text-sm truncate text-secondText'>Singapore, officially the Republic of Singapore, is a sovereign island city-state in maritime Southeast</p>
            <div className='float-right pt-3'>
              <span className='text-right text-sm font-semibold block'>$6000</span>
              <span className='text-[11px] pb-1 relative -top-1'>Approx 2 night trip</span>
            </div>
          </div>
        </div>
        <div className='md:w-4/12 w-full'>
          <div className="m-2 text-mainText">
            <img src={Thailand} alt='Thailand' className='rounded-xl shadow' />
            <h3 className='py-2 text-lg font-semibold'>Thailand</h3>
            <p className='text-sm truncate text-secondText'>Thailand is a Southeast Asian country. It's known for tropical beaches, opulent royal palaces</p>
            <div className='float-right pt-3'>
              <span className='text-right text-sm font-semibold block'>$5000</span>
              <span className='text-[11px] pb-1 relative -top-1'>Approx 3 night trip</span>
            </div>
          </div>
        </div>
        <div className='md:w-4/12 w-full'>
          <div className="m-2 text-mainText">
            <img src={Paris} alt='Paris' className='rounded-xl' />
            <h3 className='py-2 text-lg font-semibold'>Paris</h3>
            <p className='text-sm truncate text-secondText'>Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture.</p>
            <div className='float-right pt-3'>
              <span className='text-right text-sm font-semibold block'>$8000</span>
              <span className='text-[11px] pb-1 relative -top-1'>Approx 2 night trip</span>
            </div>
          </div>
        </div>
        <div className='md:w-4/12 w-full'>
          <div className="m-2 text-mainText">
            <img src={NewZealand} alt='NewZealand' className='rounded-xl' />
            <h3 className='py-2 text-lg font-semibold'>New Zealand</h3>
            <p className='text-sm truncate text-secondText'>New Zealand is an island country in the southwestern Pacific Ocean. It consists of two main landmasses</p>
            <div className='float-right pt-3'>
              <span className='text-right text-sm font-semibold block'>$5500</span>
              <span className='text-[11px] pb-1 relative -top-1'>Approx 2 night 2 day trip</span>
            </div>
          </div>
        </div>
        <div className='md:w-4/12 w-full'>
          <div className="m-2 text-mainText">
            <img src={Bora} alt='Bora' className='rounded-xl' />
            <h3 className='py-2 text-lg font-semibold'>Bora</h3>
            <p className='text-sm truncate text-secondText'>Bora Bora is a small South Pacific island northwest of Tahiti in French Polynesia. Surrounded by sand</p>
            <div className='float-right pt-3'>
              <span className='text-right text-sm font-semibold block'>$4300</span>
              <span className='text-[11px] pb-1 relative -top-1'>Approx 3 night trip</span>
            </div>
          </div>
        </div>
        <div className='md:w-4/12 w-full'>
          <div className="m-2 text-mainText">
            <img src={Singapore} alt='london' className='rounded-xl' />
            <h3 className='py-2 text-lg font-semibold'>London</h3>
            <p className='text-sm truncate text-secondText'>London, the capital of England and the United Kingdom, is a 21st-century city with history stretching</p>
            <div className='float-right pt-3'>
              <span className='text-right text-sm font-semibold block'>$8700</span>
              <span className='text-[11px] pb-1 relative -top-1'>Approx 2 night trip</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Places