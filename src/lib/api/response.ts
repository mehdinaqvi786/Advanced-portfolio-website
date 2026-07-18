import { NextResponse } from "next/server";

import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/api";

export function apiSuccess<T>(
  message: string,
  data?: T,
  status = 200
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json(
    data === undefined
      ? { success: true, message }
      : { success: true, message, data },
    { status }
  );
}

export function apiError(
  message: string,
  status: number,
  errors?: ApiErrorResponse["errors"]
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    errors ? { success: false, message, errors } : { success: false, message },
    { status }
  );
}
