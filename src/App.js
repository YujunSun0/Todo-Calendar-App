import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";

function App() {
  const [listData, setListData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // 해당하는 날짜에 대한 데이터
  const [isToggle, setIsToggle] = useState(false); //토글을 클릭하여 모달창이 열리고 닫히는 것을 결정하는 상태
  const [data, setData] = useState({}); // 메인 페이지에서 클릭한 데이터를 가져옴
  console.log(listData);

  const onChangeToggle = () => {
    setIsToggle(!isToggle);
  };

  useEffect(() => {
    // 첫 렌더링 시 리스트를 나열하기 위함 + listData가 추가, 수정, 삭제되면 다시 렌더링
    const data = JSON.parse(localStorage.getItem("todos"));
    // listData가 존재하면 JSON 문자열을 파싱하여 listData 상태로 변환한다.
    if (data) {
      setListData(data);
    }
  }, []);

  // 페이지가 로드될 때 localStorage에서 listData를 불러온다.

  const onClickBtn = (list) => {
    const todoData = {
      id: new Date().getTime(),
      text: `${list}`,
      done: false,
      month: new Date().getMonth() + 1,
      date: new Date().getDate(),
    };
    listData.push(todoData);
    localStorage.setItem("todos", JSON.stringify(listData));
  };

  const onClickCheck = (id) => {
    //체크박스를 클릭하면 데이터리스트 중 done의 값을 변경
    const filter = listData.filter((el) => el.id === id);
    const idx = listData.indexOf(filter[0]);
    filter[0].done = !filter[0].done; //done의 값만 변경
    setListData([
      ...listData.slice(0, idx),
      filter[0],
      ...listData.slice(idx + 1),
    ]);
    localStorage.setItem("todos", JSON.stringify(listData));
  };

  const selectedData = (month, date) => {
    // // 달력의 날짜를 선택하면 데이터에서 월과 일이 같은 데이터만 골라옴
    const arr = listData.filter(
      (todo) => todo.date === date && todo.month === month
    );
    console.log(month, date);
    setFilteredData([...arr]);
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              listData={listData}
              onClickCheck={onClickCheck}
              setListData={setListData}
              onChangeToggle={onChangeToggle}
              isToggle={isToggle}
              setIsToggle={setIsToggle}
              onClickBtn={onClickBtn}
              data={data}
              setData={setData}
            />
          }
        />
        <Route
          path="/calendar"
          element={<Schedule selectedData={selectedData} listData={listData} />}
        />
      </Routes>
      <Footer onChangeToggle={onChangeToggle} />
    </div>
  );
}

export default App;
