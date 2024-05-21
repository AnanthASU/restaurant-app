import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, CheckBadgeIcon} from '@heroicons/react/20/solid';
import React from 'react';
const actions = [
  { name: 'Delivery Time', id: 1},
  { name: 'Rating', id: 2},
]


export default function SortMenu({HandleSort, HandleReset}) {

  const popoverButtonRef = React.useRef(null);
  const [selectedSort, setSelectedSort] = React.useState(null);

  const handleClickApply = () => {
    if (popoverButtonRef.current) {
      popoverButtonRef.current.click();
    }
    HandleSort(selectedSort);
  };

  const handleClickReset = () => {
    if (popoverButtonRef.current) {
      popoverButtonRef.current.click();
    }
    HandleReset();
    setSelectedSort(null);
  };


  return (
    <Popover className="relative">
      <Popover.Button ref={popoverButtonRef}  className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <span>Sort</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-fit -translate-x-1/2 px-4">
          <div className="w-screen max-w-xs flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {actions.map((item) => (
                <div onClick={()=>setSelectedSort(item.id)} key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <span className="w-2">{selectedSort === item.id &&<CheckBadgeIcon className="h-5 w-5" aria-hidden="true" />}</span>
                 {item.name}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
             <button onClick={handleClickReset} className='py-2 hover:bg-gray-200'>Reset</button>
             <button onClick={handleClickApply} className='py-2 bg-black text-white'>Apply</button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
