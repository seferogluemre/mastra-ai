import Elysia from "elysia";
import { mastraService } from "./service";
import { executeToolBody } from "./dtos";

const app = new Elysia({
    prefix: "/mastra"
})
    .get("/tools", async () => {
        return {
            success: true,
            tools: mastraService.getAvailableTools(),
        }
    })
    .post("/execute", async ({ body }) => {
        try {
            const { toolName, input } = body;

            const result = await mastraService.executeTool(toolName, input || {})

            return {
                success: true,
                result,
            }
        } catch (error) {
            return {
                success: false,
                error: new Error((error as Error).message)
            }
        }
    }
        , { executeToolBody }
    )

export default app