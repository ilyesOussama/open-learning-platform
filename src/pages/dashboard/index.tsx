import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

const navigation = [
  { name: "Dashboard", icon: HomeIcon, href: "#", current: true },
  {
    name: "Create Course",
    icon: UsersIcon,
    href: "#",
    count: 3,
    current: false,
  },
  { name: "Courses", icon: FolderIcon, href: "#", count: 4, current: false },
  { name: "Stats", icon: CalendarIcon, href: "#", current: false },
  { name: "Documents", icon: InboxIcon, href: "#", count: 12, current: false },
  { name: "Reports", icon: ChartBarIcon, href: "#", current: false },
];

const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-12 h-[95vh]">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 dark:border-0 bg-white dark:bg-gray-800 dark:text-gray-50 col-start-1 col-end-3">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav
              className="mt-5 flex-1 px-2 bg-white space-y-1 dark:bg-gray-800 dark:text-white"
              aria-label="Sidebar"
            >
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    item.current
                      ? "bg-gray-100 text-gray-900 hover:text-gray-900 hover:bg-gray-100  dark:hover:bg-gray-700 dark:text-gray-50 dark:bg-gray-800"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray- dark:hover:bg-gray-700 dark:text-gray-100",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className={clsx(
                      item.current
                        ? "text-gray-500 dark:text-gray-200"
                        : "text-gray-400 group-hover:text-gray-500 dark:text-gray-100 dark:group-hover:text-gray-50",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  <span className="flex-1">{item.name}</span>
                  {item.count ? (
                    <span
                      className={clsx(
                        item.current
                          ? "bg-white dark:bg-gray-800"
                          : "bg-gray-100 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 dark:bg-gray-700",
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
          <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-0 p-4">
            <a href="#" className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium dark:text-gray-50 text-gray-700 group-hover:text-gray-900 dark:group-hover:text-white">
                    Tom Cook
                  </p>
                  <p className="text-xs font-medium dark:text-gray-50 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-white">
                    View profile
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="w-full col-start-3 col-end-13">
          <form action="">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start py-4 sm:pt-5 p-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-gray-100"
              >
                Title
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="given-name"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:border-gray-700 sm:pt-5 p-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-gray-100 "
              >
                Description
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2 py-4">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className=" dark:text-gray-100 dark:bg-gray-800 dark:border-gray-700 max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={""}
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-200">
                  Describe What you will teach in this course
                </p>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t dark:border-gray-700 sm:border-gray-200 sm:pt-5 p-4">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-gray-100"
              >
                Cover photo
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed dark:border-gray-600 rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="cover-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                      >
                        <span className="">Upload a file</span>
                        <input
                          id="cover-upload"
                          name="cover-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1 dark:text-gray-100">
                        or drag and drop
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-100">
                      PNG, JPG, GIF
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t dark:border-gray-700 sm:border-gray-200 sm:pt-5 p-4">
              <label
                htmlFor="course-files"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-gray-100"
              >
                Course Material
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed dark:border-gray-600 rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                      >
                        <span className="">Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1 dark:text-gray-100">
                        or drag and drop
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
