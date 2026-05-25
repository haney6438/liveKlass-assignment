export interface ErrorResponse {
    code: string;
    message: string;
    details?: Record<string, string>;  // 필드별 에러 (서버 측 유효성 검증)
}