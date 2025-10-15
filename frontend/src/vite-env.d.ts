
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Agrega aquí otras variables si las necesitas, por ejemplo:
  // readonly VITE_OTHER_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}