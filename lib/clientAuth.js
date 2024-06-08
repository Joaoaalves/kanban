import authOptions from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export async function authUser(context) {

    const session = await getServerSession(context.req, context.res, authOptions)
    if (!session) {
        return {
            redirect: {
                destination: "/",
                permantent: false
            }
        }
    }

    return {
        props: {
            session: {
                user: {
                    email: session.user.email
                },
                expires: session.expires
            },
        },
    }
}
