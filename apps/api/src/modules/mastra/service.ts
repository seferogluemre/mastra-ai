import { getPostsCountTool, getPostByIdTool, createPostTool } from './tools/index';

const toolsRegistry = {
  getPostsCountTool,
  getPostByIdTool,
  createPostTool,
};

class MastraService {
  async executeTool(toolName: string, input: Record<string, never>) {
    const tool = toolsRegistry[toolName as keyof typeof toolsRegistry];

    if (!tool) {
      throw new Error(`Tool '${toolName}' not found. Available tools: ${Object.keys(toolsRegistry).join(', ')}`);
    }

    return await tool.execute({ context: input, runtimeContext: {} });
  }

  getAvailableTools() {
    return Object.keys(toolsRegistry).map(name => ({
      name,
      id: toolsRegistry[name as keyof typeof toolsRegistry].id,
      description: toolsRegistry[name as keyof typeof toolsRegistry].description,
    }));
  }
}

export const mastraService = new MastraService();