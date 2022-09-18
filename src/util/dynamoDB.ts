import AWS from "aws-sdk";

const awsConfig = {
  accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.APP_AWS_REGION,
};

AWS.config.update(awsConfig);

const dynamoDocument = new AWS.DynamoDB.DocumentClient();

export default dynamoDocument;
