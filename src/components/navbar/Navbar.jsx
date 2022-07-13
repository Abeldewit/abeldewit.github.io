import React from 'react'

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Experience', href: '#' },
  { name: 'Education', href: '#' },
  { name: 'Projects', href: '#' },
]


function Navbar() {
  return (
    <div className="flex items-center justify-between py-5">
      <div className="pl-5">
        <h1 className="text-xl font-extrabold">ABEL</h1>
      </div>
      <div className="hidden sm:flex items-center">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="px-4 font-medium text-base"
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  )
}

export default Navbar