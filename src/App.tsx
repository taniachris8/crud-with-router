import { useState, useEffect } from "react";
import "./App.css";
import { getAllPosts } from "./postsAPI";
import { Link } from "react-router-dom";
import { Post } from "./components/Post";
import { Block } from "./components/Block";

export type PostType = {
  id: number;
  content: string;
  created: string;
};

export function App() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPosts = async () => {
    try {
      setLoading(true);
      const posts = await getAllPosts();
      setPosts(posts);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Проверьте подключение к Интернету или попробуйте позже.");
      } else {
        setError("Неизвестная ошибка. Попробуйте позже.");
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
      {loading && (
        <img
          alt="Loading..."
          src="/icons/icons8-loading-48.png"
          className="posts-loading-icon"
        />
      )}
      {[...posts]
        .sort(
          (a, b) =>
            new Date(b.created).getTime() - new Date(a.created).getTime()
        )
        .map((post) => (
          <Block key={post.id}>
            <Post post={post} />
          </Block>
        ))}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
