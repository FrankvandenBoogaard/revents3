/* This example requires Tailwind CSS v2.0+ */
import {
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/outline";

import Calendar from 'react-calendar';

const navigation = [
  { name: "All Events", icon: HomeIcon, href: "#", current: true },
  { name: "I'm going", icon: UsersIcon, href: "#", count: 3, current: false },
  { name: "I'm hosting", icon: UsersIcon, href: "#", count: 3, current: false },
  { name: "Projects", icon: FolderIcon, href: "#", count: 4, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EventFilters() {
  return (
    <div className='flex flex-col flex-grow rounded-lg border-r border-gray-200 pt-3 bg-white overflow-y-auto'>
      <div className='flex items-center flex-shrink-0 px-4 text-lg font-medium text-gray-900'>
        Filters
      </div>
      <div className='mt-3 flex-grow flex flex-col'>
        <nav className='flex-1 px-2 bg-white space-y-1' aria-label='Sidebar'>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              )}
            >
              <item.icon
                className={classNames(
                  item.current
                    ? "text-gray-500"
                    : "text-gray-400 group-hover:text-gray-500",
                  "mr-3 flex-shrink-0 h-6 w-6"
                )}
                aria-hidden='true'
              />
              <span className='flex-1'>{item.name}</span>
              {item.count ? (
                <span
                  className={classNames(
                    item.current
                      ? "bg-white"
                      : "bg-gray-100 group-hover:bg-gray-200",
                    "ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full"
                  )}
                >
                  {item.count}
                </span>
              ) : null}
            </a>
          ))}
        </nav>
      </div>
      <div className='flex items-center flex-shrink-0 px-4 pt-3 mt-3 border-t border-gray-200 text-lg font-medium text-gray-900'>
        Calendar
      </div>
      <div className='p-4'>
      <Calendar className='bg-gray-50 rounded-lg' />
      </div>
    </div>
  );
}
