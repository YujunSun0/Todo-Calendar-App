import Main from "../component/Main";

const Home = ({
  listData,
  setListData,
  onClickBtn,
  onClickCheck,
  onChangeToggle,
  isToggle,
  setIsToggle,
  data,
  setData,
}) => {
  return (
    <Main
      listData={listData}
      setListData={setListData}
      onClickBtn={onClickBtn}
      onClickCheck={onClickCheck}
      onChangeToggle={onChangeToggle}
      isToggle={isToggle}
      setIsToggle={setIsToggle}
      data={data}
      setData={setData}
    />
  );
};

export default Home;
