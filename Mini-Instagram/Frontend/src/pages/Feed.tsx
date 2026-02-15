import axios from "axios";
import React, { useEffect } from "react";

interface Post {
  image: string;
  caption: string;
}

const Feed = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((response) => {
        setPosts(response.data?.posts || []);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);
  return (
    <div className="feed-section">
      <h1 className="feed-title">Feed</h1>
      {posts?.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts?.map((post, index) => (
          <div key={index} className="post">
            <img src={post.image} alt="Post" className="post-image" />
            <p className="post-caption">{post.caption}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;
