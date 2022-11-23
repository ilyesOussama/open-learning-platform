import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import ReactPlayer from "react-player";
import Link from "next/link";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type coursProps = {
  title: string;
  category: string;
  description: string;
  rating?: number;
  content?: string[];
  detailedContent?: string[];
  requirements?: string[];
  teacher: string;
};

const Course = ({ course }: any) => {
  console.log(course);
  return (
    <div className="pb-20">
      <div className="bg-green-50">
        <div className="py-5 max-w-5xl mx-auto text-gray-900 font-semibold">
          <div className="col-start-1 col-end-3">
            <h3>Category: {course.category}</h3>
            <h2 className="text-3xl">{course.title}</h2>
            <p className="font-medium">{course.description}</p>
            <div className="flex items-center gap-4 mt-4">
              <p>Rating: </p>
              <p>Created by: {course.teacher}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold mb-2 md:mb-3">
                What You ll Learn
              </h3>
              <div className="">{course.whatTeach}</div>
            </div>
          </div>
          <Link
            href="#watch"
            className="mt-4 max-w-20 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Watch
          </Link>
        </div>
      </div>

      {/* <div className="mx-auto max-w-5xl pt-8">
        <h3 className="text-2xl font-bold mb-2">Course Content</h3>
        <p>{course.length}</p>
        <div className="flex flex-col items-start">
          <Disclosure>
            <Disclosure.Button className="py-2 flex flex-row items-center gap-4">
              <div className="inline-block">Section 01</div>
              <ChevronDownIcon className="h-4 w-4" />
            </Disclosure.Button>
            <Disclosure.Panel className="text-gray-500">
              Yes! You can purchase a license that you can share with your
              entire team.
            </Disclosure.Panel>
          </Disclosure>
          <Disclosure>
            <Disclosure.Button className="py-2 flex flex-row items-center gap-4">
              <div className="inline-block">Section 02</div>
              <ChevronDownIcon className="h-4 w-4" />
            </Disclosure.Button>
            <Disclosure.Panel className="text-gray-500">
              Yes! You can purchase a license that you can share with your
              entire team.
            </Disclosure.Panel>
          </Disclosure>
          <Disclosure>
            <Disclosure.Button className="py-2 flex flex-row items-center gap-4">
              <div className="inline-block">Section 03</div>
              <ChevronDownIcon className="h-4 w-4" />
            </Disclosure.Button>
            <Disclosure.Panel className="text-gray-500">
              Yes! You can purchase a license that you can share with your
              entire team.
            </Disclosure.Panel>
          </Disclosure>
        </div> 
      </div> */}
      {/*  <div className="mx-auto max-w-5xl pt-8">
        <h3 className="text-2xl font-bold mb-2">Requirements</h3>
        <ul>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
          <li>Lorem ipsum dolor sit amet.</li>
        </ul>
      </div>
      <div className="mx-auto max-w-5xl pt-8">
        <h3 className="text-2xl font-bold mb-2">Description</h3>
        <p>{course.description}</p>
      </div> */}
      <div
        className="items-center justify-center flex flex-col gap-4 mt-3 md:mt-4 xl:mt-10"
        id="watch"
      >
        <ReactPlayer url={course.videoUrl} />
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Collect
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { slug } = context.query;

  const course = await prisma.course.findFirst({
    where: {
      slug: slug,
    },
  });

  return {
    props: {
      course,
    },
  };
}

export default Course;
