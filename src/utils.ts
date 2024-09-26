// Function to dynamically get the base URL from the current pathname
const getBasename = () => {
  const path = window.location.pathname;
  // Example: Extract the first part of the path to use as the base
  // Modify the logic based on your folder structure
  const base = path.split("/").filter(Boolean)[0]; 
  return base ? `/${base}` : ""; // Return empty string if there's no folder
};

export default getBasename;