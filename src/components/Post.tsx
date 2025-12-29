import type { PostType } from "../App";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CommentForm } from "./CommentForm";

type PostProps = {
  post: PostType;
  withLink?: boolean;
};

export function Post({ post, withLink = true }: PostProps) {
  const [timeAgo, setTimeAgo] = useState("");
  const [comment, setComment] = useState<boolean>(false);
  const { content, id, created } = post;

  function updateTimeAgo(created: string) {
    const now = Date.now();
    const createdDate = new Date(created);
    const diffMs = now - createdDate.getTime();

    const diffMinutes = Math.floor(diffMs / 60000);

    if (diffMinutes < 60) {
      setTimeAgo(`${diffMinutes} мин назад`);
    } else {
      const day = createdDate.getDate();
      const month = createdDate.getMonth() + 1;
      const hours = createdDate.getHours().toString().padStart(2, "0");
      const minutes = createdDate.getMinutes().toString().padStart(2, "0");
      setTimeAgo(`${hours}:${minutes} ${day}.${month}`);
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => updateTimeAgo(created), 0);
    const intervalId = setInterval(() => updateTimeAgo(created), 60000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [created]);

  return (
    <>
      <div className="user">
        <div className="img-wrapper">
          <img className="user-img" src="/img/user.jpg" alt="user" />
        </div>
        <div className="user-details">
          <p className="user-name">Anna Smith</p>
          <div className="user-info">
            <img
              src="/icons/icons8-vegan-50.png"
              alt="icon"
              className="role-icon"
            />
            <span className="user-role">Основатель группы</span>
            <span className="created">• {timeAgo}</span>
          </div>
        </div>
      </div>
      {withLink ? (
        <Link to={`/posts/${id}`} id="link">
          <div className="post-content">{content}</div>
        </Link>
      ) : (
        <div className="post-content">{content}</div>
      )}
      <div className="reactions">
        <div className="reaction">
          <img src="/icons/like.png" alt="icon" className="like-icon" />
          Нравится
        </div>
        <div className="reaction">
          <img
            onClick={() => setComment(!comment)}
            src="/icons/comment.png"
            alt="icon"
            className="comment-icon"
          />
          Комментарий
        </div>
      </div>
      {comment && <CommentForm />}
    </>
  );
}
