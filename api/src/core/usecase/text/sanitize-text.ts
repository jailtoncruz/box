export function sanitizeText(text: string) {
  const cleanedText = text.replace(/[^\w\s]/gi, '').replace(/\s+/g, '');
  return cleanedText;
}
