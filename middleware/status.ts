import bot from "../helper/bot.ts";
import { StatusEvent } from  "../deps.ts";

export default async (event: StatusEvent) => {
    const { branches, context, description: message, target_url: url, state } = event;
    const { name: branch } = branches[0];
    let icon = "⌛";
    if(state === "success") {
        icon = "✅";
    }
    if(state === "failure") {
        icon = "❌";
    }
    const formattedMessage = (message != null && message.indexOf("(") !== -1) ? message : `(${message})`;
    const text =
        `${icon} <b>CI ${context}${formattedMessage} on branch ${branch}</b>`;
    return await bot.push(text, url);
};
