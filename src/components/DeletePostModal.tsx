type DeletePostModalProps = {
  setDeleteModal: (value: boolean) => void;
  onDelete: () => void;
  error: string;
};

export function DeletePostModal({
  setDeleteModal,
  onDelete,
  error,
}: DeletePostModalProps) {
  return (
    <>
      <div className="modal-overlay" onClick={() => setDeleteModal(false)} />

      <div className="modal">
        {error ? (
          <p className="delete-error-message">{error}</p>
        ) : (
          <p className="modal-text">
            Вы действительно хотите удалить этот пост? Нажмите кнопку "Удалить"
            для подтверждения.
          </p>
        )}

        <div className="modal-buttons">
          <button className="back-btn" onClick={() => setDeleteModal(false)}>
            Назад
          </button>
          <button onClick={onDelete} className="delete-btn">
            Удалить
          </button>
        </div>
      </div>
    </>
  );
}
