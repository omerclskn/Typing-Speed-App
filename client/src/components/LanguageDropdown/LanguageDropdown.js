import "./LanguageDropdown.scss";

import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { setLanguage } from "../../redux/typingSlice";
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { typingStartSelector, languageSelector } from "../../redux/selectors";

const LanguageDropdown = () => {
  const dispatch = useDispatch();
  const language = useSelector(languageSelector);
  const typingStart = useSelector(typingStartSelector);

  const handleClick = (e) => {
    const languageKey = e.key === "1" ? "tr" : "en";
    dispatch(setLanguage(languageKey));
  };

  const menuItems = (
    <Menu onClick={handleClick}>
      <Menu.Item disabled={language === "tr"} key="1">
        Turkish
      </Menu.Item>
      <Menu.Item disabled={language === "en"} key="2">
        English
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      disabled={typingStart}
      className="language-dropdown"
      overlay={menuItems}
    >
      <Button>
        {language === "tr" ? "Turkish" : "English"} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default LanguageDropdown;
