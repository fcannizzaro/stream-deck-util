# @fcannizzaro/stream-deck-gesture

## Usage

```typescript
import { Gestures } from '@fcannizzaro/stream-deck-gesture';
import { Action, action, WillAppearEvent, WillDisappearEvent, KeyDownEvent, KeyUpEvent } from "@elgato/streamdeck";

@action({ UUID: "com.example.gesture" })
export class PullItem extends SingletonAction {
  private gestures = Gestures();

  // start gesture detection when action is added
  onWillAppear(e: WillAppearEvent<{}>) {
    this.gestures.start(e.action.id, async (gesture: GestureType) => {
      console.log(gesture);
      e.action.showOk();
    });
  }

  // stop gesture detection when action is removed
  onWillDisappear(e: WillDisappearEvent<{}>) {
    this.gestures.stop(e.action.id);
  }
  
  // handle key events
  onKeyUp(e: KeyUpEvent<{}>) {
      this.gestures.keyUp(e.action.id);
  }

  // handle key events
  onKeyDown(e: KeyDownEvent<{}>) {
    this.gestures.keyDown(e.action.id);
  }
}
```
