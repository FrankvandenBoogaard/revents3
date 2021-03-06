/* This example requires Tailwind CSS v2.0+ */
import { HomeIcon, UsersIcon } from "@heroicons/react/outline";

import Calendar from "react-calendar";
import { useSelector } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EventFilters({ predicate, setPredicate, loading }) {
  const { authenticated } = useSelector((state) => state.auth);
  const navigation = [
    {
      name: "All Events",
      active: "all",
      icon: HomeIcon,
      href: "#",
    },
    {
      name: "I'm going",
      active: "isGoing",
      icon: UsersIcon,
      href: "#",
      count: 3,
    },
    {
      name: "I'm hosting",
      active: "isHost",
      icon: UsersIcon,
      href: "#",
      count: 3,
    },
  ];

  function itemCurrent(item) {
    return predicate.get("filter") === item.active;
  }

  return (
    <div className='flex flex-col flex-grow rounded-lg border-r border-gray-200 pt-3 bg-white overflow-y-auto'>
      <div className='flex items-center flex-shrink-0 px-4 text-lg font-medium text-gray-900'>
        Filters
      </div>
      {authenticated &&
      <div className='mt-3 flex-grow flex flex-col'>
        <nav className='flex-1 px-2 bg-white space-y-1' aria-label='Sidebar'>
          {navigation.map((item) => (
            <a
              key={item.name}
              disabled={loading}
              onClick={() => setPredicate("filter", item.active)}
              href={item.href}
              className={classNames(
                itemCurrent(item)
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              )}
            >
              <item.icon
                className={classNames(
                  itemCurrent(item)
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
                    itemCurrent(item)
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
      </div>}
      <div className='flex items-center flex-shrink-0 px-4 pt-3 mt-3 border-t border-gray-200 text-lg font-medium text-gray-900'>
        Calendar
      </div>
      <div className='p-4'>
        <Calendar
          onChange={(date) => setPredicate("startDate", date)}
          value={predicate.get("startDate") || new Date()}
          tileDisabled={() => loading}
          className='bg-gray-50 rounded-lg'
        />
      </div>
    </div>
  );
}
