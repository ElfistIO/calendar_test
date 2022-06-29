import { useState } from "react";
import style from "./Calendar.module.scss";
import { Day } from "./Day";

export const Calendar = ({ showCurrentMonth, currentMonth, currentYear }) => {
  const [isCurrentMonth, setIsCurrentMonth] = useState(false);

  return (
    <div className={style.calendar__month}>
      {showCurrentMonth.map((date, index) => (
        <Day
          date={date}
          key={index}
          id={index}
          currentMonth={currentMonth}
          currentYear={currentYear}
        />
      ))}
    </div>
  );
};
