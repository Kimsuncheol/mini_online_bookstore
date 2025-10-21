export const runtime = "nodejs";  // ← 추가
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"

const providers: NextAuthOptions['providers'] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  }),
]

const hasEmailProviderConfig =
  process.env.EMAIL_SERVER_HOST &&
  process.env.EMAIL_SERVER_PORT &&
  process.env.EMAIL_SERVER_USER &&
  process.env.EMAIL_SERVER_PASSWORD &&
  process.env.EMAIL_FROM

if (hasEmailProviderConfig) {
  // const emailServerPort = Number(process.env.EMAIL_SERVER_PORT)

  const ENABLE_EMAIL = process.env.ENABLE_EMAIL === "1";

  if (ENABLE_EMAIL) {
    providers.push(
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST!,
          port: Number(process.env.EMAIL_SERVER_PORT!),
          auth: {
            user: process.env.EMAIL_SERVER_USER!,
            pass: process.env.EMAIL_SERVER_PASSWORD!,
          },
        },
        from: process.env.EMAIL_FROM!,
      })
    );
  }
  // if (Number.isFinite(emailServerPort)) {
  //   providers.push(
  //     EmailProvider({
  //       server: {
  //         host: process.env.EMAIL_SERVER_HOST,
  //         port: emailServerPort,
  //         auth: {
  //           user: process.env.EMAIL_SERVER_USER,
  //           pass: process.env.EMAIL_SERVER_PASSWORD,
  //         },
  //       },
  //       from: process.env.EMAIL_FROM,
  //     })
  //   )
  // }
}

export const authOptions: NextAuthOptions = {
  providers,
  pages: {
    signIn: '/',
    verifyRequest: '/',
    error: '/',
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub as string
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
