---
title: "Upgrading from the Legacy CSS files"
---

The Legacy CSS files are deprecated and will be removed from the Grid in a future major release. The new CSS files are 100% backwards compatible and upgrading should be as simple as changing an import path.

[[warning]]
| If you upgrade an app from v27 to 28 and have not changed the CSS import paths, you will still be using the legacy CSS files. Follow the instructions in this document to upgrade.

## Updating the CSS import paths

There are many ways to import CSS, but however you are doing this in your app you need to delete the `/dist` part from the path. For example if you're using the unpkg CDN:

```html
<!-- old path -->
<link
  rel="stylesheet"
  href="https://unpkg.com/ag-grid-community@@AG_GRID_VERSION@/dist/styles/ag-grid.css" />

<!-- new path -->
<link
  rel="stylesheet"
  href="https://unpkg.com/ag-grid-community@@AG_GRID_VERSION@/styles/ag-grid.css" />
```

## Dark themes

In v27 there were separate CSS files for the light and dark versions of provided themes, e.g. `ag-theme-alpine.css` and `ag-theme-alpine-dark.css`.

In v28 both light and dark versions of themes are included in one file, so if you were previously including `ag-theme-alpine-dark.css`, change it to `ag-theme-alpine.css`. If you were previously including both files, remove the dark file.
