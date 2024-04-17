import * as bcrypt from 'bcrypt';

export async function checkHash(original: string, hash: string) {
  const isMatch = await bcrypt.compare(original, hash);
  return isMatch;
}
