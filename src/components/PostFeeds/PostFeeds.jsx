import React from "react";
import { Card, Loader, Dimmer, Segment, Image } from "semantic-ui-react";
import PostCards from "../PostCards/PostCards";

export default function PostFeeds({
  posts,
  numPhotosCol,
  isProfile,
  loading,
  user,
  addLike,
  removeLike, 
  removePost
}) {

  return (
    <Card.Group itemsPerRow={numPhotosCol} stackable>
      {loading ? (
        <Segment>
          <Dimmer active inverted>
            <Loader size="small">Loading</Loader>
          </Dimmer>
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      ) : null}
      {posts.map((post) => {
        return (
          <PostCard
            post={post}
            key={post._id}
            isProfile={isProfile}
            user={user}
            addLike={addLike}
            removeLike={removeLike}
            removePost={removePost} />
        );
      })}
    </Card.Group>
  );
}
