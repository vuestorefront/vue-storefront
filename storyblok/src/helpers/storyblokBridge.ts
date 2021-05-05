declare const window: any

export const storyblokBridge = (
  content: { content: {}[] },
  events: string[],
): any => {
  if (window.storyblok) {
    window.storyblok.init()
    if (Array.isArray(events) && events.length) {
      window.storyblok.on(events, (event) => {
        if (event.action === 'input') {
          content.content = event.story.content
        }
      })
    }
  }
}
