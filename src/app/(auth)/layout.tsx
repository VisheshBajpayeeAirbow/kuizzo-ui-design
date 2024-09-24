export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className={`font-inter`}>{children}</div>
    </section>
  );
}
