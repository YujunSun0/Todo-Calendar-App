import React, { useState } from "react";
import moment from "moment";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import "../Table.css";

function Calendar({ setNowDate, listData }) {
  const [currentDate, setCurrentDate] = useState(moment());

  const onChangeNowDate = (month, date) => {
    setNowDate([+month, +date]);
  };

  function handlePreviousWeek() {
    setCurrentDate(currentDate.clone().subtract(1, "week"));
  }

  function handleNextWeek() {
    setCurrentDate(currentDate.clone().add(1, "week"));
  }

  const startOfWeek = currentDate.clone().startOf("week");
  const endOfWeek = currentDate.clone().endOf("week");
  const weekRange =
    startOfWeek.format("M월 D일") + " - " + endOfWeek.format("M월 D일");

  return (
    <div className="main-calendar">
      <div className="main-calendar-header">
        <h2>{weekRange}</h2>
        <div>
          <button onClick={handlePreviousWeek}>
            <KeyboardArrowLeftIcon />
          </button>
          <button onClick={handleNextWeek}>
            <KeyboardArrowRightIcon />
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {Array(7)
              .fill()
              .map((_, index) => {
                const date = startOfWeek.clone().add(index, "day");
                return (
                  <div
                    className="check"
                    onClick={() =>
                      onChangeNowDate(date.format("M"), date.format("D"))
                    }
                  >
                    <CheckBoxOutlineBlankIcon />
                    <span className="count">
                      {
                        listData.filter((el) => {
                          return (
                            el.month === +date.format("M") &&
                            el.date === +date.format("D")
                          );
                        }).length
                      }
                    </span>
                    <td key={index}>{date.format("D")}</td>
                  </div>
                );
              })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;
