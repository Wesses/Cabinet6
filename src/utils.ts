const getBasename = () => {
  const path = window.location.pathname;

  const base = path.split("/").filter(Boolean)[0]; 
  return base ? `/${base}` : "";
};

export default getBasename;