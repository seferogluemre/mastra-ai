import { createTool } from "@mastra/core";
import prisma from "@onlyjs/db";
import z, { int } from "zod"
import { PostPlain } from "@onlyjs/db/prismabox/Post";
import { PostsService } from "#modules/posts/service.ts";

export const getPostsCountTool = createTool({
  id: 'get-posts-count',
  description: "Returns the total number of posts in the database",
  inputSchema: z.object({

  }),
  outputSchema: z.object({
    count: z.number(),
    message: z.string(),
  }),
  execute: async () => {
    const count = await prisma.post.count();

    return {
      count,
      message: `Toplam ${count} gönderi bulundu.`
    }
  }
})

export const getPostByIdTool = createTool({
  id: 'get-post-by-id',
  description: 'Get a specific post by its ID',
  inputSchema: z.object({
    postId: z.number().int().describe('Post ID (integer)'),
  }),
  outputSchema: z.object({
    post: PostPlain,
    message: z.string(),
  }),
  execute: async ({ context }) => {

    const post = await PostsService.show(context?.postId);

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

export const createPostTool=createTool({
  id: 'create-post',
  description: 'Create a new post',
  inputSchema: z.object({
    title: z.string().describe('Post title'),
    content: z.string().describe('Post content'),
    authorId: z.string().describe('Author ID'),
  }),
  outputSchema: z.object({
    post: PostPlain,
    message: z.string(),
  }),
  execute:async({context})=>{
    const post = await PostsService.store({title: context?.title, content: context?.content}, context?.authorId);

    if(!post){
      return {
        success: false,
          post: null,
        message: 'Post oluşturulamadı',
      };
    }

    return {
      success: true,
      post,
      message: 'Post başarıyla oluşturuldu',
    };
  }
})