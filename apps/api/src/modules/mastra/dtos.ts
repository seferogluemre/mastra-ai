import z from "zod";

export const executeToolBody=z.object({
    toolName:z.string(),
    input:z.optional(z.record(z.string(),z.any()))
})