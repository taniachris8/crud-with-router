
type DeletePostModalProps = {
  setDeleteModal: (value: boolean) => void;
  onDelete: () => void;
};

export function DeletePostModal({ setDeleteModal, onDelete }: DeletePostModalProps) {
  return (
    <>
          <div className="modal-overlay" onClick={() => setDeleteModal(false)} />
          
      <div className="modal">
        <p className="modal-text">
          Вы действительно хотите удалить этот пост? Нажмите кнопку "Удалить"
          для подтверждения.
        </p>
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
