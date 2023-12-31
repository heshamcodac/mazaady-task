"use client";
import { Header, Nav } from "@components";
import "@styles/globals.scss";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Nav />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
