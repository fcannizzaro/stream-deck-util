# @fcannizzaro/stream-deck-cache

## Usage

```typescript
import { Cache } from '@fcannizzaro/stream-deck-cache';

const cache = Cache<string>()

if(cache.has("key")) {
    cache.get("key")
}

cache.set("key", "value")
```

## Configuration

```typescript
import { Cache } from '@fcannizzaro/stream-deck-cache';
import $ from  "@elgato/streamdeck";

const cache = Cache<string>({
    // log
    log: $.logger.info,
    onError: $.logger.error,
     // max items in cache
    max: 1000,
    // disk save
    save: {
        every: "10m",
        path: "./path/to/cache.json"
    }
})
```

## Disable disk save

Set `save` to `false` to disable disk save.
