export const env = {
  backendUrl:
    import.meta.env.VITE_BACKEND_URL && import.meta.env.VITE_BACKEND_URL.trim() !== ""
      ? import.meta.env.VITE_BACKEND_URL
      : import.meta.env.PROD
        ? "/api"
        : "http://localhost:5000",
};
