export type ResponseNoData = {
  success: boolean;
  message: string;
};

export type ResponseSuccessWithData<T> = {
  success: boolean;
  message: string;
  data: T;
};
