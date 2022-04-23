type Props = {
  title?: string;
  children?: React.ReactNode;
};

export default function Html({ children, title }: Props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
