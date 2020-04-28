import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";

const ProfileCard = (props) => {
  return (
    <div className="card">
      <Card>
        <Image src={props.avatarUrl} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{props.name}</Card.Header>
          <Card.Header>{props.userName}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <span>
            <Icon name="code" />
            {props.repos} Repositories
          </span>
        </Card.Content>
        <Card.Content extra>
          <span>
            <Icon name="users" />
            {props.followers} Followers
          </span>
        </Card.Content>

        <Card.Content extra>
          <span>
            <Icon name="hand paper" />
            {props.following} Following
          </span>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ProfileCard;
