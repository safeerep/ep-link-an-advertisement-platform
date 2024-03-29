export default async () => {
    try {
        if (!process.env.PORT) throw new Error ('PORT NUMBER IS REQUIRED')
        if (!process.env.MONGODB_URL) throw new Error ('MONGODB_URL IS REQUIRED')
        if (!process.env.JWT_TOKEN_SECRET) throw new Error ('JWT_TOKEN_SECRET IS REQUIRED')
        if (!process.env.JWT_REFRESH_TOKEN_SECRET) throw new Error ('JWT_REFRESH_TOKEN_SECRET IS REQUIRED')
        if (!process.env.SALT_ROUNDS) throw new Error ('SALT_ROUNDS IS REQUIRED')
        if (!process.env.SESSION_SECRET) throw new Error ('SESSION_SECRET IS REQUIRED')
        if (!process.env.CLIENT_URL) throw new Error ('CLIENT_URL IS REQUIRED')
    } catch ( error: any) {
        console.log(`some errors happened during checking envs ${error?.message}`);
        process.exit(1)
    }
}