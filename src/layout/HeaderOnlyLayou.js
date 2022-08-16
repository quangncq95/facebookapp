import useFBAuth from "../hooks/useFBAuth";

export default function HeaderOnlyLayout({ children }) {
  const { user, logout } = useFBAuth();
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#ffe6e6",
          padding: "0px 25px",
        }}
      >
        <p>{user.name}</p>
        <button type="button" onClick={logout}>
          Logout !
        </button>
      </div>
      {children}
    </>
  );
}
