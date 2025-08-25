
export interface ApiError {
  status?: number | string;
//   data?: any;
  message?: string;
}

export const getErrorMessage = (
  error: unknown,
  defaultMessage: string = "An unexpected error occurred"
): string => {
  if (!error) return defaultMessage;

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    const apiError = error as ApiError;

    // Handle RTK Query errors
    if ("status" in apiError) {
      if (apiError.status === "TIMEOUT") {
        return "Request timed out. Please try again.";
      }

      if (apiError.status === 404) {
        return "Resource not found.";
      }

      if (apiError.status === 500) {
        return "Server error. Please try again later.";
      }

      if (apiError.status) {
        return `Error: ${apiError.status}`;
      }
    }

    // Handle errors with message property
    if ("message" in apiError && typeof apiError.message === "string") {
      return apiError.message;
    }
  }

  return defaultMessage;
};

// Optional: Create a more specific version for your API
export const getRickAndMortyErrorMessage = (error: unknown): string => {
  return getErrorMessage(error, "Failed to load characters");
};
