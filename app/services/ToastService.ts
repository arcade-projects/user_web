import { toast, ToastContent, Id } from "react-toastify";

class ToastService {
  showLoading(message: ToastContent = "درحال انجام عملیات..."): Id {
    return toast(message, this.loadingOptions());
  }

  updateSuccess(id: Id, message: ToastContent): void {
    if (id) toast.update(id, this.successOptions(message));
  }

  updateError(id: Id, message: ToastContent): void {
    if (id) toast.update(id, this.errorOptions(message));
  }

  private successOptions(message: ToastContent): object {
    return {
      isLoading: false,
      render: message || "عملیات با موفقیت انجام شد",
      position: "bottom-center",
      autoClose: 3000,
      style: { background: "#64bb6a", color: "white", textAlign: "right" },
    };
  }

  private errorOptions(message: ToastContent): object {
    return {
      isLoading: false,
      render: message || "خطایی رخ داده است",
      position: "bottom-center",
      autoClose: 5000,
      style: { background: "#e04a4a", color: "white", textAlign: "right" },
    };
  }

  private loadingOptions(): object {
    return {
      isLoading: true,
      position: "bottom-center",
      closeButton: false,
      draggable: false,
      style: { background: "#fff", color: "#252525", textAlign: "right" },
    };
  }
}

const toastService = new ToastService();
export default toastService;