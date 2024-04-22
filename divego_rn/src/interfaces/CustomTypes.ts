export interface CustomWindow extends Window {
  host: string;
  navigator: any;
  baseURL: string;
}
