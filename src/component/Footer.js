import AddCircleIcon from "@mui/icons-material/AddCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ToggleBtn = styled.div`
  position: relative;
  bottom: 15px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: white;
  color: #262626;

  svg {
    position: relative;
    font-size: 50px;
    cursor: pointer;
    bottom: 10px;
    right: 8px;
  }
`;

const Footer = ({ onChangeToggle }) => {
  return (
    <footer className="main-footer">
      <ul className="footer-content">
        <li>
          <Link to="/Todo-Calendar-App">
            <HomeIcon />
            <p>메인</p>
          </Link>
        </li>
        <li>
          <Link to="/Todo-Calendar-App/calendar">
            <CalendarMonthIcon />
            <p>캘린더</p>
          </Link>
        </li>
        <ToggleBtn onClick={onChangeToggle}>
          <AddCircleIcon />
        </ToggleBtn>
        <li>
          <Link to="/">
            <AccessAlarmIcon />
            <p>알림</p>
          </Link>
        </li>
        <li>
          <Link to="/">
            <SettingsIcon />
            <p>설정</p>
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
