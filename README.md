# Monster Truck Arena – Landing Page
The game's public page: what Monster Truck Arena is, how it plays and where it is on the way to the App Store. Plain HTML, CSS and JavaScript, with no build step and no dependencies.

The game itself is a mixed reality app for Apple Vision Pro, in [lorenzomatrullo/MonsterTruckArena](https://github.com/lorenzomatrullo/MonsterTruckArena).

<br>

## Files
| Path | Contains |
|------|----------|
| `index.html` | The page itself, one section per part of the game |
| `styles.css` | The brand's palette, lettering and chunky lipped shapes, in CSS |
| `script.js` | The sticky nav, the scroll reveals and the garage's paint picker |
| `assets/trucks/` | The three trucks in the four player colours, copied from the app's asset catalogue |
| `assets/icon.png` | The app icon's front layer, used as the favicon and the wordmark |

<br>

## Preview
Open `index.html` in a browser, or serve the folder to test it the way it ships.
```sh
python3 -m http.server 8000
```

<br>

## Publishing
GitHub Pages serves this repository as it stands: **Settings › Pages**, source **Deploy from a branch**, branch `main` and folder `/ (root)`.

<br>

## Keeping It On Brand
The page is a copy of the app's look, not a second design, so changes follow the app rather than the other way round. The paths below are in the app's repository.
- **Colours** are the palette in `Packages/MonsterTruckKit/Sources/MonsterTruckKit/Brand/Color+Brand.swift`, written as CSS variables at the top of `styles.css`
- **Lettering** is Black Han Sans, the app's display font, with the same hard lip under the title
- **Buttons** copy `Lipped.swift`: a face standing on a darker lip, under a light rim, sinking onto the lip when pressed
- **Trucks** come from the app's asset catalogue. Re-copy them when the models change

<br>

## Notes
- The App Store badge is a placeholder until the app ships. Replace it with the real link in the `release` section of `index.html`
- Every animation is off under Reduce Motion, as it is in the app
