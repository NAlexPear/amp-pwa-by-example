## AMP with PWA features

This version of our AMP application uses exactly the same origin-based linking approach as the naive approach, but adds two Progressive Web App features to enhance the experience:

### Service Workers

Installed through `<amp-install-serviceworker>` components, each page of this application uses a service worker to cache assets between subsequent visits. With this strategy, pages found through AMP are first loaded from the AMP cache for maximum discoverability and speed, and subsequent requests to other pages on the same origin (or resources required by those pages) are cached for use when the user decides to navigate to other in-app pages.

This strategy also allows for offline access of _any_ cached asset, including the AMP HTML of other pages. 

### App Manifest

After a user interacts with the first AMP page (whichever page that might be) with a supported mobile device, they will be prompted to add the app to their home screen, mimicking the look-and-feel of a native mobile application.
