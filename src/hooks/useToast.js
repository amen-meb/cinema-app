import { useContext } from "react";

import ToastContext from "../context/ToastContext";

function useToast() {
  return useContext(ToastContext);
}

export default useToast;
