import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Courses = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

//   const totalExercises = courses.reduce(
//     (sum, course) =>
//       sum + course.parts.reduce((partSum, part) => partSum + part.exercises, 0),
//     0
//   );
  return (
    <>
      <h1>Courses</h1>
      <div>
        {courses.map((course) => (
          <div key={course.id}>
            <Header key={course.id} name={course.name} />
            {course.parts.map((part) => (
              <Content
                key={part.id}
                name={part.name}
                exercises={part.exercises}
              />
            ))}
            <Total
              key={course.id}
              exercises={course.parts.reduce(
                (sum, part) => sum + part.exercises,
                0
              )}
            />
          </div>
        ))}
   
      </div>
    </>
  );
};

export default Courses;
