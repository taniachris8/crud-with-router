import { useState } from "react";
import { updatePostById } from "../postsAPI";
import type { PostType } from "../App";

type EditPostProps = {
  post: PostType;
  setEditMode: (value: boolean) => void;
  loadPost: (value: number) => void;
};

export function EditPost({ post, setEditMode, loadPost}: EditPostProps) {
  const { id, content } = post;
  const [error, setError] = useState("");
  const [updatedPost, setUpdatedPost] = useState(content);
  const [loading, setLoading] = useState(false)

  const editPost = async () => {
    try {
      if (!updatedPost.trim()) {
        setError("Невозможно опубликовать пустой пост.");
        return;
      }

      setLoading(true);

      const updated = {
        id,
        content: updatedPost.trim(),
      };
      await updatePostById(Number(id), updated);
      loadPost(Number(id));
      setEditMode(false);
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
          onChange={(e) => setUpdatedPost(e.target.value)}
          onFocus={() => {
            setError("");
          }}></textarea>
      </div>
      {loading ? (
        <button onClick={editPost} className="loading-update-btn">
          Сохранение...
        </button>
      ) : (
        <button onClick={editPost} className="update-btn">
          Сохранить
        </button>
      )}
      {error && <p className="error-message">{error}</p>}
    </>
  );
}
