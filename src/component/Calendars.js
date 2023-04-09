import React, { useState } from "react";
import moment from "moment/moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

const Wrap = styled.div`
  font-family: "GmarketSansMedium1";
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .react-calendar {
    width: 400px;
    height: 500px;
    background-color: black;
    margin-top: 20px;
    border: 2px solid #677381;
    line-height: 2.21rem;
  }

  .react-calendar__tile {
    display: inline-block;
    color: white;
    /* padding: 15.5px; */
    /* border-radius: 50%; */
  }

  .react-calendar__tile--now {
    background: #393939;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #1087ff;
  }

  .react-calendar__month-view:first-child {
    height: 100%;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }

  .react-calendar__navigation > button {
    color: white;
    font-size: 18px;
  }

  .react-calendar__navigation__label > span {
    color: white;
    font-size: 17px;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: black;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }

  .react-calendar__month-view__days button {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    flex: 1 1 1 !important;
    width: 45px;
    height: 78px;
    border-top: 1px solid #677381;
    font-size: 12px;
    padding: 5px;
    overflow: hidden;
  }

  .react-calendar__month-view__days > button > abbr {
    border-radius: 50%;
    width: 16px;
    height: 16px;
    text-align: center;
    margin-bottom: 3px;
  }

  .till-ul {
    display: flex;
    flex-direction: column;
  }

  .till-li {
    width: 50px;
    height: 15px;
    /* margin-bottom: 2px */
    position: relative;
    font-size: 5px;
    overflow: hidden;
    border-radius: 2px;
    margin: 1.1px;
  }

  .till-li > div {
    animation: scroll 8s infinite linear;
    animation-delay: 2s;
    white-space: nowrap;
  }

  .till-li:nth-child(odd) {
    background-color: pink;
    color: black;
  }

  .till-li:nth-child(even) {
    background-color: #f9f871;
    color: black;
  }

  .till-li:nth-child(2n + 3) {
    background-color: #bffcf9;
    color: black;
  }

  .list-done {
    opacity: 0.7;
    text-decoration: line-through;
  }

  .list-yet {
    opacity: 1;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-150%);
    }
  }
`;

const Calendars = ({ selectedData, listData }) => {
  const [value, onChange] = useState(new Date());

  //일반적으로 onClickDay 이벤트는 날짜를 선택하면 바로 발생합니다. 그러나 Calendar 컴포넌트에서는 사용자가 빠르게 여러 날짜를 클릭할 수 있으므로, 두 번째 클릭 이벤트인 onChange 이벤트가 발생하기 전에 여러 onClickDay 이벤트가 발생할 수 있습니다.

  //따라서 첫 번째 클릭 시에는 onChange 함수가 호출되어 value 변수가 업데이트됩니다. 그 후에 두 번째 클릭 시에는 이전에 발생한 onClickDay 이벤트에 의해 업데이트된 value 변수가 사용되어 새로운 값이 출력됩니다.

  //이를 방지하기 위해서는 한 번 클릭한 경우에도 value 변수가 업데이트되어야 합니다. 그래서 onClickDay 이벤트 핸들러 내에서 onChange 함수를 호출하여 value 변수를 업데이트하고, 그 값을 selectedData 함수에 전달하도록 수정하는 것입니다. 이렇게 수정하면 한 번 클릭해도 선택한 날짜의 월과 일이 정상적으로 출력됩니다.

  const handleClickDay = (value) => {
    onChange(value);
    selectedData(value.getMonth() + 1, value.getDate());
  };

  return (
    <Wrap>
      <Calendar
        onChange={onChange}
        value={value}
        formatDay={(locale, date) => moment(date).format("D")}
        navigationLabel={null}
        next2Label={<div></div>}
        prev2Label={<div></div>}
        showNeighboringMonth={true} //  이전, 이후 달의 날짜는 보이지 않도록 설정
        // onClickDay={() => {
        //   selectedData(value.getMonth() + 1, value.getDate());
        //   console.log(value.getMonth() + 1, value.getDate());
        // }}
        //첫 번째 클릭 시에는 onChange 함수가 호출되어 value 변수가 업데이트됩니다. 두 번째 클릭 시에는 onClickDay 함수가 호출됩니다. 따라서 한 번 클릭한 경우, 첫 번째 클릭 시 value 변수가 업데이트되어 다른 값이 출력될 수 있습니다.
        onClickDay={(value) => handleClickDay(value)}
        tileContent={({ date, view }) => {
          const filtered = listData.filter(
            (x) => x.month === date.getMonth() + 1 && x.date === date.getDate()
          );
          // console.log(filtered);
          if (filtered.length !== 0) {
            return (
              <>
                <div className="flex justify-center items-center absoluteDiv">
                  <ul className="till-ul">
                    {filtered.map((el) => {
                      return (
                        <li
                          key={el.id + 1}
                          className={
                            el.done ? "list-done till-li" : "list-yet till-li"
                          }
                        >
                          {el.text.length > 6 ? (
                            <div>{el.text}</div>
                          ) : (
                            <span>{el.text}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="dot"></div>
                </div>
              </>
            );
          }
        }}
      />
    </Wrap>
  );
};

export default Calendars;
