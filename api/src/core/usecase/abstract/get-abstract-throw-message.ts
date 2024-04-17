export function getAbstractThrowMessage(...args: any[]) {
  return 'Method not implemented.'.concat(
    args
      .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : arg))
      .join(','),
  );
}
