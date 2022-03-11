import "./Home.scss";

import React, { useEffect, useState } from "react";
import { Input, Button } from "antd";
import {
  getWordsAsync,
  checkWord,
  incrementTotalKeystrokes,
  setTypingStart,
  reload,
} from "../../redux/typingSlice";
import {
  allWordsSelector,
  selectedWordSelector,
  statusSelector,
  typingStartSelector,
  languageSelector,
} from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import useKeyPress from "../../hooks/useKeyPress";
import classNames from "classnames";
import useCountDown from "react-countdown-hook";
import { ReloadOutlined } from "@ant-design/icons";
import { LanguageDropdown, ResultCard } from "../../components";

const Home = () => {
  const dispatch = useDispatch();
  const allWords = useSelector(allWordsSelector);
  const selectedWord = useSelector(selectedWordSelector);
  const status = useSelector(statusSelector);
  const language = useSelector(languageSelector);
  const typingStart = useSelector(typingStartSelector);

  const [timeLeft, { start, reset }] = useCountDown();

  const [input, setInput] = useState("");

  const isSelectedWord = ({ value }) => value === selectedWord;

  const isTimeOver = () => timeLeft === 0 && typingStart;

  const handleChange = (value) => {
    setInput(value);
    value !== input && dispatch(incrementTotalKeystrokes());
  };

  const handleReload = () => {
    dispatch(reload());
    setInput("");
    reset();
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(getWordsAsync(language));
      setInput("");
    }
  }, [dispatch, status, language]);

  useEffect(() => {
    if (input && !typingStart) {
      dispatch(setTypingStart(true)) && start();
    }
  }, [input, typingStart]); // eslint-disable-line

  useKeyPress(() => {
    if (input.length > 0) {
      dispatch(checkWord(input));
      setInput("");
    }
  }, input);

  return (
    <div className="home-wrapper">
      <LanguageDropdown />
      <div className="word-list-wrapper">
        <div className="word-list">
          {allWords.map((word, key) => (
            <span
              className={classNames({
                highlight: isSelectedWord(word),
                "error-box":
                  input &&
                  isSelectedWord(word) &&
                  !selectedWord.includes(input),
                error: word.correctness === "false",
                correct: word.correctness === "true",
              })}
              key={key}
            >
              {word.value}
            </span>
          ))}
        </div>
      </div>
      <div className="input-wrapper">
        <Input
          disabled={isTimeOver()}
          size="large"
          onChange={(e) => handleChange(e.target.value.trim())}
          placeholder="Type here"
          value={input}
        />
        <div
          className={classNames("timer", {
            "time-up": isTimeOver(),
          })}
        >
          <span>Time Left: {typingStart ? timeLeft / 1000 : 60}</span>
        </div>
        <Button
          className="reload-button"
          loading={status === "pending"}
          type="primary"
          size="large"
          icon={<ReloadOutlined />}
          onClick={handleReload}
        >
          Reload
        </Button>
      </div>
      {isTimeOver() && <ResultCard />}
    </div>
  );
};

export default Home;
