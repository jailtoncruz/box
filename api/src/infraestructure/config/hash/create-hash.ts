import * as bcrypt from 'bcrypt';

export async function createHash(data: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(data, salt);
  return hash;
}
