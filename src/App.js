import { useState } from "react";
import { Calendar } from "./components/Calendar";

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
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  // Текущий месяц
  let [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());

  // День месяца
  const [currentMonthDay] = useState(currentDate.getDate());

  // День недели
  const [currentWeekDay, setCurrentWeekDay] = useState(currentDate.getDay());

  // Раскладка выбранного месяца
  const showCurrentMonth = getMonth();

  // Функция возвращает количество дней в указанном месяце и году.
  function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  // Выбор предыдущего месяца
  function handlePrevMonth() {
    if (currentMonth !== 0) {
      setCurrentMonth(currentMonth - 1);
      setCurrentDate(new Date(currentYear, currentMonth - 1));
      setCurrentWeekDay(new Date(currentYear, currentMonth - 1).getDay());
      return;
    }
    setCurrentYear(currentYear - 1);
    setCurrentMonth(11);
    setCurrentDate(new Date(currentYear, currentMonth - 1));
    setCurrentWeekDay(new Date(currentYear, currentMonth - 1).getDay());
  }

  // Выбор следующего месяца
  function handleNextMonth() {
    if (currentMonth !== 11) {
      setCurrentMonth(currentMonth + 1);
      setCurrentDate(new Date(currentYear, currentMonth + 1));
      setCurrentWeekDay(new Date(currentYear, currentMonth + 1).getDay());
      return;
    }
    setCurrentYear(currentYear + 1);
    setCurrentMonth(0);
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

    let result = {};

    // День месяца, понедельника текущей недели
    let countMonthDay;

    // Проверка что бы всегда начинать выстаривать текущий месяц с понедельника
    if (currentWeekDay > 1) {
      countMonthDay = currentMonthDay - (currentWeekDay - 1);
    } else if (currentWeekDay === 0) {
      countMonthDay = currentMonthDay - 6;
    } else {
      countMonthDay = currentMonthDay;
    }

    let prevStatePrevMon = [];
    let prevStateCurMon = [];
    let prevStateNextMon = [];
    // Построение итогового массива c днями предыдущего месяца до понедельника
    for (
      let i = 0;
      i < countDayOnMonth[currentMonth] + currentMonthDay - countMonthDay;
      i++
    ) {
      if (i < currentMonthDay - countMonthDay) {
        let count =
          countDayOnMonth[(currentMonth === 0 ? 12 : currentMonth) - 1] +
          countMonthDay;
        let prevMonth = currentMonth - 1;
        prevStatePrevMon.push(count + i);
        result[prevMonth] = [...prevStatePrevMon, count + i];
      } else {
        prevStateCurMon.push(countMonthDay + i);
        result[currentMonth] = [...prevStateCurMon, countMonthDay + i];
      }
    }
    console.log(result);

    // Достройка массива днями с общим количеством недель равным 6
    let restResultLength = 42 - result[4].length - result[5].length;
    for (let i = 0; i < restResultLength; i++) {
      let nextMonth = currentMonth + 1;
      prevStateNextMon.push(i + 1);
      result[nextMonth] = [...prevStateNextMon, i + 1];
    }

    console.log(result);
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
              <div key={day} className="calendar__weekdays-day">
                {day}
              </div>
            ))}
          </div>
          <Calendar
            showCurrentMonth={showCurrentMonth}
            currentMonth={currentMonth}
            currentYear={currentYear}
          />
        </div>
        <hr className="calendar__divider" />
        <div className="calendar__current-day"></div>

        <div className="calendar__footer"></div>
      </div>
    </div>
  );
}

export default App;
