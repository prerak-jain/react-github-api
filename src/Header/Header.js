import React, { Fragment } from "react";
import { Icon } from "semantic-ui-react";
import "./Header.css";

function Header() {
  return (
    <Fragment>
      <div className="page-header">
        <h3>Github Finder!</h3>
      </div>
      <a
        href="https://github.com/prerak-jain/react-github-api"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="repo-link">
          <Icon name="github" size="large" />
          &nbsp;Github Repo&nbsp;
          <Icon name="angle double right" size="small" />
        </div>
      </a>
    </Fragment>
  );
}

export default Header;
