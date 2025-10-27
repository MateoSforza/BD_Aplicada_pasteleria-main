
interface ImportMetaEnv {
  VITE_GOOGLE_CLIENT_ID: any;
  readonly VITE_API_URL: string;
  // Agrega aquí otras variables si las necesitas, por ejemplo:
  // readonly VITE_OTHER_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}