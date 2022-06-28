import { useState } from "react";
import styled, { css } from "styled-components";

const Monthdays = styled.div`
  margin: 7px 0;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  justify-self: center;
`;
const MonthdaysDays = styled.div`
  height: 32px;
  width: 32px;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  justify-self: center;

  ${(props) =>
    props.currentDay === props.date
      ? css`
          background: crimson;
          color: white;
          border-radius: 50%;
        `
      : ""}
`;

function App() {
  const weekdays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
  const months = [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июль",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ];
  // Текущая дата
  const [currentDate, setCurrentDate] = useState(new Date());

  // Текущий месяц
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());

  // День месяца
  const monthDay = currentDate.getDate();

  // Год
  const year = currentDate.getFullYear();

  // День недели
  const weekDay = currentDate.getDay();

  const showCurrentMonth = getMonth();

  // Функция возвращает количество дней в указанном месяце и году.
  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  function handlePrevMonth() {
    setCurrentDate(new Date(year, currentMonth - 1));
    setCurrentMonth(currentMonth - 1);
  }

  function handleNextMonth() {
    setCurrentDate(new Date(year, currentMonth + 1));
    setCurrentMonth(currentMonth + 1);
  }

  // Функция возвращает массив дней текущего месяца (6 недель).
  function getMonth() {
    const countDayOnMonth = [];

    // Кол-во дней в каждом месяце
    for (let i = 1; i <= 12; i++) {
      countDayOnMonth.push(daysInMonth(i, year));
    }

    let result = [];

    // День месяца, понедельника текущей недели
    let countMonthDay;

    // Проверка что бы всегда начинать выстаривать текущий месяц с понедельника
    if (weekDay > 1) {
      countMonthDay = monthDay - (weekDay - 1);
    } else if (weekDay === 0) {
      countMonthDay = monthDay - 6;
    } else {
      countMonthDay = monthDay;
    }

    // Построение итогового массива
    for (let i = 0; i < countDayOnMonth[currentMonth] + 7 - weekDay; i++) {
      // Если countMonthDay больше кол-ва дней в месяце
      // дни начинаются сначала
      if (countMonthDay + i > countDayOnMonth[currentMonth]) {
        let count = countDayOnMonth[currentMonth] - (countMonthDay + 6);
        result.push(count + i);
      } else {
        result.push(countMonthDay + i);
      }
    }
    // for (let i = 0; i < 42 - result.length + 8 - weekDay; i++) {
    //   result.push(i + 1);
    // }
    return result;
  }

  return (
    <div className="wrapper">
      <div className="calendar">
        <div className="calendar__header">
          <div className="calendar__title">Calendar</div>
          <button type="button" className="btn-flat btn-large transparent">
            <i className="material-icons large colorRed">add</i>
          </button>
        </div>
        <hr className="calendar__divider" />
        <div className="calendar__picker">
          <div className="calendar__picker-month">
            <button
              type="button"
              className="btn-flat transparent"
              onClick={handlePrevMonth}
            >
              <i className="large material-icons">chevron_left</i>
            </button>
            <div className="month">{months[currentMonth] + " " + year}</div>
            <button
              type="button"
              className="btn-flat transparent"
              onClick={handleNextMonth}
            >
              <i className="large material-icons">chevron_right</i>
            </button>
          </div>
          <hr className="calendar__divider" />
          <div className="calendar__weekdays">
            {weekdays.map((day) => (
              <div className="calendar__weekdays-day">{day}</div>
            ))}
          </div>
          <Monthdays currentDay={monthDay}>
            {showCurrentMonth.map((date) => (
              <MonthdaysDays currentDay={monthDay} date={date}>
                {date}
              </MonthdaysDays>
            ))}
          </Monthdays>
        </div>
        <hr className="calendar__divider" />
        <div className="calendar__current-day"></div>

        <div className="calendar__footer"></div>
      </div>
    </div>
  );
}

export default App;
