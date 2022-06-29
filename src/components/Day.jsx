import { useState } from "react";
import style from "./Day.module.scss";

export const Day = ({ date, id, currentMonth, currentYear }) => {
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    console.log(date, currentMonth + 1, currentYear);
    isActive ? setIsActive(false) : setIsActive(true);
  }
  return (
    <div
      className={
        isActive ? style.calendar__month_day_active : style.calendar__month_day
      }
      onClick={() => handleClick(id)}
    >
      {date}
    </div>
  );
};
