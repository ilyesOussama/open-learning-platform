import Button from "@components/Button";
import CourseCard from "@components/CourseCard";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { Tab } from "@headlessui/react";
import create from "zustand";
import { LoginContext } from "../context";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { useTokenStore } from "src/store/token";
import CreatePublication from "../components/createpub";
import { useAuthStore } from "src/store/auth";

/* async function getCourses() {
  const data = await prisma.course.findMany();
  return data;
}
 */
const Home: NextPage = ({ data }: any) => {
  const token = useAuthStore((state: any) => state.handle);

  const address = useAuthStore((state: any) => state.address);
  console.log(address);

  return (
    <div>
      <Head>
        <title>Open Learning Platform</title>
        <meta
          name="description"
          content="Open source, free learning platform"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        {!token ? (
          <div className="py-12 border-b bg-hero dark:border-b-gray-700/80 bg-gradient-to-r from-transparent to-green-50 dark:from-gray-900">
            <div className="px-5 mx-auto max-w-screen-xl flex items-stretch py-8 w-full sm:py-12 sm:text-left">
              <div className="flex-1 space-y-3">
                <h1 className="text-2xl font-extrabold sm:text-4xl">
                  Open Learning Platform
                </h1>
                <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Open learning platfoem is a decentrelized, open source, user
                  owened e-learning platform.
                </p>
                <p className="text-xl font-semibold text-gray-600 dark:text-gray-400">
                  Our goal is to make quality education accessible for all
                  people, for free, and to make sure educators are payed what
                  they deserve.
                </p>
              </div>
              <div className="hidden flex-1 flex-shrink-0 w-full sm:block" />
            </div>
          </div>
        ) : (
          <CreatePublication />
        )}

        <div className="pl-4 xl:pl-8 text-2xl font-bold py-12">
          <h2>Popular courses</h2>
          <div className="py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {data.map(
              ({
                id,
                title,
                description,
                category,
                length,
                content,
                slug,
                whatTeach,
              }: any) => (
                <CourseCard
                  length={length}
                  content={content}
                  whatTeach={whatTeach}
                  slug={slug}
                  category={category}
                  key={id}
                  title={title}
                  description={description}
                />
              )
            )}
          </div>
        </div>

        <div className="pl-4 xl:pl-8 text-2xl font-bold">
          <h2>Courses by cayegory</h2>
          <div className="">
            <Tab.Group>
              <Tab.List className="flex items-center gap-4">
                <Tab className="font-medium">Web3</Tab>
                <Tab className="font-medium">Data Science</Tab>
                <Tab className="font-medium">Machine Learning</Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <div className="py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-2"></div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    No Data Science Courses yet
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    No ML Courses yet
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const courses = await prisma.course.findMany();

  return {
    props: {
      data: courses,
    },
  };
}

export default Home;
