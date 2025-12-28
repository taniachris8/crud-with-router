import { Block } from "../components/Block";
import { Post } from "../components/Post";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { deletePostById, getPostById } from "../postsAPI";
import type { PostType } from "../components/Posts";
import { useNavigate } from "react-router-dom";
import { DeletePostModal } from "../components/DeletePostModal";
import { EditPost } from "../components/EditPost";

export function ViewPostPage() {
  const { id } = useParams();
  
  console.log("useParams", useParams());
  console.log("id", id);
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const navigate = useNavigate();

  const loadPost = async (id: number) => {
    try {
      setLoading(true);
      const post = await getPostById(id);
       console.log("post", post);
      setPost(post);
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

  const deletePost = async () => {
    try {
      await deletePostById(Number(id));
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
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
              {error && <p>{error}</p>}
              {deleteModal && (
                <DeletePostModal
                  setDeleteModal={setDeleteModal}
                  onDelete={deletePost}
                />
              )}
            </Block>
          )}
        </>
      )}
    </>
  );
}
