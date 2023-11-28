export interface ApiResponse<T> {
    body: T | null;
    responseCode: number;
    message: string;
}