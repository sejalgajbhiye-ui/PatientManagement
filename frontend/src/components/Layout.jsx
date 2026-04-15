export function Layout({ children }) {
  return (
    <main className="app-shell">
      <div className="main-panel">{children}</div>
    </main>
  );
}
