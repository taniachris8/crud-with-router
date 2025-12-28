import type { PostType } from "./Posts";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type PostProps = {
  post: PostType;
  withLink?: boolean;
};

export function Post({ post, withLink = true }: PostProps) {
  const [timeAgo, setTimeAgo] = useState("");
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
          <img className="user-img" src="/img/user.jpg" />
        </div>
        <div className="user-details">
          <p className="user-name">Anna Smith</p>
          <div className="user-info">
            <img
              src="/icons/icons8-vegan-50.png"
              alt=""
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
      <div className="reaction">
        <img src="/icons/like.png" alt="icon" className="reaction-icon" />
      </div>
      <div className="comment-input-block">
        <div className="comment-img-wrapper">
          <img src="/img/user.jpg" alt="user" className="comment-user-img" />
        </div>
        <form action="" className="comment-form">
          <input
            type="text"
            className="comment-input"
            placeholder="Напишите комментрарий"
          />
          <div className="icons-wrapper">
            <img src="/icons/happyface.png" alt="" className="comment-icon" />
            <img src="/icons/camera.png" alt="" className="comment-icon" />
            <img src="/icons/gif.png" alt="" className="comment-icon" />
            <img src="/icons/emojipicker.png" alt="" className="comment-icon" />
          </div>
        </form>
      </div>
    </>
  );
}
