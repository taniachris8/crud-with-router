import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { deletePostById, getPostById } from "../postsAPI";
import type { PostType } from "../App";
import { Block } from "../components/Block";
import { Post } from "../components/Post";
import { DeletePostModal } from "../components/DeletePostModal";
import { EditPost } from "../components/EditPost";

export function ViewPostPage() {
  const { id } = useParams();

  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const loadPost = async (id: number) => {
    try {
      setLoading(true);
      const post = await getPostById(id);
      setPost(post);
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

  const deletePost = async () => {
    try {
      await deletePostById(Number(id));
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Проверьте подключение к Интернету или попробуйте позже.");
      } else {
        setError("Неизвестная ошибка. Попробуйте позже.");
      }
    }
  };

  useEffect(() => {
    if (!id) return;
    loadPost(Number(id));
  }, [id]);

  return (
    <>
      {loading && (
        <img
          className="loading-icon"
          alt="Loading... "
          src="/icons/icons8-loading-48.png"
        />
      )}

      {!loading && post && (
        <>
          {editMode ? (
            <Block>
              <EditPost
                post={post}
                setEditMode={setEditMode}
                loadPost={loadPost}
              />
            </Block>
          ) : (
            <Block>
              <Post post={post} withLink={false} />
              <div className="buttons">
                <button onClick={() => setEditMode(true)} className="edit-btn">
                  Изменить
                </button>
                <button
                  onClick={() => setDeleteModal(true)}
                  className="delete-btn">
                  Удалить
                </button>
              </div>
              {deleteModal && (
                <DeletePostModal
                  setDeleteModal={setDeleteModal}
                  onDelete={deletePost}
                  error={error}
                />
              )}
            </Block>
          )}
        </>
      )}
      {error && <p className="error-message">{error}</p>}
    </>
  );
}
