import { log } from "console";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const sendMessage = mutation({
  args: {
    user: v.string(),
    body: v.string(),
  },

  handler: async (ctx, args) => {
    console.log("This Typescript is running on the server");
    await ctx.db.insert("Messages", {
      user: args.user,
      body: args.body,
    });
  },
});

export const getMessages = query({
  args: {},
  handler: async (ctx) => {
    const messages = await ctx.db.query("messages").order("desc").take(50);

    return messages.reverse();
  },
});
