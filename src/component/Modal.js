import { useEffect, useRef, useState } from "react";

const Modal = ({ onChangeToggle, setIsToggle, onClickBtn, isToggle }) => {
  const [inputVal, setInputVal] = useState("");
  const inputEl = useRef(null);

  useEffect(() => {
    if (isToggle) {
      inputEl.current.focus();
    }
  }, [isToggle]);

  const onChangeInput = (e) => {
    setInputVal(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClickBtn();
    }
  };

  const handleClickBtn = () => {
    //리스트를 추가하는 함수
    onClickBtn(inputVal);
    setIsToggle(false);
  };

  return (
    <div className="modal-container" onClick={onChangeToggle}>
      <div className="modal slide-up" onClick={(e) => e.stopPropagation()}>
        <header>
          <h2>할 일을 입력하세요!</h2>
          <button onClick={onChangeToggle}>X</button>
        </header>
        <div>
          <input
            className="modal-input"
            value={inputVal}
            onChange={onChangeInput}
            onKeyDown={handleKeyDown}
            ref={inputEl}
            required
          ></input>
          <button onClick={inputVal.length !== 0 ? handleClickBtn : null}>
            입력
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
