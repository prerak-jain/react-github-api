import React, { Component } from "react";
import Header from "./Header/Header";
import SearchUser from "./SearchUser/SearchUser";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <SearchUser />
      </div>
    );
  }
}

export default App;
