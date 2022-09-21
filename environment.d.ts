declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Public
      NEXT_PUBLIC_APP_STAGE: "DEV" | "LIVE";

      // AWS Credentials
      APP_AWS_REGION: string;
      APP_AWS_ACCESS_KEY_ID: string;
      APP_AWS_SECRET_ACCESS_KEY: string;

      // AWS DynamoDB
      APP_AWS_DYNAMODB_TABLE: string;

      // Administration
      ADMIN_LOGIN_EMAIL: string;
      ADMIN_LOGIN_PASSWORD: string;
      ADMIN_LOGIN_TOKEN: string;
    }
  }
}

export {};
