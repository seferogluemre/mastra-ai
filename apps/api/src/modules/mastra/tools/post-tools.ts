import {createTool } from "@mastra/core";
import prisma from "@onlyjs/db";
import z from "zod"
export const getPostsCountTool=createTool({
    id:'get-posts-count',
    description:"Returns the total number of posts in the database",
    inputSchema:z.object({

    }),
    outputSchema:z.object({
        count:z.number(),
        message:z.string(),
    }),
    execute: async()=>{
        const count=await prisma.post.count();

        return {
            count,
            message:`Toplam ${count} gönderi bulundu.`
        }
    }
})

export const getPostByIdTool = createTool({
  id: 'get-post-by-id',
  description: 'Get a specific post by its ID',
  inputSchema: z.object({
    postId: z.string().describe('Post ID'),
  }),
  outputSchema: z.object({
    post: z.any().nullable(),
    message: z.string(),
  }),
  execute: async ({ context }) => {
    const post = await prisma.post.findUnique({
      where: { id: String(context.postId)},
    });

    if (!post) {
      return {
        post: null,
        message: 'Post bulunamadı',
      };
    }

    return {
      post,
      message: 'Post başarıyla bulundu',
    };
  },
});