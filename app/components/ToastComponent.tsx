import { Toast, ToastToggle } from 'flowbite-react/components/Toast'
import React from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi'

const ToastComponent = () => {
  return (
    <div><Toast className='bg-purple-50! border! border-purple-200! text-gray-500! font-semibold mb-10 max-w-md'>
      <div className="inline-flex h-7 w-8 shrink-0 items-center justify-center rounded-lg">
        <HiOutlineInformationCircle className="h-5 w-5 bg-purple-50! border-none!" />
      </div>
      <div className="ml-3 subtext">Welcome back! All systems are operational.</div>
    </Toast></div>
  )
}

export default ToastComponent