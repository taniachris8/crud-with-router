import { useState, useEffect } from "react";
import "../index.css";
import { getAllPosts } from "../postsAPI";
import { Link } from "react-router-dom";
import { Post } from "./Post";
import { Block } from "./Block";

export type PostType = {
  id: number;
  content: string;
  created: string;
};

export function Posts() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");


  const loadPosts = async () => {
    try {
      setLoading(true);
      const posts = await getAllPosts();
      setPosts(posts);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

    return (
      <div className="container">
        <Block>
          <Link to="/posts/new" className="link-to-new">
            <button className="create-btn">Создать пост</button>
          </Link>
        </Block>
        {posts.map((post) => (
          <Block key={post.id}> <Post post={post} /></Block>
        ))}
      </div>
    );
}
