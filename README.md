<div align="center">

# `@castlenine/svelte-qrcode`

[![npm.badge]][npm] [![download.badge]][download] [![repl.badge]][repl] [![contribution.badge]][contribution]

QR Code generator for Svelte & SvelteKit, with no dependencies
</div>

## Install

Use your package manager to install:

```bash
npm install --save-dev @castlenine/svelte-qrcode
```

## Quick Start

```svelte
<script>
  import QRCode from '@castlenine/svelte-qrcode';
</script>

<QRCode data="Hello world!" />
```

![Alt text](https://github.com/Castlenine/svelte-qrcode/blob/master/readme/sample-hello-world.svg?sanitize=true)

## Migration from v1 to v2

Many new features have been added to version 2.0.0, and some properties have been renamed.

Here is a list of the changes:

| Old property name      | New property name      | Note                                                                 |
| ---------------------- | ---------------------- | -------------------------------------------------------------------- |
| `content`              | `data`                 |                                                                      |
| `errorCorrection`      | `errorCorrectionLevel` |                                                                      |
| `base64Image`          | `logoInBase64`         |                                                                      |
| `logoWidth`            | `logoSize`             | `logoSize` is applied to `logoWidth` and `logoHeight` (new property) |
| `dispatchDownloadLink` | `dispatchDownloadUrl`  |                                                                      |

| Old event name          | New event name         |
| ----------------------- | ---------------------- |
| `downloadLinkGenerated` | `downloadUrlGenerated` |

## Properties

### Data

The data encoded in the QR code typically consists of a URL to a website or a code used by applications, such as handling secrets in time-based one-time password (TOTP) applications.

This is the only property required to generate the QR code.

| Property name | Type     | Required |
| ------------- | -------- | -------- |
| `data`        | `string` | **Yes**  |

```svelte
<QRCode data="https://duxreserve.com" />
```

### QR Code type number

The QR code type number, an integer ranging from 1 to 40, determines the QR code's data capacity. The default value is `0`, which allows for automatic detection.

[More details](https://github.com/Castlenine/svelte-qrcode/blob/master/readme/qr-code-type-number.png)

| Property name | Type                              | Default value |
| ------------- | --------------------------------- | ------------- |
| `typeNumber`  | Integer `number` between 0 and 40 | `0`           |

**Note:** In most cases, setting this property is unnecessary. However, if you need to generate a QR code with a specific type number, you can set it as follows:

```svelte
<QRCode data="https://duxreserve.com" typeNumber={4} />
```

### Error correction level

QR Code has error correction capability to restore data if the code is dirty or damaged. Four error correction levels are available to choose according to the operating environment. Raising this level improves error correction capability but also increases the amount of data QR Code size and reduces the QR code's data capacity.

To select error correction level, various factors such as the operating environment and QR Code size need to be considered. Level `Q` or `H` may be selected for factory environment where QR Code get dirty, whereas Level `L` may be selected for a clean environment with the large amount of data. Typically, level `M` (15%) is most frequently selected.

- Level `L` Approx 7%
- Level `M` Approx 15% (default value)
- Level `Q` Approx 25%
- Level `H` Approx 30%

| Property name          | Type                       | Default value |
| ---------------------- | -------------------------- | ------------- |
| `errorCorrectionLevel` | `'L'`, `'M'`, `'Q'`, `'H'` | `'M'`         |

```svelte
<QRCode data="https://duxreserve.com" errorCorrectionLevel="L" />

<QRCode data="https://duxreserve.com" errorCorrectionLevel="M" />

<QRCode data="https://duxreserve.com" errorCorrectionLevel="Q" />

<QRCode data="https://duxreserve.com" errorCorrectionLevel="H" />
```

### Colors

You can customize the colors of the QR code using hexadecimal color codes or [CSS color keywords](https://www.w3.org/wiki/CSS/Properties/color/keywords) such as `'transparent'` and `'red'`.

| Property name       | Type     | Default value                        | Note                                                                                                |
| ------------------- | -------- | ------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `backgroundColor`   | `string` | `'#ffffff'`                          |                                                                                                     |
| `color`             | `string` | `'#000000'`                          | Will be apply to `modulesColor`,`anchorsOuterColor` and `anchorsInnerColor` if they are not defined |
| `modulesColor`      | `string` | Same as `color` property             |                                                                                                     |
| `anchorsOuterColor` | `string` | Same as `modulesColor` property      |                                                                                                     |
| `anchorsInnerColor` | `string` | Same as `anchorsOuterColor` property |                                                                                                     |

```svelte
<QRCode data="https://duxreserve.com" backgroundColor="#009900" color="#ffffff" />

<QRCode data="https://duxreserve.com" backgroundColor="black" modulesColor="#ffffff" anchorsOuterColor="red" anchorsInnerColor="#00ff00" />
```

![Alt text](https://github.com/Castlenine/svelte-qrcode/blob/master/readme/sample-colors-1.svg?sanitize=true)

![Alt text](https://github.com/Castlenine/svelte-qrcode/blob/master/readme/sample-colors-2.svg?sanitize=true)

### Shape

You have two options to customize the QR code shape: `'square'` and `'circle'`.

Set the `haveBackgroundRoundedEdges` property to `true` to round the edges of the QR code background.

Set the `haveGappedModules` property to `true` to create gaps between the modules.

| Property name                | Type                   | Default value |
| ---------------------------- | ---------------------- | ------------- |
| `shape`                      | `'square'`, `'circle'` | `'square'`    |
| `haveBackgroundRoundedEdges` | `boolean`              | `false`       |
| `haveGappedModules`          | `boolean`              | `false`       |

```svelte
<!-- No need to set the shape for `square` (default value) -->
<QRCode data="https://duxreserve.com" />

<QRCode data="https://duxreserve.com" shape="circle" />

<QRCode data="https://duxreserve.com" haveBackgroundRoundedEdges />

<QRCode data="https://duxreserve.com" haveGappedModules />
```

![Alt text](https://github.com/Castlenine/svelte-qrcode/blob/master/readme/sample-square.svg?sanitize=true)

![Alt text](https://github.com/Castlenine/svelte-qrcode/blob/master/readme/sample-circle.svg?sanitize=true)

![Alt text](https://github.com/Castlenine/svelte-qrcode/blob/master/readme/sample-rounded-edge.svg?sanitize=true)

![Alt text](https://github.com/Castlenine/svelte-qrcode/blob/master/readme/sample-gapped-modules.svg?sanitize=true)

### Join in unique SVG element

If `isJoin` is set to `true`, the QR code will be generated as a single SVG element. If set to `false`, each square will be an individual SVG element.

The `isJoin` property is useful for performance optimization, especially when generating a large number of QR codes. However, the colors of the anchors and modules will not differ, and the shape can only be `'square'` when `isJoin` is set to `true`.

**Note:** Most of the cases, you don't need to set this property to `true`.

| Property name | Type      | Default value |
| ------------- | --------- | ------------- |
| `isJoin`      | `boolean` | `false`       |

```svelte
<QRCode data="https://duxreserve.com" isJoin />
```

### Responsive

If `isResponsive` set to `true`, the QR code will be responsive and adapt to the available space in its parent element.

| Property name  | Type      | Default value |
| -------------- | --------- | ------------- |
| `isResponsive` | `boolean` | `false`       |

```svelte
<div style="width: 30%; height: 30%;">
  <QRCode data="https://duxreserve.com" isResponsive />
</div>
```

### QR Code size

You can adjust the padding and size of the QR code. Increasing the size enhances the ease of scanning.

The `padding` is measured in "module units", while the `size`, `width` and `height` are in pixels.

**Note:** It's recommended to use a square-like QR code if you prefer different `width` and `height` values. Test the QR code with different sizes to ensure it is scannable.

| Property name | Type                   | Default value           | Note                                                          |
| ------------- | ---------------------- | ----------------------- | ------------------------------------------------------------- |
| `padding`     | `number` (module unit) | `1` "module unit"       | 1 padding  = 1 module unit                                    |
| `size`        | `number` (pixel)       | `256` pixels            | Will be apply to `width` and `height` if they are not defined |
| `width`       | `number` (pixel)       | Same as `size` property |                                                               |
| `height`      | `number` (pixel)       | Same as `size` property |                                                               |

```svelte
<QRCode data="https://duxreserve.com" padding={5} size={1000} />

<QRCode data="https://duxreserve.com" padding={5} width={1000} height={800} />
```

### Centered logo

You can add a logo to the center of the QR code; it will be automatically scaled to fit and inserted in the generated SVG.

If you don't set `logoInBase64` or `logoPath`, the logo will not be displayed. You can use either `logoPath` or `logoInBase64` to specify the logo image. Use `logoInBase64` instead of `logoPath` for faster logo loading times. If you use `logoInBase64`, the `logoPath` property will be ignored. There is no validation of the base64 encoding for `logoInBase64`; ensure it is valid.

`logoPath` can be either a local path or a URL. Typically, the logo file is located in the static folder. If the path is incorrect or undefined, the logo will not be displayed. It uses the Fetch API to load the image; therefore, if the URL is external, it must be CORS-enabled. There may be a slight delay in loading the image when using `logoPath`. You can set `waitForLogo` to `true` to ensure the logo loads before the QR code is rendered.

If you don't set `logoBackgroundColor`, the logo will have the same background color as the QR code.

**Note:** There is no validation of the base64 encoding for `logoInBase64`; ensure it is valid.

| Property name         | Type                    | Default value                                         | Note                                                                  |
| --------------------- | ----------------------- | ----------------------------------------------------- | --------------------------------------------------------------------- |
| `logoInBase64`        | base64 (image) `string` | `''` (no logo)                                        |                                                                       |
| `logoPath`            | `string`                | `''` (no logo)                                        |                                                                       |
| `logoBackgroundColor` | `string`                | `''` (same as the QR Code `backgroundColor` property) |                                                                       |
| `logoPadding`         | `number` (module unit)  | `1` "module unit"                                     | 1 logoPadding  = 1 module unit                                        |
| `logoSize`            | `number` (pixel)        | `15`% of the QR code `size` property                  | Will be apply to `logoWidth` and `logoHeight` if they are not defined |
| `logoWidth`           | `number` (pixel)        | Same as `logoSize` property                           |                                                                       |
| `logoHeight`          | `number` (pixel)        | Same as `logoSize` property                           |                                                                       |
| `waitForLogo`         | `boolean`               | `false`                                               |                                                                       |

```svelte
<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.svg" />

<!-- External URL -->
<QRCode data="https://duxreserve.com" logoPath="https://upload.wikimedia.org/wikipedia/commons/a/a8/Lightning_bolt_simple.png" />

<!-- WaitForLogo -->
<QRCode data="https://duxreserve.com" logoPath="https://upload.wikimedia.org/wikipedia/commons/a/a8/Lightning_bolt_simple.png" waitForLogo />

<!-- logoInBase64 -->
<QRCode data="https://duxreserve.com" logoInBase64="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im0xOC40OTYgMTAuNzA5bC04LjYzNiA4Ljg4Yy0uMjQuMjQ2LS42MzgtLjAzOS0uNDgyLS4zNDVsMy4wNzQtNi4wNjZhLjMuMyAwIDAgMC0uMjY4LS40MzZINS43MThhLjMuMyAwIDAgMS0uMjE0LS41MWw4LjAxLTguMTE1Yy4yMzItLjIzNS42MTguMDIzLjQ4OS4zMjhMMTEuNzA2IDkuODZhLjMuMyAwIDAgMCAuMjguNDE3bDYuMjkxLS4wNzhhLjMuMyAwIDAgMSAuMjIuNTA5Ii8+PC9zdmc+" />

<!-- logo background color -->
<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.svg" logoBackgroundColor="#ff0000" />

<!-- logo padding -->
<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.svg" logoPadding={2} />

<!-- logo size -->
<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.svg" logoSize={20} />

<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.svg" logoWidth={20} logoHeigh={15} />
```

![Alt text](https://github.com/Castlenine/svelte-qrcode/blob/master/readme/sample-logo.svg?sanitize=true)

### Downloading the QR Code

You can download the QR code as a file (`'svg'` | `'png'` | `'jpg'` | `'jpeg'` | `'webp'`) by using an anchor tag that initiates the download. To enable this functionality, set the `dispatchDownloadUrl` property to `true` and listen for the `downloadUrlGenerated` event to retrieve the download URL. You can choose the file format by setting the `downloadUrlFileFormat` property to `'svg'` (default), `'png'`, `'jpg'`, `'jpeg'`, or `'webp'`.

Add the `download` attribute to the anchor tag to specify the filename for the downloaded file. The extension is optional in the file name; the file format will be determined by the `downloadUrlFileFormat` property.

Additionally, include the `target="_blank"` attribute in the anchor tag to open the download in a new tab.

**Note:** You cannot use the `downloadUrlFileFormat` other than `'svg'` in a non-browser environment.

| Property name           | Type                                          | Default value |
| ----------------------- | --------------------------------------------- | ------------- |
| `dispatchDownloadUrl`   | `boolean`                                     | `false`       |
| `downloadUrlFileFormat` | `'svg'`, `'png'`, `'jpg'`, `'jpeg'`, `'webp'` | `'svg'`       |

```svelte
<script>
  import QRCode from '@castlenine/svelte-qrcode';

  let downloadUrl = '';

  const handleDownloadUrlGenerated = (url = '') => {
    downloadUrl = url;
  };
</script>

<div>
  <QRCode
    data="https://duxreserve.com"
    logoPath="/logo/lightning.svg"
    downloadUrlFileFormat="png"
    dispatchDownloadUrl
    on:downloadUrlGenerated={(event) => handleDownloadUrlGenerated(event.detail.url)}
  />
</div>


{#if downloadUrl}
  <a href={downloadUrl} download="QR-code-filename.png" target="_blank">Download QR Code</a>
{/if}
```

### Other events

You can listen for the following events:

- `qrCodeGenerated`: The QR Code is successfully generated
- `qrCodeRegeneratedWithLogo`: The QR Code is successfully regenerated with the logo
- `qrCodeGenerationFailed`: The QR Code generation failed. The error message can be retrieved via `event.detail`. Check the console for more information

```svelte
<QRCode
  data="https://duxreserve.com"
  on:qrCodeGenerated={handleQrCodeGenerated}
  on:qrCodeRegeneratedWithLogo={handleQrCodeRegeneratedWithLogo}
  on:qrCodeGenerationFailed={handleQrCodeGenerationFailed}
/>
```

### Time-based one-time passwords (TOTP)

Sample URL for a John Doe user on the Acme app:

```svelte
<QRCode data="otpauth://totp/ACME%20Co:john.doe@email.com?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ&issuer=ACME%20Co&algorithm=SHA1&digits=6&period=30" />
```

![Alt text](https://github.com/Castlenine/svelte-qrcode/blob/master/readme/sample-totp.svg?sanitize=true)

[npm]: https://www.npmjs.com/package/@castlenine/svelte-qrcode
[npm.badge]: https://img.shields.io/npm/v/@castlenine/svelte-qrcode
[download]: https://www.npmjs.com/package/@castlenine/svelte-qrcode
[download.badge]: https://img.shields.io/npm/d18m/@castlenine/svelte-qrcode
[repl]: https://svelte.dev/repl/3e0c8ebeb0c74d7098a1e939800456c2?version=4.2.15
[repl.badge]: https://img.shields.io/static/v1?label=&message=Svelte+REPL&logo=svelte&logoColor=fff&color=ff3e00
[contribution]: https://github.com/Castlenine/svelte-qrcode
[contribution.badge]: https://img.shields.io/badge/contributions-welcome-green
