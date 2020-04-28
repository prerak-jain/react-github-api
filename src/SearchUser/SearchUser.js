import React, { Component, Fragment } from "react";
import { Form, Message, Grid, Responsive, Header } from "semantic-ui-react";
import ProfileCard from "../ProfileCard/ProfileCard";
import Repos from "../Repos/Repos";
import "./SearchUser.css";

class SearchUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      profileData: {},
      reposData: [],
      loading: false,
      errorMessage: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  fetchUser = (userName) => {
    Promise.all([
      fetch(`https://api.github.com/users/${userName}`),
      fetch(`https://api.github.com/users/${userName}/repos?sort=created`),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([profileData, reposData]) => {
        if (profileData.message || reposData.message) {
          this.setState({
            errorMessage: profileData.message || reposData.message,
            loading: false,
          });
        } else {
          this.setState({
            profileData: profileData,
            reposData: reposData,
            loading: false,
            errorMessage: "",
          });
        }
      })
      .catch((err) => {
        this.setState({
          errorMessage: err,
          loading: false,
        });
      });
  };

  handleSearch = (e) => {
    this.setState({ userInput: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.userInput === "") {
      if (this.state.errorMessage === "Not Found") {
        this.setState({
          errorMessage: "",
          profileData: {},
          reposData: [],
        });
      } else {
        this.setState({
          profileData: {},
          reposData: [],
        });
      }

      let toastDiv = document.getElementById("toast");
      toastDiv.classList.add("show");
      toastDiv.innerHTML = "Please provide a username!";
      setTimeout(function () {
        toastDiv.classList.remove("show");
      }, 2500);
    } else {
      document.querySelector("#user-input").blur();
      this.setState({ loading: true });
      this.fetchUser(this.state.userInput);
    }
  };

  render() {
    const {
      avatar_url,
      name,
      login,
      followers,
      following,
      public_repos,
    } = this.state.profileData;

    let reposArray = this.state.reposData.slice(0, 6).map((repoData) => ({
      repoId: repoData.id,
      repoName: repoData.name,
      repoDescription: repoData.description,
      repoLastUpdated: repoData.updated_at,
      repoStars: repoData.stargazers_count,
      repoLanguage: repoData.language,
      repoCreatedAt: repoData.created_at,
    }));

    const { length } = Object.keys(this.state.profileData);

    const errorMessage =
      this.state.errorMessage === "Not Found"
        ? "User Not Found!"
        : "API Rate Limit Exceeded! Please try again after some time.";

    const data =
      length === 0 && reposArray.length === 0 ? null : (
        <Fragment>
          <Responsive as={Grid} minWidth={990} columns={2} divided>
            <Grid.Row>
              <Grid.Column width={6}>
                <ProfileCard
                  avatarUrl={avatar_url}
                  name={name}
                  userName={login}
                  followers={followers}
                  following={following}
                  repos={public_repos}
                />
              </Grid.Column>
              <Grid.Column width={10}>
                <Grid.Row>
                  <Grid.Column>
                    {reposArray.length > 0 ? (
                      <Header as="h3" dividing>
                        Latest Repositories
                      </Header>
                    ) : (
                      <Header as="h3">
                        {name || login} has no repositories
                      </Header>
                    )}

                    <div className="repos-container">
                      <Repos repos={reposArray} />
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Responsive>
          <Responsive maxWidth={990}>
            <ProfileCard
              avatarUrl={avatar_url}
              name={name}
              userName={login}
              followers={followers}
              following={following}
              repos={public_repos}
            />
            <br />
            {reposArray.length > 0 ? (
              <Header as="h3" textAlign="center" dividing>
                Latest Repositories
              </Header>
            ) : (
              <Header as="h3" textAlign="center">
                {name || login} has no repositories
              </Header>
            )}
            <div className="repos-container">
              <Repos repos={reposArray} />
            </div>
          </Responsive>
        </Fragment>
      );

    return (
      <div>
        <div className="search">
          <div id="toast"></div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Input
                id="user-input"
                loading={this.state.loading}
                placeholder="Github Username"
                name="github user"
                value={this.state.userInput}
                onChange={this.handleSearch}
              />
              <Form.Button content="Search" />
            </Form.Group>
          </Form>
        </div>
        {this.state.errorMessage ? (
          <Message negative>
            <Message.Header>{errorMessage}</Message.Header>
          </Message>
        ) : (
          <Fragment>{data}</Fragment>
        )}
      </div>
    );
  }
}

export default SearchUser;
