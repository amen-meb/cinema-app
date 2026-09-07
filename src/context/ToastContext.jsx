import {
  createContext,
  useCallback,
  useState,
} from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message) => {
    setToast(message);

    setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider
      value={{ toast, showToast }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastContext;