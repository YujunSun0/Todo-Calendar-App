import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect, useRef, useState } from "react";
import { faPersonWalkingDashedLineArrowRight } from "@fortawesome/free-solid-svg-icons";

const SettingModal = ({
  onChangeMore,
  data,
  cleanData,
  onChangeListData,
  editing,
  onClickCloseBtn,
  onChangeListVal,
  handleKeyDown,
  onDeleteListData,
  listData,
  setListData,
}) => {
  const [inputVal, setInputVal] = useState("");
  const input = useRef(null);

  useEffect(() => {
    // 수정하기 버튼을 누르면 editing이 트루가 되면서 수정하는 모달창이 나오는데, 그 때 인풋창에 포커스를 주기위함
    if (editing) {
      input.current.focus();
    }
  }, [editing]);

  const onChangeVal = (e) => {
    //인풋창의 값이 변경될 때, 상태에 바로바로 저장
    setInputVal(e.target.value);
  };

  const onChangeListDay = () => {
    const newObj = { ...data };
    newObj.date += 1;
    console.log(newObj);
    const idx = listData.indexOf(data);
    console.log(idx);
    let arr = [...listData.slice(0, idx), newObj, ...listData.slice(idx + 1)];
    console.log(arr);
    setListData(arr);
    localStorage.setItem("todos", JSON.stringify(arr));
    onChangeMore();
  };

  return (
    <div
      className="modal2-container"
      onClick={() => {
        onChangeMore();
        onClickCloseBtn();
        cleanData();
      }}
    >
      {editing ? (
        <div
          className="modal2 slide-up"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <header className="modal2-input">
            <input
              defaultValue={data.text}
              onChange={onChangeVal}
              required
              ref={input}
              onKeyDown={(e) => handleKeyDown(e, inputVal)}
            ></input>
            <button
              onClick={() => {
                onClickCloseBtn();
                cleanData();
              }}
            >
              X
            </button>
          </header>
          <div className="modal2-button">
            <div
              className="modal2-button-left"
              onClick={() => {
                onChangeListVal(inputVal);
                onChangeListData();
                onChangeMore();
              }}
            >
              <CheckIcon />
              <p>수정하기</p>
            </div>
            <div className="modal2-button-right" onClick={onChangeListData}>
              <KeyboardReturnIcon />
              <p>돌아가기</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal2 slide-up" onClick={(e) => e.stopPropagation()}>
          <header>
            <h2>{data.text}</h2>
            <button
              onClick={() => {
                onChangeMore();
                cleanData();
              }}
            >
              X
            </button>
          </header>
          <div className="modal2-button">
            <div
              className="modal2-button-left"
              onClick={() => {
                onChangeListData();
              }}
            >
              <BorderColorIcon />
              <p>수정하기</p>
            </div>
            <div
              className="modal2-button-right"
              onClick={() => {
                onDeleteListData();
                onChangeMore();
              }}
            >
              <DeleteForeverIcon />
              <p>삭제하기</p>
            </div>
          </div>
          <div className="modal2-list">
            <div className="modal2-list-div" onClick={onChangeListDay}>
              <ArrowCircleRightIcon />
              <p>내일 하기</p>
            </div>
            <div className="modal2-list-div">
              <EventRepeatIcon />
              <p>날짜 변경하기</p>
            </div>
            <div className="modal2-list-div">
              <DriveFileMoveIcon />
              <p>보관함으로 이동</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingModal;
