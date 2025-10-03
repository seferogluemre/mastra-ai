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
    .post(
        '/execute',
        async ({ body, set }) => {
            const { toolName, input } = body;

            try {
                const result = await mastraService.executeTool(toolName, input || {});

                return {
                    success: true,
                    result,
                };
            } catch (error) {

                set.status = 400;

                return {
                    success: false,
                    error: (error as Error).message || 'Unknown error',
                    stack: (error as Error).stack,
                    details: String(error),
                };
            }
        }
        , { executeToolBody }
    )

export default app