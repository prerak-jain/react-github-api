import React, { Fragment } from "react";
import { Card, Grid, Icon, Header } from "semantic-ui-react";

const Repos = (props) => {
  let renderRepos = props.repos.map((repo) => {
    return (
      <Card key={props.repoId}>
        <Card.Content>
          <Header as="h4">{repo.repoName}</Header>

          <Grid columns={16}>
            <Grid.Column width={8}>
              <Card.Meta>
                <small>Created: {repo.repoCreatedAt.slice(0, 10)}</small>
              </Card.Meta>
            </Grid.Column>
            <Grid.Column width={8}>
              <Card.Meta>
                <small>Updated: {repo.repoLastUpdated.slice(0, 10)}</small>
              </Card.Meta>
            </Grid.Column>
          </Grid>
          {repo.repoDescription !== null ? (
            <Card.Description>{repo.repoDescription}</Card.Description>
          ) : (
            <Card.Description>(No Description)</Card.Description>
          )}
        </Card.Content>
        <Card.Content extra>
          <Grid columns={2}>
            <Grid.Column>
              <Card.Description textAlign="center">
                <Icon disabled color="black" name="star" />
                {repo.repoStars}
              </Card.Description>
            </Grid.Column>
            <Grid.Column>
              <Card.Description textAlign="center">
                {repo.repoLanguage}
              </Card.Description>
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>
    );
  });

  return <Fragment>{renderRepos}</Fragment>;
};

export default Repos;
