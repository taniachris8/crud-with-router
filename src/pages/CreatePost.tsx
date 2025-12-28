import { useState } from "react";
import { createNewPost } from "../postsAPI";
import { useNavigate } from "react-router";
import { Block } from "../components/Block";

export function CreatePostPage() {
  const [newPost, setNewPost] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
      await createNewPost(post);
      setSuccessMessage("Пост был успешно опубликован!");
      setNewPost("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Unknown error");
      }
    }
  };

  const handleClick = () => {
    if (errorMessage) return;
    navigate("/");
  };

  return (
    <>
      <Block>
        <img
          src="/icons/icons8-close-50.png"
          alt="icon"
          className="close-icon"
          onClick={handleClick}
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
              setSuccessMessage("");
              setErrorMessage("");
            }}></textarea>
          <div className="button-wrapper">
            {successMessage && (
              <p className="response-message">{successMessage}</p>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button onClick={handleClick} className="new-post-btn">
              Опубликовать
            </button>
          </div>
        </form>
      </Block>
    </>
  );
}
