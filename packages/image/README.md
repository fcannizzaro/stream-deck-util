# @fcannizzaro/stream-deck-image

## Usage

```typescript
import { 
    downloadAsArrayBuffer, 
    readAsArrayBuffer,
    readAsBase64,
    toBase64
} from '@fcannizzaro/stream-deck-image';

// async download
const downloaded = await downloadAsArrayBuffer("https://example.com/image.png");

// or sync load from file
const fromFile = readAsArrayBuffer("./path/to/image.png");

// or sync load from file
const fromFileBase64 = readAsBase64("./path/to/image.png");

// or convert buffer to base64
const base64 = toBase64(downloaded);
```
