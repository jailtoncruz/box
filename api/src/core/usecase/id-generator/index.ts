import ShortUniqueId from 'short-unique-id';

const { randomUUID } = new ShortUniqueId({ length: 16 });

export const randomShortId = randomUUID;

export function randomFriendlyId() {
  const shortId = new ShortUniqueId({
    length: 5,
    dictionary: 'alphanum_upper',
  });
  return `${shortId.randomUUID()}-${shortId.randomUUID()}`;
}

export function randomBucketId() {
  const shortId = new ShortUniqueId({
    length: 16,
    dictionary: 'alphanum_lower',
  });
  return shortId.randomUUID();
}
