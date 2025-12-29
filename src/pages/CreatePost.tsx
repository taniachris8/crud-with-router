import { useState } from "react";
import { createNewPost } from "../postsAPI";
import { useNavigate } from "react-router";
import { Block } from "../components/Block";

export function CreatePostPage() {
  const [newPost, setNewPost] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPost.trim()) {
      setErrorMessage("Невозможно опубликовать пустой пост.");
      return;
    }

    const post = {
      content: newPost.trim(),
    };

    try {
      setLoading(true);
      await createNewPost(post);
      navigate("/");
      setNewPost("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(
          "Проверьте подключение к Интернету или попробуйте позже."
        );
      } else {
        setErrorMessage("Неизвестная ошибка. Попробуйте позже.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Block>
        <img
          src="/icons/icons8-close-50.png"
          alt="icon"
          className="close-icon"
          onClick={() => navigate("/")}
        />
        <div className="post-type">
          <img alt="icon" src="/icons/post.png" className="post-icon" />
          <span className="post-type-name">Публикация</span>
        </div>
        <form action="" className="new-post-form" onSubmit={createPost}>
          <textarea
            name="new-post"
            id="textarea"
            className="new-post-textarea"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            onFocus={() => {
              setErrorMessage("");
            }}></textarea>
          <div className="button-wrapper">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {loading ? (
              <button className="loading-new-post-btn">Публикация...</button>
            ) : (
              <button className="new-post-btn">Опубликовать</button>
            )}
          </div>
        </form>
      </Block>
    </>
  );
}
