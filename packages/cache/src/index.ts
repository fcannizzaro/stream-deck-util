import { LRUCache } from "lru-cache";
import { createHash } from "node:crypto";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { createWriteStream, createReadStream } from "node:fs";
import { Readable } from "node:stream";
import { stream2buffer } from "./stream";
import ms from "ms";

/**
 * Create an md5 hash of a string
 * @param value String to hash
 * @returns md5 hash of the string
 */
const md5 = (value: string) => createHash("md5").update(value).digest("hex");

/**
 * Options for the cache
 */
interface Options<TCacheType> {
  /**
   * Called when an action is logged
   * @param message Log message
   */
  log?: (message: string) => void;
  /**
   * Called when an error occurs
   * @param message Error message
   * @param error Error object
   */
  onError?: (message: string, error: Error) => void;
  /**
   * Whether to save the cache to disk
   */
  save?:
    | false
    | {
        /**
         * How often to save the cache to disk (ms format)
         */
        every?: string;
        /**
         * Path to the cache file
         */
        path?: string;
      };
  /**
   * Default value to return when a key is not found
   */
  defaultValue?: TCacheType;
  /**
   * Maximum number of items to store in the cache
   */
  max?: number;
}

/**
 * A key part can be a string, number, boolean, undefined or null
 */
type KeyPart = string | number | boolean | undefined | null;

/**
 * Flatten an array of strings into a single string
 * @param values strings to flatten
 * @returns flattened string
 */
const flat = (values: KeyPart | KeyPart[]) =>
  md5((Array.isArray(values) ? values : [values]).join(":"));

/**
 * Cache for storing the results of expensive operations
 * @param options Cache options
 * @returns Cache object
 */
export const Cache = <TCacheType extends string | number | boolean>({
  log,
  onError,
  max = 1000,
  defaultValue,
  save = {},
}: Options<TCacheType> = {}) => {
  /**
   * Cache for storing the results of expensive operations
   */
  const cache = new LRUCache<string, TCacheType>({
    max,
  });

  if (save) {
    const path =
      typeof save === "object" && save.path ? save.path : "./cache.json.br";

    const every = typeof save === "object" && save.every ? save.every : "10m";

    /**
     * Update the cache on disk every 10 minutes
     */
    setInterval(() => {
      log?.(">> updating cache on disk");
      const readable = new Readable();
      readable.push(JSON.stringify(cache.dump()));
      readable.push(null);
      const cacheFile = createWriteStream(path);
      readable.pipe(createBrotliCompress()).pipe(cacheFile);
    }, ms(every));

    /**
     * Load the cache from disk
     */
    const cacheFile = createReadStream(path);

    cacheFile.on("error", (error) => {
      onError?.(">> failed to load cache from disk", error);
    });

    cacheFile.on("open", async () => {
      const decompress = cacheFile.pipe(createBrotliDecompress());
      const content = await stream2buffer(decompress);
      cache.load(JSON.parse(content.toString()));
      log?.(">> loaded cache from disk");
    });
  }

  return {
    get: (key: KeyPart | KeyPart[]) => cache.get(flat(key)) ?? defaultValue,
    has: (key: KeyPart | KeyPart[]) => cache.has(flat(key)),
    set: (key: KeyPart | KeyPart[], value: TCacheType) =>
      cache.set(flat(key), value),
  };
};
