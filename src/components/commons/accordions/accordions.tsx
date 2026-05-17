'use client';

import { useState } from 'react';


export type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
}




export const Accordions = ({ items }: { items: AccordionItem[] }) => {
  const [openIds, setOpenIds] = useState<string[]>(['cancel']);

  const toggleItem = (itemId: string) => {
    setOpenIds((current) =>
      current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId],
    );
  };

  return (
    <div className='w-full rounded-xl border border-gray-200 bg-white mt-6'>
      {items.map((item, index) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={index === 0 ? '' : 'border-t border-gray-100 '}
          >
            <button
              type='button'
              onClick={() => toggleItem(item.id)}
              className='flex w-full items-center justify-between gap-4 px-5 py-4 text-left'
            >
              <span className='text-2xl font-medium text-gray-900'>{item.title}</span>
              <span
                className={`text-xs text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''
                  }`}
              >
                ▼
              </span>
            </button>

            {isOpen ? (
              <div className='px-5 pb-4 text-sm leading-6 text-gray-600'>
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};