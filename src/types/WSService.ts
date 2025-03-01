export type WSService = {
  initializeSocket: () => void;
  emit: (event: string, data?: any) => void;
  on: (event: string, cb: (data: any) => void) => void;
  off: (event: string) => void;
  removeListener: (listenerName: string) => void;
  updateAccessTokens: () => void;
  disconnect: () => void;
};
