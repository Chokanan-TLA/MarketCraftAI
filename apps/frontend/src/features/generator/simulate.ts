/** Stand-in for the real LLM Provider call (architecture.md §13 Prompt Engine) until the API is wired up. */
export function simulateGeneratedContent(prompt: string): string {
  const trimmed = prompt.trim().replace(/\s+/g, " ");

  return [
    `1) ${trimmed} — now with a clear, urgent call to action.`,
    `2) A shorter, punchier take: "${trimmed.split(" ").slice(0, 12).join(" ")}..."`,
    `3) A story-driven angle told from a customer's point of view, based on: "${trimmed}"`,
  ].join("\n\n");
}
