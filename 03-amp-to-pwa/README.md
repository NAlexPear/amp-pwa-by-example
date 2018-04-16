## AMP to PWA

While adding a service worker and manifest were a big win for page speed and offline usability, there are still features that are unique to PWAs that can't be replicated by a service-worker-enabled AMP page. These include things like background sync-ing and push notifications.

On top of these PWA-specific limitations, there are strong incentives for content-creators in the publishing industry to leverage the un-restricted features outside of AMP HTML to create their own fully-featured "hub" that's connected to discoverable AMP content, but that takes over the service of content from the origin once a user has interacted with a discovered piece of content for the first time. This model is represented here, as a "leaf" node/article that redirects to a fully-featured PWA as the user interacts with it.
