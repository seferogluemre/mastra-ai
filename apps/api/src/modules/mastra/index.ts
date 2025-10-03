import { Mastra } from "@mastra/core/mastra"
import { getPostsCountTool, getPostByIdTool } from "./tools/post-tools"

export const mastra = new Mastra({
    tools: {
        getPostsCountTool,
        getPostByIdTool
    }
})