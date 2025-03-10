import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveSnippets = mutation({
    args: {
        userId: v.string(),
        title: v.string(),
        language: v.string(),
        code: v.string(),
        previewImg: v.string(),
        userName: v.string(),
        version: v.string()
    },
    handler: async (ctx, args) => {
        if (!args.userId || !args.code || !args.userName || !args.language || !args.title) {
            throw new Error("Missing required fields");
        }

        try {
            const snippetId = await ctx.db.insert("snippets", args);
            return { success: true, snippetId };
        } catch (error) {
            console.error("Failed to save snippet:", (error as Error).message);
            throw new Error("Failed to save snippet");
        }
    }
});

export const getAllSnippets = query({
    handler: async (ctx) => {
        try {
            return await ctx.db.query("snippets").collect();
        } catch (error) {
            console.error("Failed to fetch snippets:", (error as Error).message);
            throw new Error("Failed to fetch snippets");
        }
    }
});

export const getSnippetsByUser = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        try {
            return await ctx.db.query("snippets")
                .filter(q => q.eq(q.field("userId"), args.userId))
                .collect();
        } catch (error) {
            console.error("Failed to fetch user snippets:", (error as Error).message);
            throw new Error("Failed to fetch user snippets");
        }
    }
});