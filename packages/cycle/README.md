# @fcannizzaro/stream-deck-cycle

## Usage

```typescript
import { cycle } from '@fcannizzaro/stream-deck-cycle';

const strings = ["item1", "item2", "item3"] as const;

const objects = [
  { id: "item1", value: 1 },
  { id: "item2", value: 2 },
  { id: "item3", value: 3 }
] as const;

// clockwise
const nextItem = next("item2", strings);

// counter-clockwise
const prevItem = next("item2", strings, {
    direction: "left"
});

// with custom key extractor
const nextObjectItem = next("item2", objects, {
    extractor: item => item.id
});

// with custom key extractor and direction
const prevObjectItem = next("item2", objects, {
    extractor: item => item.id,
    direction: "left"
});
```
