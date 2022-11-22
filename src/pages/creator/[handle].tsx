import CourseCard from "@components/CourseCard";

const T = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 lg:px-0">
      <div className="mt-4 xl:mt-6">
        <h2 className="text-3xl font-bold">Instructor 01</h2>
        <p className="text-lg">Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="flex flex-row gap-2 mt-2 text-lg">
        <p>Total Students: 2000</p>
        <p>Total Courses: 5</p>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold">About</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          fuga, est soluta ipsum earum illum natus itaque cumque expedita neque.
        </p>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold">Courses</h3>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 mt-3 md:mt-4 mx-auto">
          <li>
            {" "}
            <CourseCard />
          </li>
          <li>
            <CourseCard />
          </li>
          <li>
            <CourseCard />
          </li>
          <li>
            <CourseCard />
          </li>
          <li>
            <CourseCard />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default T;
