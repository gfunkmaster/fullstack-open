import React, { useState } from "react";
import Button from "../../utils /Button";
import Display from "../../utils /Display";

export const Unicafe = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;

  // Calculate average score
  const average = all === 0 ? 0 : (good - bad) / all;

  // Calculate percentage of positive feedback
  const positivePercentage = all === 0 ? 0 : (good / all) * 100;
  const postive = positivePercentage.toFixed(1);

  return (
    <>
      <h1>Unicafe</h1>

      <div>
        <div>
          <h1>Give feedback</h1>
          <Button handleClick={() => setGood(good + 1)} text="good" />
          <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
          <Button handleClick={() => setBad(bad + 1)} text="bad" />
        </div>
        <div>
          <h1>statisitcs</h1>
          <div>
            {all !== 0 ? (
              <>
                <Display text="good" value={good} />
                <Display text="neutral" value={neutral} />
                <Display text="bad" value={bad} />
                <Display text="all" value={all} />
                <Display text="average" value={average} />
                <Display text="postive feedback" value={postive} procent="%" />
              </>
            ) : (
              "no feedback was given"
            )}
          </div>
        </div>
      </div>
    </>
  );
};
