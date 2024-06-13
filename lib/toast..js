import { toast as sonnerToast } from "sonner"
import Toast from "@/components/Toast"

const toast = ({ title, description }) => sonnerToast(<Toast title={title} description={description} />, {
  position: "bottom-center",
  style: { background: "transparent", padding: 0, border: 0 }
})

export default toast