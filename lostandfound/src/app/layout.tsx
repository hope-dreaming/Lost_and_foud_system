export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <title>校园失物招领系统</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="favicon.ico" />
            </head>
            <body>
                {/* Layout UI */}
                <main>{children}</main>
            </body>
        </html>
    )
}