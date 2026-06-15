/**
 * Global "now playing with sound" registry.
 * Ensures only one video has audible volume at a time —
 * when a new video is unmuted, the previously active one is muted
 * and its UI (volume slider / icon) is reset to muted state.
 */
let activeIframeRef = null;
let activeReset = null; // callback to reset the previous slider's UI to vol=0

export function activateAudio(iframeRef, resetFn) {
  if (activeIframeRef && activeIframeRef !== iframeRef) {
    try {
      activeIframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event:'command', func:'mute', args:[] }), '*'
      );
    } catch (_) {}
    if (activeReset) activeReset();
  }
  activeIframeRef = iframeRef;
  activeReset = resetFn;
}

export function deactivateAudio(iframeRef) {
  if (activeIframeRef === iframeRef) {
    activeIframeRef = null;
    activeReset = null;
  }
}
