export interface GCPStructuredDTO {
  timestamp: string;
  severity: string;
  message: string;
  trace?: string;
  sourceLocation?: {
    file: string;
    line: number;
    function?: string;
  };
  [key: string]: any;
}
