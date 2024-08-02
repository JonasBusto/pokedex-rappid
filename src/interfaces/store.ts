export type STATUS_IDLE = 'Inactivo';
export type STATUS_LOADING = 'Cargando';
export type STATUS_SUCCEEDED = 'Exitoso';
export type STATUS_FAILED = 'Fallido';

export type StatusSlice =
  | STATUS_IDLE
  | STATUS_LOADING
  | STATUS_SUCCEEDED
  | STATUS_FAILED;

export type ErrorSlice = string | null | undefined | unknown;

export interface InitialStateSlice {
  status: StatusSlice;
  error: ErrorSlice;
}
