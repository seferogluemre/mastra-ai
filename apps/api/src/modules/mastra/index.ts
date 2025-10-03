import { Mastra } from "@mastra/core/mastra"
import { getPostsCountTool, getPostByIdTool } from "./tools/post-tools"

export { default as mastraController } from "./controller"
export * from "./dtos"
export * from "./service"

globalThis.___MASTRA_TELEMETRY___ = true;

export const mastra = new Mastra({});

export * from './tools/index';