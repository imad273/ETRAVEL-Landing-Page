import React from 'react';
import { useState, useEffect } from 'react'
// Images
import HomeImg from '../images/Home.jpg';
import Singapore from '../images/Singapore.jpg';
import Bora from '../images/Bora.jpg';
import Thailand from '../images/Thailand.jpg';
import NewZealand from '../images/NewZealand.jpg';
import Paris from '../images/Paris.jpg';

// Logo's
import BestPrices from '../images/BestPrices.svg';
import CovidSafe from '../images/CovidSafe.svg';
import Fpayment from '../images/Fpayment.svg';
import Nearby from '../images/Nearby.svg';

function Home() {
  const [Data, setData] = useState([]);

  const getBlogs = async () => {
    var request = await fetch(`http://localhost:3001/getBlogs`, {
      method: 'GET'
    });

    const response = await request.json();

    var blogs = [];

    for (var i = 0; i < 3; i++) {
      blogs.push(response[i]);
    }
    
    setData(blogs);

  }
  useEffect(() => {
    getBlogs();
  }, [])

  return (
    <>
      <div className='h-[90vh] pt-3'>
        <div className='h-full relative md:rounded-xl overflow-hidden'>
          <div className='absolute h-full w-full bg-black/30 z-10'></div>
          <div className='absolute h-full w-full flex justify-center flex-col items-center z-20 text-white'>
            <h1 className='text-4xl md:text-5xl text-center font-bold py-2'>Travel To explore</h1>
            <p className='md:w-4/12 text-xs md:text-sm text-center py-2 px-3'>Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ultricies Mi Eget Mauris</p>
            <div className='mx-2 rounded-lg flex md:items-center flex-col md:flex-row bg-white/70 backdrop-blur-sm my-2 px-2 py-3'>
              <div className='flex flex-col px-2'>
                <span className='text-mainText'>Where You Want to go</span>
                <div className='flex items-center justify-center'>
                  <i className='bx bx-search text-[#7E7E7E] pr-1'></i>
                  <input type="text" placeholder='Search your Location' className='py-1 text-sm text-[#222] bg-transparent' />
                </div>
              </div>
              <div className='w-full h-px md:h-full md:w-px bg-[#B4C6EE] my-1 md:my-0'></div>
              <div className='flex flex-col px-2'>
                <span className='text-mainText'>Check-in</span>
                <input type="text" placeholder='Add Date' className='py-1 text-[#222] text-sm bg-transparent' />
              </div>
              <div className='w-full h-px md:h-full md:w-px bg-[#B4C6EE] my-1 md:my-0'></div>
              <div className='flex flex-col px-2'>
                <span className='text-mainText'>Check-out</span>
                <input type="text" placeholder='Add Date' className='py-1 text-[#222] text-sm bg-transparent' />
              </div>
              <div className='w-full h-px md:h-full md:w-px bg-[#B4C6EE] my-1 md:my-0'></div>
              <div className='m-auto my-2 md:my-0'>
                <button className='bg-primary px-4 py-3 rounded-lg'>Expolre Now</button>
              </div>
            </div>
          </div>
          <img src={HomeImg} alt="HomeImg" className='h-full w-full object-cover -z-10' />
        </div>
      </div>

      <div className='min-h-[70vh] flex justify-center items-center py-8'>
        <div className='flex flex-wrap'>
          <div className='md:flex-1 px-3 py-1 mx-2 my-2 md:my-0 shadow-mine rounded-2xl w-full'>
            <div>
              <div>
                <img src={BestPrices} alt='BestPrices' className='px-4 py-2 bg-primaryBg1 my-2 rounded-xl' />
                <h3 className='text-xl my-3'>Get Best Prices</h3>
              </div>
              <div>
                <p className='text-sm text-secondText pb-3'>Pay through our application and save
                  thousands and get amazing rewards
                </p>
              </div>
            </div>
          </div>
          <div className='md:flex-1 px-3 py-1 mx-2 my-2 md:my-0 shadow-mine rounded-2xl w-full'>
            <div>
              <div>
                <img src={CovidSafe} alt='CovidSafe' className='px-4 py-2 bg-primaryBg1 my-2 rounded-xl' />
                <h3 className='text-xl my-3'>Covid Safe</h3>
              </div>
              <div>
                <p className='text-sm text-secondText pb-3'>We have all the curated hotels that
                  have all the precaution for a corvid
                  safe environment
                </p>
              </div>
            </div>
          </div>
          <div className='md:flex-1 px-3 py-1 mx-2 my-2 md:my-0 shadow-mine rounded-2xl w-full'>
            <div className=''>
              <div>
                <img src={Fpayment} alt='Fpayment' className='px-4 py-5 bg-primaryBg1 my-2 rounded-xl' />
                <h3 className='text-xl my-3'>Flexible Payment</h3>
              </div>
              <div>
                <p className='text-sm text-secondText pb-3'>Enjoy the flexible payment through our
                  app and get rewards on every payment
                </p>
              </div>
            </div>
          </div>
          <div className='md:flex-1 px-3 py-1 mx-2 my-2 md:my-0 shadow-mine rounded-2xl w-full'>
            <div>
              <div>
                <img src={Nearby} alt='Nearby' className='px-4 py-2 bg-primaryBg1 my-2 rounded-xl' />
                <h3 className='text-xl my-2'>Find The Best Near You</h3>
              </div>
              <div>
                <p className='text-sm text-secondText pb-3'>Find the best hotels and places to visit
                  near you in a single click </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className='text-3xl text-center pt-4 pb-8 font-semibold'>Recommended Destination</h1>
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

      <div className='min-h-[70vh] pt-4 pb-8 px-2 md:px-0'>
        <h1 className='text-3xl text-center py-4 font-semibold'>blogs</h1>
        <div className='flex min-h-[60vh] flex-wrap md:flex-nowrap'>
          <div className="md:w-7/12 w-full py-2 md:pr-3">
            <div className='h-full relative rounded-xl overflow-hidden'>
              <div className='absolute h-full w-full bg-black/30 z-10'></div>
              <div className='text-white absolute h-full w-full flex justify-center items-center z-20'>
                <h3 className='text-2xl font-bold text-center md:w-4/12 w-9/12'>{Data.length === 0 ? "" : Data[0].Title}</h3>
              </div>
              
              <img src={Data.length === 0 ? "" : Data[0].Picture} alt="blog1" className='object-cover h-full w-full' />
            </div>
          </div>
          <div className='h-full md:w-5/12 flex flex-col w-full'>
            <div className="md:h-3/6 w-full py-2">
              <div className='h-full relative rounded-xl overflow-hidden'>
                <div className='absolute h-full w-full bg-black/30 z-10'></div>
                <div className='text-white absolute h-full w-full flex justify-center items-center z-20'>
                  <h3 className='text-2xl font-bold text-center w-8/12'>{Data.length === 0 ? "" : Data[1].Title}</h3>
                </div>
                <img src={Data.length === 0 ? "" : Data[1].Picture} alt="blog2" className='object-cover h-full w-full' />
              </div>
            </div>
            <div className="md:h-3/6 w-full py-2">
              <div className='h-full relative rounded-xl overflow-hidden'>
                <div className='absolute h-full w-full bg-black/30 z-10'></div>
                <div className='text-white absolute h-full w-full flex justify-center items-center z-20'>
                  <h3 className='text-2xl font-bold text-center w-8/12'>{Data.length === 0 ? "" : Data[2].Title}</h3>
                </div>
                <img src={Data.length === 0 ? "" : Data[2].Picture} alt="blog3" className='object-cover h-full w-full' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home