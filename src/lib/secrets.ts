import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';

const ssmClient = new SSMClient({ region: 'ap-southeast-2' });

export async function getSecret(parameterName: string): Promise<string> {
  try {
    const command = new GetParameterCommand({
      Name: parameterName,
      WithDecryption: true,
    });
    
    const response = await ssmClient.send(command);
    return response.Parameter?.Value || '';
  } catch (error) {
    console.error(`Failed to get parameter ${parameterName}:`, error);
    // Fallback to environment variables if Parameter Store fails
    return '';
  }
}

export async function getOpenAIKey(): Promise<string> {
  return process.env.OPENAI_API_KEY || await getSecret('/amplify/personal-portfolio/openai-api-key');
}

export async function getDatabaseURL(): Promise<string> {
  return process.env.DATABASE_URL || await getSecret('/amplify/personal-portfolio/database-url');
}
