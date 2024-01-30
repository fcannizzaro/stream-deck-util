# @fcannizzaro/stream-deck-grid

## Usage

### Extend Base Action

```typescript
import { action } from "@elgato/streamdeck";
import { GridAction } from "@fcannizzaro/stream-deck-grid";

/**
 * profile tile
 */
@action({ UUID: "com.profile.action" })
export class ProfileAction extends GridAction {}
```

### Create your grid

```typescript
const device = $.devices.getDeviceById(e.deviceId)!;

const grid = setupProfileGrid({
  streamDeck: $,
  device: e.deviceId,
  size: device.size,
  profile: "profile-to-open",
  encoders: {
    enabled: device.type === 7,
    layout: "picker-layout.json",
  }
});
```

### Grid Events

```typescript
grid.once("ready", () => {
  // when every buttons is linked
});

grid.on("close", () => {
  // your code here
});

grid.on("press", button => {
  // your code here
  // button.clockwise if the button is an encoder
});
```

### Grid Methods

```typescript

// init grid
grid.init();

// open profile
grid.open();

// destroy grid
grid.destroy();

// update buttons
grid.fill([
  /// buttons
]);

// Position
// top-left | top-center | top-right | bottom-left | bottom-center | bottom-right
// button = button ref | index | position
grid.update("bottom-right", {
  title: "new title",
})
```

### Cell/Button

This is the interface of a cell/button.

```typescript
export type ImageOrPromise = string | Promise<string | undefined>;

export interface Cell {
  // action
  idx?: number;
  id?: string;
  action?: Action;
  image?: ImageOrPromise | (() => ImageOrPromise);
  title?: string;
  type?: string;
  // direct listeners
  onPress?: null | (() => void);
  onDialRight?: null | (() => void);
  onDialLeft?: null | (() => void);
  // loader while image is loading
  loader?: string;
  // touch bar for Stream Deck+ devices
  layout?: string;
  // button status
  locked?: boolean;
}
```

### Hooks

Hooks are used to run code before and after the button render.

```typescript
grid.onPreRender(() => {
 // do something before render
});

grid.onPostRender(() => {
 // do something after render
});
```

### Lock Manager (`grid.lock`)

```typescript
// lock rows/columns
// first-row, last-row, first-column, last-column
const lockedButtons = grid.lock.add("last-row");

// or partial lock
const lockedButtons = grid.lock.add("last-row", {
  start: 1,
  count: 2
});

// unlock
grid.lock.remove("last-row");

// clear
grid.lock.clear();
```

### Pagination Manager (`grid.pagination`)

```typescript
// methods
grid.pagination.next();
grid.pagination.previous();
grid.pagination.reset();

// attributes
grid.pagination.current;
grid.pagination.total;
grid.pagination.required
```

## WIP

- [ ] documentation / examples
