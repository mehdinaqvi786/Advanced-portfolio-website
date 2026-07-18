export type ApiSuccessResponse<T = undefined> = {
  success: true;
  message: string;
  data?: T;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: Record<string, string[] | undefined>;
};

export type ApiResponse<T = undefined> = ApiSuccessResponse<T> | ApiErrorResponse;
