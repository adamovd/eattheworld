import NextAuth from "next-auth";
import { authOptions } from "../../v1/utils/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
