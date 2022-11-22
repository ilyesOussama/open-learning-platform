import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

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
    <div>
      <div className="bg-green-50 h-[50vh]">
        <div className="py-5 max-w-5xl mx-auto text-gray-900 font-semibold grid grid-rows-2 md:grid-cols-3 gap-3 md:gap-5">
          <div className="col-start-1 col-end-3">
            <h3>{course.category}</h3>
            <h2 className="text-3xl">{course.title}</h2>
            <p className="font-medium"></p>
            <div className="flex items-center gap-4 mt-4">
              <p>Rating: </p>
              <p>Created by: {course.teacher}</p>
            </div>
          </div>
          <div className="w-96- h-96 bg-slate-400 ">
            <div className="flex gap-2 ml-2 mt-2">
              <button>Watch</button>
              <button>Collect</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-5xl pt-8">
        <h3 className="text-2xl font-bold mb-2 md:mb-3">What You ll Learn</h3>
        <div className="">{course.whatTeach}</div>
      </div>
      <div className="mx-auto max-w-5xl pt-8">
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
      </div>
      <div className="mx-auto max-w-5xl pt-8">
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
