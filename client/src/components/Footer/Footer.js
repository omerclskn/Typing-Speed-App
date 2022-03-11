import "./Footer.scss";
import React from "react";

const Footer = () => (
  <footer className="info">
    <p>
      Created by{" "}
      <a rel="noreferrer" target="_blank" href="https://github.com/omerclskn">
        Omer Caliskan
      </a>
    </p>
  </footer>
);

export default React.memo(Footer);
