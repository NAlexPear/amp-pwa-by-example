## Simple AMP Article Hub

This version is a naive implementation of AMPs connected by another AMP-driven hub. While it would make sense for users to interact with a single hub as a PWA, leveraging all of the subsequent-visit advantages provided by pre-fetching and service worker caching, this version relies on the standard HTML experience dressed up with AMP tools.

Because in-app requests aren't going out to the AMP cache, the additional overhead of the AMP toolchain is actually slightly _slower_ than the raw HTML version would have been.

This example could, perhaps, be improved by linking content to the Google AMP Cache'd versions directly, but that would require that all links be cached by the AMP cache instantly across the application.
