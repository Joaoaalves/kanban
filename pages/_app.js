import Login from "@/components/Login";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes"
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/reactQuery";
export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
