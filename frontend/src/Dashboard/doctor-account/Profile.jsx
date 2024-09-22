import { useState } from 'react';

const Profile = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phonr: '',
        bio:'',
        gender:''
    })

    const handleInputChange = e => {

    }

    return (
        <div>
            <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
                Profile Information
            </h2>

            <form action="">
                <div className="mb-5">
                    <p className="form__label">Name*</p>
                    <input type="text" name='name' value={formData.name} onChange={handleInputChange}
                        placeholder='Full Name' className='form__input'
                    />
                </div>
                <div className="mb-5">
                    <p className="form__label">Email*</p>
                    <input type="email" name='email' value={formData.email} onChange={handleInputChange}
                        placeholder='Email' className='form__input'
                        readOnly aria-readonly disabled='true'
                    />
                </div>
                <div className="mb-5">
                    <p className="form__label">Phone*</p>
                    <input type="number" name='phone' value={formData.phone} onChange={handleInputChange}
                        placeholder='Phone number' className='form__input'
                    />
                </div>
                <div className="mb-5">
                    <p className="form__label">Bio*</p>
                    <input type="text" name='bio' value={formData.bio} onChange={handleInputChange}
                        placeholder='Bio' className='form__input'
                        maxLength={100}
                    />
                </div>

                <div className="mb-5">
                    <div className="grid grid-cols-3 gap-5 mb-[30px]">
                        <div>
                            <p className="form__label">Gender*</p>
                            <select name="gender" value={formData.gender} onChange={handleInputChange} clas ></select>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Profile