export function CommentForm() {
  return (
    <>
      <div className="comment-input-block">
        <div className="comment-img-wrapper">
          <img src="/img/user.jpg" alt="user" className="comment-user-img" />
        </div>
        <form action="" className="comment-form">
          <input
            type="text"
            className="comment-input"
            placeholder="Напишите комментарий"
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
