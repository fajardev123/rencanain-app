import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function NixtToast(
  text: string,
  color: "danger" | "success" | "warning"
) {
  const bgColor = {
    danger: "#FF0055",
    success: "#16A34A",
    warning: "#FFD369",
  };

  return Toastify({
    text: text,
    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "right",
    backgroundColor: bgColor[color],
    offset: {
      x: 10,
      y: 10,
    },
  }).showToast();
}
