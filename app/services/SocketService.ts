import { io, Socket, ManagerOptions, SocketOptions } from 'socket.io-client';
import Cookies from 'universal-cookie';
import ToastService from './ToastService';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

class SocketService {
  private socket: Socket | null = null;
  private readonly namespace: string;
  private cookies: Cookies;

  constructor(namespace: string = '') {
    this.namespace = namespace;
    this.cookies = new Cookies(null, { path: '/' });
  }

  public connect(options: Partial<ManagerOptions & SocketOptions> = {}): Socket {
    if (this.socket?.connected) {
      return this.socket;
    }

    const token = this.cookies.get('token');

    this.socket = io(`${SOCKET_URL}${this.namespace}`, {
      auth: {
        token: token ? `Bearer ${token}` : undefined,
      },
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      ...options,
    });

    this.setupGlobalListeners();

    return this.socket;
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public emit(event: string, data?: any, callback?: (response: any) => void): void {
    if (!this.socket || !this.socket.connected) {
      this.connect();
    }

    if (callback) {
      this.socket?.emit(event, data, (res: any) => {
        callback(res);
      });
    } else {
      this.socket?.emit(event, data);
    }
  }

  public on<T = any>(event: string, callback: (data: T) => void): void {
    if (!this.socket) {
      this.connect();
    }
    this.socket?.on(event, callback);
  }

  public off(event: string, callback?: (...args: any[]) => void): void {
    this.socket?.off(event, callback);
  }

  private setupGlobalListeners(): void {

    this.socket?.on('connect', () => {
      console.log(`[Socket] Connected to namespace: ${this.namespace || '/'}`);
    });

    this.socket?.on('connect_error', (error) => {
      console.error('[Socket] Connection Error:', error.message);
      ToastService.updateError('مشکل در اتصال به سرور زنده');
    });

    this.socket?.on('disconnect', (reason) => {
      console.log('[Socket] Disconnected:', reason);
    });
  }
}

export default SocketService;