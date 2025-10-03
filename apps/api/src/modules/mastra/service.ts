import { getPostsCountTool, getPostByIdTool } from './tools/index';

const toolsRegistry = {
  getPostsCountTool,
  getPostByIdTool,
};

class MastraService {
  async executeTool(toolName: string, input: Record<string, any>) {
    const tool = toolsRegistry[toolName as keyof typeof toolsRegistry];
    
    if (!tool) {
      throw new Error(`Tool '${toolName}' not found. Available tools: ${Object.keys(toolsRegistry).join(', ')}`);
    }

    return await tool.execute({ context: input });
  }

  getAvailableTools() {
    return Object.keys(toolsRegistry).map(name => ({
      name,
      id: toolsRegistry[name as keyof typeof toolsRegistry].id,
      description: toolsRegistry[name as keyof typeof toolsRegistry].description,
    }));
  }
}

export const mastraService=new MastraService();