declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Public
      NEXT_PUBLIC_STAGE: "DEV" | "LIVE";
      NEXT_PUBLIC_API_BASE_URL: string;

      // AWS Credentials
      AWS_REGION: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;

      // AWS DynamoDB
      AWS_DYNAMODB_TABLE: string;

      // Administration
      ADMIN_LOGIN_EMAIL: string;
      ADMIN_LOGIN_PASSWORD: string;
      ADMIN_LOGIN_TOKEN: string;
    }
  }
}

export {};
