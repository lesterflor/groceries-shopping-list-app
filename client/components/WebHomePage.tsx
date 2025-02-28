"use dom";

export default function WebHomePage({ navigate }) {
  return (
    <div>
      <button onClick={() => navigate("/")}>Sign in</button>
    </div>
  );
}
