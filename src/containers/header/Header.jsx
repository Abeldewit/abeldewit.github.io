// import { Fragment } from 'react'
// import { Popover, Transition } from '@headlessui/react'
// import { MenuIcon, XIcon } from '@heroicons/react/outline'
import  resume from '../../assets/Curiculum Vitae - Abel de Wit.pdf'

export default function Header() {
  return (
    <div className="flex flex-col items-center px-10 pt-2 pb-10 h-full md:pb-20 md:h-screen md:justify-around md:flex-row ">
      <div id="Title" className="flex flex-col">
        <div className="flex flex-row justify-between items-center sm:block ">
          <h1 className="text-2xl md:text-4xl font-extrabold">Abel de Wit</h1>
          <h2 className="text-xl md:text-2xl font-normal">AI Engineer</h2>
        </div>
        <p className="max-w-md w-auto md:w-10/12 text-md pt-2">
          I am following the Msc. Artificial Intelligence at Maastricht University. 
          Within this field I am mainly interested in Natural Language Processing, Computer Vision, 
          and Anomaly Detection. 
        </p>
        <div className="rounded-md shadow w-fit bg-slate-500 mt-2">
          {/* <a
            href={resume}
            className="flex w-full sm:hidden text-white py-1 px-3"
            >Download Resume</a> */}
          <a
            href={resume}
            className="hidden w-full font-extrabold md:flex text-white py-1 px-3"
            download
            >Download Resume</a>
        </div>
      </div>
      <div id="Picture" className="hidden md:flex flex-col">
        <h1 className="text-2xl font-extrabold">PICTURE</h1>
      </div>
    </div>
  )
}