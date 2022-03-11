import "./ResultCard.scss";

import React from "react";
import { useSelector } from "react-redux";
import {
  successWordNumberSelector,
  wrongWordNumberSelector,
  totalKeystrokesSelector,
  languageSelector,
} from "../../redux/selectors";
import { Card, Divider } from "antd";

const ResultCard = () => {
  const successWordNumber = useSelector(successWordNumberSelector);
  const wrongWordNumber = useSelector(wrongWordNumberSelector);
  const totalKeystrokes = useSelector(totalKeystrokesSelector);
  const language = useSelector(languageSelector);

  return (
    <div className="result-card-wrapper">
      <Card
        title="Results"
        extra={language === "tr" ? "Turkish" : "English"}
        style={{ width: 300 }}
      >
        <div className="success-word-title">
          {successWordNumber} Success/Min
        </div>
        <Divider />
        <div>
          <b>Success Words:</b> {successWordNumber}
        </div>
        <Divider />
        <div>
          <b>Wrong Words:</b> {wrongWordNumber}
        </div>
        <Divider />
        <div>
          <b>Total Keystrokes: </b>
          {totalKeystrokes}
        </div>
        <Divider />
        <div>
          <b> Correctness: </b>
          {(
            (successWordNumber / (successWordNumber + wrongWordNumber)) *
            100
          ).toFixed(2)}
          %
        </div>
      </Card>
    </div>
  );
};

export default ResultCard;
