import { io, Socket, ManagerOptions, SocketOptions } from 'socket.io-client';
import Cookies from 'universal-cookie';
import ToastService from './ToastService'; // در صورت نیاز برای نمایش خطاها یا لودینگ ارتباط

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

class SocketService {
  private socket: Socket | null = null;
  private readonly namespace: string;
  private cookies: Cookies;

  constructor(namespace: string = '') {
    this.namespace = namespace;
    this.cookies = new Cookies(null, { path: '/' });
  }

  // ۱. برقراری اتصال به سرور
  public connect(options: Partial<ManagerOptions & SocketOptions> = {}): Socket {
    if (this.socket?.connected) {
      return this.socket;
    }

    const token = this.cookies.get('token');

    // ایجاد کانکشن همراه با ارسال توکن در auth (یا headers)
    this.socket = io(`${SOCKET_URL}${this.namespace}`, {
      auth: {
        token: token ? `Bearer ${token}` : undefined,
      },
      autoConnect: true,
      reconnection: true, // تلاش مجدد خودکار در صورت قطع اتصال
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      ...options,
    });

    this.setupGlobalListeners();

    return this.socket;
  }

  // ۲. قطع اتصال
  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // ۳. ارسال داده به بک‌اند (معادل Post/Patch در HTTP)
  public emit(event: string, data?: any, callback?: (response: any) => void): void {
    if (!this.socket || !this.socket.connected) {
      this.connect();
    }

    if (callback) {
      // اگر بک‌اند از Acknowledgment پشتیبانی می‌کند
      this.socket?.emit(event, data, (res: any) => {
        callback(res);
      });
    } else {
      this.socket?.emit(event, data);
    }
  }

  // ۴. گوش دادن به یک رویداد خاص از سمت بک‌اند (Listen)
  public on<T = any>(event: string, callback: (data: T) => void): void {
    if (!this.socket) {
      this.connect();
    }
    this.socket?.on(event, callback);
  }

  // ۵. لغو گوش دادن به یک رویداد (برای جلوگیری از Memory Leak در کامپوننت‌ها)
  public off(event: string, callback?: (...args: any[]) => void): void {
    this.socket?.off(event, callback);
  }

  // مدیریت رویدادهای عمومی اتصال
  private setupGlobalListeners(): void {
    const toastId = ToastService.showLoading();

    this.socket?.on('connect', () => {
      console.log(`[Socket] Connected to namespace: ${this.namespace || '/'}`);
    });

    this.socket?.on('connect_error', (error) => {
      console.error('[Socket] Connection Error:', error.message);
      ToastService.updateError(toastId, 'مشکل در اتصال به سرور زنده');
    });

    this.socket?.on('disconnect', (reason) => {
      console.log('[Socket] Disconnected:', reason);
    });
  }
}

export default SocketService;