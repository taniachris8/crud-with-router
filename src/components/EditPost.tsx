import { useState } from "react";
import { updatePostById } from "../postsAPI";
import type { PostType } from "./Posts";

type EditPostProps = {
  post: PostType;
  setEditMode: (value: boolean) => void;
  loadPost: (value: number) => void;
};

export function EditPost({ post, setEditMode, loadPost}: EditPostProps) {
  const { id, content } = post;
  const [error, setError] = useState<string>("");
  const [updatedPost, setUpdatedPost] = useState<string>(content);

  const editPost = async () => {
    try {
      if (!updatedPost.trim()) {
        setError("Невозможно опубликовать пустой пост.");
        return;
      }

      const updated = {
        id,
        content: updatedPost.trim(),
      };
      await updatePostById(Number(id), updated);
      loadPost(Number(id));
      setEditMode(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <>
      <div className="edit-header">
        <p className="edit-title">Редактировать публикацию</p>
        <img
          src="/icons/icons8-close-50.png"
          alt="icon"
          className="edit-close-icon"
          onClick={() => setEditMode(false)}
        />
      </div>

      <div className="edit-post">
        <div className="edit-img-wrapper">
          <img src="/img/user.jpg" alt="user" className="edit-user-img" />
        </div>
        <textarea
          name="updatedPost"
          value={updatedPost}
          className="edit-post-content"
          onChange={(e) => setUpdatedPost(e.target.value)}>
        </textarea>
      </div>
      <button onClick={editPost} className="update-btn">
        Сохранить
      </button>
      {error && <p className="error-message">{error}</p>}
    </>
  );
}
