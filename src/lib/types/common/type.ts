type ErrorResponse = {
  response: {
    data: {
      message: string;
      statusCode: number;
    };
  };
};

export type { ErrorResponse };
