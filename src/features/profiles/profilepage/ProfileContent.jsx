/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
*/
import {
  CreditCardIcon,
  KeyIcon,
  UserCircleIcon,
  UserGroupIcon,
  ViewGridAddIcon,
} from "@heroicons/react/outline";
import { useState } from "react";
import AboutTab from "./AboutTab";
import PhotosTab from "./PhotosTab";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfileContent({ profile, isCurrentUser }) {
  const navigation = [
    {
      name: "About",
      icon: UserCircleIcon,
      render: () => (
        <AboutTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      name: "Photos",
      icon: KeyIcon,
      render: () => (
        <PhotosTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    { name: "Events", icon: CreditCardIcon },
    { name: "Followers", icon: UserGroupIcon },
    { name: "Following", icon: ViewGridAddIcon },
  ];

  const [currentPane, setCurrentPane] = useState("About");
  const renderPane = navigation.find((element) => element.name === currentPane);

  return (
    <div className='lg:grid lg:grid-cols-12 lg:gap-x-5'>
      <div className='space-y-6 sm:px-6 lg:px-0 lg:col-span-9'>
        {renderPane.render()}
      </div>
      <aside className='py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3'>
        <nav className='space-y-1'>
          {navigation.map((item) => (
            <div
              key={item.name}
              // href={item.href}
              className={classNames(
                item.name === currentPane
                  ? "bg-gray-50 text-indigo-700 hover:text-indigo-700 hover:bg-white"
                  : "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
                "group rounded-md px-3 py-2 flex items-center text-sm font-medium cursor-pointer"
              )}
              aria-current={item.name === currentPane ? "page" : undefined}
              onClick={() => setCurrentPane(item.name)}
            >
              <item.icon
                className={classNames(
                  item.name === currentPane
                    ? "text-indigo-500 group-hover:text-indigo-500"
                    : "text-gray-400 group-hover:text-gray-500",
                  "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                )}
                aria-hidden='true'
              />
              <span className='truncate'>{item.name}</span>
            </div>
          ))}
        </nav>
      </aside>
    </div>
  );
}
