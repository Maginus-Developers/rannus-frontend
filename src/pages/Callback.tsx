const Callback = () => {
  const url = new URL(window.location.href);
  const code = url.searchParams.get("jwt");
  if (code) {
    window.localStorage.setItem("token", code);
    const stateParam = url.searchParams.get("state");
    if (stateParam) {
      const state = JSON.parse(decodeURIComponent(stateParam));
      if (state.redirectTo) {
        window.location.href = state.redirectTo;
      }
    }
  }
  return <div>Callback</div>;
};

export default Callback;
