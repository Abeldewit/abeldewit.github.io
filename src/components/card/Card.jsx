import React from 'react'

function Card(props) {
  return (
    <div className="">
        <div className="flex rounded-xl bg-white p-4 h-full">
            <div id='company_logo' className='m-3'>
                <img src={props.image} alt="company logo" className='rounded-md w-full'/>
            </div>
            <div id='company_info' className='flex flex-col'>
                <div id='header' className='flex flex-col md:flex-row items-start md:items-end'>
                    <div id='company_name' className="pr-2 font-bold md:font-extrabold md:text-lg">
                        <h2>
                            {props.company}
                        </h2>
                    </div>
                    <div id='company_position' className="pr-2 font-medium md:font-bold md:text-base">
                        <h2>
                            {props.position}
                        </h2>
                    </div>
                </div>
                <div className="text-xs sm:text-sm ">
                    <p>
                    {props.date}
                    </p>
                </div>
                <div className="text-sm sm:text-base pt-3">
                    <p className="">
                        {props.description}
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card