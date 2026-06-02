import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: "Healthcare HLApp - Secure Doctor-Patient System",
  description: "Secure, structured online appointment booking, diagnosis, treatment tracking, medical records vaults, and medication schedules.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
