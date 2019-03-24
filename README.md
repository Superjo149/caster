# caster

> ## 🛠 Status: In Development
>
> caster is currently in development. It's on the fast track to a 1.0 release, so we encourage you to use it and give us your feedback, but there are things that haven't been finalized yet and you can expect some changes.

## The Idea

**One API, any Client**

```js
import server from '@cast/server';
import ChromeCast from '@cast/client-chromecast';
import AirPlay from '@cast/client-airplay';
import Dlna from '@cast/client-dlna';

await server({
  subtitles: path.join(srtPath),
  content: path.join(videoPath),
  host: '127.0.0.1',
  port: 1234,
  clients: [
    ChromeCast,
    AirPlay,
    Dlna({
      volume: 90,
      ...customOptions
    })
  ]
});
```
