import { useState } from "react";

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
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  // Текущая дата
  const [currentDate, setCurrentDate] = useState(
    new Date(`${year}-${month + 1}-01`)
  );

  // Год
  const [currentYear] = useState(currentDate.getFullYear());

  // Текущий месяц
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());

  // День месяца
  const [currentMonthDay] = useState(currentDate.getDate());

  // День недели
  const [weekDay, setCurrentWeekDay] = useState(currentDate.getDay());

  const showCurrentMonth = getMonth();

  // Функция возвращает количество дней в указанном месяце и году.
  function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  function handlePrevMonth() {
    setCurrentMonth(currentMonth - 1);
    setCurrentDate(new Date(currentYear, currentMonth - 1));
    setCurrentWeekDay(new Date(currentYear, currentMonth - 1).getDay());
  }

  function handleNextMonth() {
    setCurrentMonth(currentMonth + 1);
    setCurrentDate(new Date(currentYear, currentMonth + 1));
    setCurrentWeekDay(new Date(currentYear, currentMonth + 1).getDay());
  }

  // Функция возвращает массив дней текущего месяца (6 недель).
  function getMonth() {
    const countDayOnMonth = [];

    // Кол-во дней в каждом месяце
    for (let i = 0; i <= 11; i++) {
      countDayOnMonth.push(daysInMonth(i, currentYear));
    }

    let result = [];

    // День месяца, понедельника текущей недели
    let countMonthDay;

    // Проверка что бы всегда начинать выстаривать текущий месяц с понедельника
    if (weekDay > 1) {
      countMonthDay = currentMonthDay - (weekDay - 1);
    } else if (weekDay === 0) {
      countMonthDay = currentMonthDay - 6;
    } else {
      countMonthDay = currentMonthDay;
    }

    console.log(countMonthDay);

    // Построение итогового массива
    for (
      let i = 0;
      i < countDayOnMonth[currentMonth] + currentMonthDay - countMonthDay;
      i++
    ) {
      // Если countMonthDay больше кол-ва дней в месяце
      // дни начинаются сначала
      if (i < currentMonthDay - countMonthDay) {
        let count = countDayOnMonth[currentMonth - 1] + countMonthDay;
        result.push(count + i);
      } else if (i > countMonthDay[currentMonth - 1] - countMonthDay) {
        result.push(countMonthDay + i);
      } else {
        result.push(countMonthDay + i);
      }
    }
    console.log(result.length);
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
            <div className="month">
              {months[currentMonth] + " " + currentYear}
            </div>
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
          <div className="calendar__month">
            {showCurrentMonth.map((date) => (
              <div className="calendar__month-day">{date}</div>
            ))}
          </div>
        </div>
        <hr className="calendar__divider" />
        <div className="calendar__current-day"></div>

        <div className="calendar__footer"></div>
      </div>
    </div>
  );
}

export default App;
