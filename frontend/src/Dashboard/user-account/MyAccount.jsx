import { useContext, useState } from 'react'
import { authContext } from './../../context/AuthContext'
import MyBookings from './MyBookings'
import Profile from './Profile'

import useGetProfile from '../../hooks/useFetchData'
import { BASE_URL } from '../../config';
import Loading from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'

const MyAccount = () => {

  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState('bookings')
  const { data: userData, loading, error, } = useGetProfile(`${BASE_URL}/users/profile/me`)

  console.log(userData);


  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">

        {loading && !error && <Loading />}

        {error && !loading && <Error errMessage={error} />}

        {
          !loading && !error && (
            <div className="grid md:grid-cols-3 gap-10">
              <div className="pb-[50px] px-[30px] rounded-md ">
                <div className="flex items-center justify-center">
                  <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
                    <img src={userData.photo} alt="" className='w-full h-full rounded-full' />
                  </figure>
                </div>

                <div className='text-center mt-4'>
                  <h3 className="text-headingColor font-bold text-[18px] leading-[30px]">
                    {userData.name}
                  </h3>
                  <p className="text-textColor leading-6 font-medium text-[15px] ">
                    {userData.email}
                  </p>
                  <p className="text-textColor leading-6 font-medium ">
                    <span className="ml-2 text-headingColor leading-8 text-[22px] ">{userData.bloodType}</span>
                  </p>
                </div>

                <div className="mt-[50px] md:mt-[100px]">
                  <button onClick={handleLogout} className="w-full p-3 leading-7 text-[16px] bg-[#181a1e] text-white rounded-md">Logout</button>
                  <button className="w-full mt-4 p-3 leading-7 text-[16px] bg-red-600 text-white rounded-md">Delete Account</button>
                </div>

              </div>

              <div className="md:col-span-2 md:px-[30px]">
                <div>
                  <button onClick={() => setTab('bookings')} className={` ${tab === 'bookings' && "bg-primaryColor text-white font-normal"} p-2 mr-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
                    My Bookings
                  </button>
                  <button onClick={() => setTab('settings')} className={` ${tab === 'settings' && "bg-primaryColor text-white font-normal"} p-2 mr-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
                    Profile Settings
                  </button>
                </div>

                {tab === 'bookings' && <MyBookings />}
                {tab === 'settings' && <Profile user={userData} />}

              </div>
            </div>
          )
        }
      </div>
    </section>
  )
}

export default MyAccount