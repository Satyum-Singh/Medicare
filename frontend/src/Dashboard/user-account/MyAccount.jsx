import { useContext } from 'react'
import { authContext } from './../../context/AuthContext' 
import userImg from '../../assets/images/doctor-img01.png'

const MyAccount = () => {

  const { dispatch } = useContext(authContext);
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <div className="max-w-[1170px] px-5 mx-auto">
      <div className="grid md:grid-cols-3 gap-10">
        <div className="pb-[50px] px-[30px] rounded-md ">
          <div className="flex items-center justify-center">
            <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
              <img src={userImg} alt="" className='w-full h-full rounded-full' />
            </figure>
          </div>

          <div className='text-center mt-4'>
            <h3 className="text-headingColor font-bold text-[18px] leading-[30px]">
              Ayush Katoch
            </h3>
            <p className="text-textColor leading-6 font-medium text-[15px] ">
              example@gmail.com
            </p>
            <p className="text-textColor leading-6 font-medium ">
              Blood Type:
              <span className="ml-2 text-headingColor leading-8 text-[22px] ">O-</span>
            </p>
          </div>

          <div className="mt-[50px] md:mt-[100px]">
            <button onClick={handleLogout} className="w-full p-3 leading-7 text-[16px] bg-[#181a1e] text-white rounded-md">Logout</button>
            <button className="w-full mt-4 p-3 leading-7 text-[16px] bg-red-600 text-white rounded-md">Delete Account</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MyAccount