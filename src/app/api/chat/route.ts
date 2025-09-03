import { createResource } from '@/lib/actions/resources';
import { openai } from '@ai-sdk/openai';
import {
  convertToModelMessages,
  streamText,
  tool,
  UIMessage,
  stepCountIs,
} from 'ai';
import { z } from 'zod';
import { findRelevantContent } from '@/lib/ai/embedding';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received body:', body);
    
    const { messages } = body;
    console.log('Messages:', messages);

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid messages format', { status: 400 });
    }

    console.log('Messages before conversion:', messages);
    console.log('Type of messages:', typeof messages, Array.isArray(messages));
    
    const modelMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
    
    console.log('Model messages:', modelMessages);

    const result = streamText({
      model: openai('gpt-4o'),
      messages: modelMessages,
      stopWhen: stepCountIs(5),
      system: `You are a helpful assistant for Joey Zhou's portfolio website. You can help visitors learn about Joey's background, skills, projects, and experience.
      Check your knowledge base before answering any questions.
      Only respond to questions using information from tool calls.
      If no relevant information is found in the tool calls, respond with general helpful information about navigating the portfolio or suggest they contact Joey directly.`,
      tools: {
        addResource: tool({
          description: `add a resource to your knowledge base about Joey Zhou's portfolio, skills, or experience.`,
          inputSchema: z.object({
            content: z
              .string()
              .describe('the content or resource to add to the knowledge base'),
          }),
          execute: async ({ content }) => createResource({ content }),
        }),
        getInformation: tool({
          description: `get information from your knowledge base to answer questions about Joey Zhou.`,
          inputSchema: z.object({
            question: z.string().describe('the users question'),
          }),
          execute: async ({ question }) => findRelevantContent(question),
        }),
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
