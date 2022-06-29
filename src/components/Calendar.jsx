import { useState } from "react";
import style from "./Calendar.module.scss";
import { Day } from "./Day";

export const Calendar = ({ showCurrentMonth }) => {
  const [isInterval, setIsInterval] = useState(false);

  return (
    <div className={style.calendar__month}>
      {showCurrentMonth.map((date, index) => (
        <Day date={date} key={index} id={index} />
      ))}
    </div>
  );
};
