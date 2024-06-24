export const sanitizeInput = (input: string): string => {
  // Basic XSS protection
  return input.replace(/[&<>"']/g, (match) => {
    const entities: { [key: string]: string } = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[match];
  });
};
