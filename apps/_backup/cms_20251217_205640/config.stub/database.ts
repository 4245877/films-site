export default ({ env }) => ({
  connection: {
    client: env("DATABASE_CLIENT", "postgres"),
    connection: {
      host: env("DATABASE_HOST", "db"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "films"),
      user: env("DATABASE_USERNAME", "films"),
      password: env("DATABASE_PASSWORD", "films"),
      ssl: env.bool("DATABASE_SSL", false)
        ? { rejectUnauthorized: env.bool("DATABASE_SSL_REJECT_UNAUTHORIZED", true) }
        : false,
    },
  },
});
