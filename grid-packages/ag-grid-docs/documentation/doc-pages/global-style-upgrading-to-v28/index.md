---
title: "Upgrading Styles to v28"
---

With the release of v28, we have ported our grid layout system to use CSS variables. v27 and below used Sass. The key benefits are:

- Much easier to perform simple modifications to themes such as [changing the compactness](/global-style-customisation-compactness/) - projects that previously had to integrate a Sass compiler in order to make simple changes to our provided themes can now do so with a few lines of CSS.
- Reduced CSS download size for apps using multiple themes - apps with a light and dark version of the same theme will see a 50% reduction.
- Projects using Sass are still fully supported with our new Sass API that is largely backwards-compatible with the old one and provides better performance and validation.

In order to ease the upgrade to v28, we have continued to include the legacy Sass API and CSS stylesheets at their old file paths. They will be removed in a future major release.

[[warning]]
| If you upgrade an app from v27 to 28 without changing the import paths for CSS and Sass (.scss) files, you will be using the legacy styles.

We recommend that all users upgrade to the new styles.

See the instructions [for CSS users](/global-style-upgrading-to-v28-css/) and the instructions [for Sass users](/global-style-upgrading-to-v28-sass/).