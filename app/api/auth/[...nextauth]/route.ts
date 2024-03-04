import NextAuth, { AuthOptions } from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak";
import GoogleProvider from "next-auth/providers/google"


const providers = [
  KeycloakProvider({
    clientId: process.env.KEYCLOAK_ID || '',
    clientSecret: process.env.KEYCLOAK_SECRET || '',
    wellKnown: "http://127.0.0.1:8080/realms/Filestore/.well-known/openid-configuration",
    // issuer: "http://localhost:8082/realms/Filestore"

  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_ID || '',
    clientSecret: process.env.GOOGLE_SECRET || '',
    wellKnown: "https://accounts.google.com/.well-known/openid-configuration"
  })
];


const authConfig: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: providers,
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account) {
        if (account.provider === "google") {
          token.access_token = account.id_token;
        } else {
          token.access_token = account.access_token;
        }
        // console.log("token: " + JSON.stringify(token));


      }
      return token;
    },
    session: async ({ session, token }) => {
      if( session) {
        if (session.user) {
          session.user.token = token.access_token;
          // console.log("session: " + JSON.stringify(session));

        }
      }


      return session;
    }
  },
  events: {
    signIn: async ({ user, account, profile, isNewUser }) => {
      console.log("SIGNIN EVENT!!");
      const result = await fetch("http://localhost:8081/api/user/register", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${account?.provider === "google" ? account?.id_token : account?.access_token}`
        }
      }).then(data => {
        return data;
      });

      
      console.log("RESULT")
      console.log(result)

      // if (result.ok) {
      //   const data = await result.json();
      //   if (data['error']) {
      //   } else {
      //   }
      // }

    },
    signOut: async (message) => { console.log("signout event") },
    createUser: async (message) => { console.log("createUser event") },
    linkAccount: async (message) => { console.log("linkuser event") },
    // session: async (message) => { console.log("session event, session: " + JSON.stringify(message.session) ) },

  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt"
  }
};

const handler = NextAuth(authConfig)

export {authConfig};
export { handler as GET, handler as POST }