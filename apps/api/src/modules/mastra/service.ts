import { mastra } from "./index";


export class MastraService {
    static async executeTool(toolName: string, input: Record<string, any>) {
        const tool = mastra.getTool(toolName)

        if (!tool) {
            throw new Error(`Tool ${toolName} n
                ot found`)
        }

        return await tool.execute({ context: input })
    }

    

}
