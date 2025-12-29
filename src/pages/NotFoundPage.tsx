import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <>
      <div className="not-found-block">
        <p>Страница не найдена</p>
        <Link to="/" className="back-home-link">
          На главную
        </Link>
      </div>
    </>
  );
}
