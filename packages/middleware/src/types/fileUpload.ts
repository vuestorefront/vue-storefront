import { IncomingHttpHeaders } from "node:http";

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
/**
 * Request object for file upload middleware
 */
export interface FileUploadRequest {
  /**
   * Request headers
   */
  headers: IncomingHttpHeaders;
}

/**
 * Uploaded file object
 */
export interface UploadedFile {
  /**
   * Field name
   * Identifies the field name of the file
   */
  fieldname: string;
  /**
   * Original file name
   */
  originalname: string;
  /**
   * Encoding
   * eg. 7bit, 8bit
   */
  encoding: string;
  /**
   * MIME type
   * eg. image/jpeg, application/pdf
   */
  mimetype: string;
  /**
   * File size in bytes
   */
  size: number;
  /**
   * File buffer
   * @see https://nodejs.org/api/buffer.html
   */
  buffer: Buffer;
}
