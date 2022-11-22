import Image from "next/image";
import Link from "next/link";

const CourseCard = ({
  title,
  description,
  category,
  length,
  content,
  slug,
  whatTeach,
}: any) => {
  return (
    <Link href={`/course/${slug}`}>
      <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <a href="#" className="">
          <Image
            className="rounded-t-lg"
            src="/a.jpg"
            alt={slug}
            width={390}
            height={100}
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
          <div className="flex flex-row gap-2 items-center justify-end">
            <a
              href="#"
              className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Enroll
            </a>
            <a
              href="#"
              className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Collect
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
