/**
 * Calculates the modulo of a number
 * @param a number
 * @param b max
 * @returns modulo
 */
export const mod = (a: number, b: number) => ((a % b) + b) % b;

/**
 * Extract the type of the current item
 */
type CurrentType<T> = T extends Record<string, unknown> ? T[keyof T] : T;

/**
 *
 * @param current current selected element
 * @param available available elements
 * @param options options
 * @param options.direction direction of the cycle
 * @param options.extractor function to extract the key of the element if it is an object
 * @returns next element in the array (cyclic)
 */
export const cycle = <const TItem, TCurrent extends CurrentType<TItem>>(
  current: TCurrent | undefined,
  available: ReadonlyArray<TItem>,
  options: {
    direction?: "right" | "left";
    extractor?: (item: TItem) => TCurrent;
  } = {
    direction: "right",
  }
) => {
  const keys = available.map((item) => options.extractor?.(item) ?? item);
  const idx = Math.max(0, !current ? 0 : keys.indexOf(current));
  return available[
    mod(idx + (options.direction === "right" ? 1 : -1), available.length)
  ] as TItem;
};
