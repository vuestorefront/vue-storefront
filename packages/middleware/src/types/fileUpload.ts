export interface FileUploadOptions {
  enabled?: boolean;
  maxFileSize?: number; // in bytes
  maxFiles?: number;
  allowedMimeTypes?: string[];
  fieldNames?: string[]; // specific field names to accept
}
