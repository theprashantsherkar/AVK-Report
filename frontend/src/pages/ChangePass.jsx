import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

function ChangePass() {
    return (
        <>
            <Header />
            <div className='flex items-start w-full'>
                <div className='w-1/6'>
                    <Sidebar />
                </div>
                <div className='w-5/6 p-4'>
                    <div className='text-2xl font-semibold'>
                        Change Password
                    </div>
                    <hr />
                    <div className='flex justify-center'>
                        <section className='w-1/2 min-h-max border rounded-md p-3'>
                            <table className=' table table-bordered'>
                                <tr className='py-2'>
                                    <th>Old Password</th>
                                    <td>
                                        <div className='p-2'>
                                            <input type="password" class="form-control" id="exampleFormControlInput1" ></input>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='py-2'>
                                    <th>New Password</th>
                                    <td>
                                        <div className='p-2'>
                                            <input type="password" class="form-control" id="exampleFormControlInput1" ></input>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='py-2'>
                                    <th>Re-Enter New Password</th>
                                    <td>
                                        <div className='p-2'>
                                            <input type="password" class="form-control" id="exampleFormControlInput1" ></input>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <div className='flex justify-center'>
                                <button className='btn btn-primary'>Update</button>

                            </div>
                        </section>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ChangePass