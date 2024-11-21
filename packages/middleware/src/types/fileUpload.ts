/**
 * Options for file upload middleware
 */
export interface FileUploadOptions {
  /**
   * Whether file upload is enabled
   * @default true
   */
  enabled?: boolean;
  /**
   * Maximum file size in bytes
   * @default 5MB
   */
  maxFileSize?: number;
  /**
   * Maximum number of files
   * @default 5
   */
  maxFiles?: number;
  /**
   * Allowed MIME types
   * @default ["image/*", "application/pdf"]
   */
  allowedMimeTypes?: string[];
  /**
   * Specific field names to accept
   * @default []
   */
  fieldNames?: string[];
}
