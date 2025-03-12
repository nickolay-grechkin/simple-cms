import { Link, Outlet } from "react-router-dom";

export const Main: React.FC = () => {
  return (
    <div>
      <nav>
        <ul style={{ display: "flex", listStyle: "none", gap: "20px" }}>
          <li>
            <Link to="/schema">Schema</Link>
          </li>
          <li>
            <Link to="/content">Content</Link>
          </li>
        </ul>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
};
