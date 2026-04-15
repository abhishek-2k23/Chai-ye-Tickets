import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type ToastType = "success" | "warning" | "loading" | "error";

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (message: string, type: ToastType = "success", duration = 3000) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((current) => [{ id, type, message }, ...current]);

    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, duration);
  };

  const value = useMemo(() => ({ showToast }), []);

  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case "success":
        return "bg-emerald-500 text-white border-emerald-600";
      case "warning":
        return "bg-amber-500 text-black border-amber-600";
      case "error":
        return "bg-red-500 text-white border-red-600";
      case "loading":
        return "bg-slate-800 text-white border-slate-900";
      default:
        return "bg-white text-black";
    }
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex flex-col gap-3 items-end">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`max-w-xs rounded-2xl border px-4 py-3 shadow-xl transition-all duration-300 ease-out ${getToastStyles(toast.type)}`}
          >
            <div className="flex items-center gap-2">
              {toast.type === "loading" && (
                <span className="inline-flex h-2.5 w-2.5 animate-spin rounded-full border border-white border-t-transparent" />
              )}
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};
