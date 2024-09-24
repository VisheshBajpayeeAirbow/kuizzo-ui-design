import type { Metadata } from "next";
import "./globals.css";
import {
  QueryProvider,
  AppThemeProvider,
  AuthProvider,
  StoreProvider,
} from "@/utils/Providers";

export const metadata: Metadata = {
  title: {
    default: "Kuizzo",
    template: "Kuizzo | %s",
  },
  description: "AI Powered Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-inter bg-background-app flex flex-col `}>
        <StoreProvider>
          <AuthProvider>
            <AppThemeProvider>
              <QueryProvider>{children}</QueryProvider>
            </AppThemeProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
