import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import TopProgressBar from "@/components/ui/top-progress-bar";
import QueryClientProvider from "@/providers/query-client-provider";
import SessionProvider from "@/providers/session-provider";
import "./globals.css";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export const metadata = {
  title: "GGS - Gov Governance Soft",
  description: "Gov Governance Soft (GGS) is a legal software for Government Institution.",
};
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      translate="no"
    >
      <body className={cn(poppins.className, "h-screen overscroll-none")}>
        <SessionProvider>
          <QueryClientProvider>
            <TopProgressBar
              height="4px"
              color="#00B350FF"
            />
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
