import { useContext } from "react";
import ThemeContext from "../context/ThemeContextValue";

export default function useTheme() {
  return useContext(ThemeContext);
}
