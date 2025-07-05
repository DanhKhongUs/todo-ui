/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  // Thêm nhiều biến khác ở đây
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
