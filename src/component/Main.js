import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useEffect, useState } from "react";
import SettingModal from "./SettingModal";
import "react-week-calendar/dist/style.less";
import Modal from "./Modal";
import Table from "./Table";

const Main = ({
  listData,
  onClickBtn,
  onClickCheck,
  setListData,
  onChangeToggle,
  isToggle,
  setIsToggle,
  data,
  setData,
}) => {
  const [isMore, setIsMore] = useState(false); // 리스트의 더보기 버튼을 누르면 모달창이 열리고 닫히는 것을 관리하는 상태
  const [editing, setEditing] = useState(false); // 수정하기 버튼을 눌렀을 때  true면 settingModal 컴포넌트에 수정화면이 뜨게 하려함
  // const [data, setData] = useState({});
  const [nowDate, setNowDate] = useState([]); // 테이블에서 날짜를 클릭하면, 그 날의 month, date를 가져와서 해당 날짜의 리스트만 보여주기 위한 상태

  useEffect(() => {
    setNowDate([new Date().getMonth() + 1, new Date().getDate()]);
    // setData({});
  }, []);

  const onChangeMore = () => {
    setIsMore(!isMore);
  };

  const onSaveData = (list) => {
    setData(list);
  };

  const cleanData = () => {
    setData({});
  };

  const onChangeListData = () => {
    setEditing(!editing);
  };

  const onClickCloseBtn = () => {
    setIsMore(!isMore);
    setEditing(false);
  };

  const onChangeListVal = (inputVal) => {
    // 할 일을 수정하는 함수지만 상태변경함수를 사용해도 새로고침을 해야만 화면에 바뀐 것이 표시됨
    const idx = listData.indexOf(data);

    const newData = { ...data, text: inputVal };
    const value = [
      ...listData.slice(0, idx),
      newData,
      ...listData.slice(idx + 1),
    ];
    setListData(value);
    localStorage.setItem("todos", JSON.stringify(value));
  };

  const handleKeyDown = (e, inputVal) => {
    // 수정할 때 엔터키를 이용하기 위한 함수
    if (e.key === "Enter") {
      const idx = listData.indexOf(data);
      const newData = { ...data, text: inputVal };
      const value = [
        ...listData.slice(0, idx),
        newData,
        ...listData.slice(idx + 1),
      ];
      setListData(value);
      localStorage.setItem("todos", JSON.stringify(value));
      onChangeListData();
      onChangeMore();
    }
  };

  const onDeleteListData = () => {
    const filter = listData.filter((el) => el !== data);
    setListData(filter);
    localStorage.setItem("todos", JSON.stringify(filter));
  };

  return (
    <div className="main">
      <Table setNowDate={setNowDate} listData={listData} />
      <ul className="main-content">
        {listData.length === 0 ||
        listData.filter(
          (el) => el.month === nowDate[0] && el.date === nowDate[1]
        ).length === 0 ? (
          <div>일정이 없습니다</div>
        ) : (
          listData
            .filter((el) => {
              return el.month === nowDate[0] && el.date === nowDate[1];
            })
            .map((list) => {
              return (
                <li
                  key={list.id}
                  onClick={() => {
                    onChangeMore();
                    onSaveData(list);
                  }}
                >
                  <header className="main-content-header">
                    <div
                      className="checkbox"
                      onClick={(e) => {
                        e.stopPropagation();
                        onClickCheck(list.id);
                      }}
                    >
                      {list.done ? (
                        <CheckBoxIcon />
                      ) : (
                        <CheckBoxOutlineBlankIcon />
                      )}
                    </div>
                    <p>{list.text}</p>
                    <span>{`${list.month}월 ${list.date}일`}</span>
                    <div className="more">
                      <MoreHorizIcon />
                    </div>
                  </header>
                  {isMore && (
                    <SettingModal
                      onChangeMore={onChangeMore}
                      data={data}
                      cleanData={cleanData}
                      onChangeListData={onChangeListData}
                      editing={editing}
                      onClickCloseBtn={onClickCloseBtn}
                      onChangeListVal={onChangeListVal}
                      handleKeyDown={handleKeyDown}
                      onDeleteListData={onDeleteListData}
                      listData={listData}
                      setListData={setListData}
                    />
                  )}
                </li>
              );
            })
        )}
      </ul>
      {isToggle && (
        <Modal
          onChangeToggle={onChangeToggle}
          setIsToggle={setIsToggle}
          onClickBtn={onClickBtn}
          isToggle={isToggle}
        />
      )}
    </div>
  );
};

export default Main;
