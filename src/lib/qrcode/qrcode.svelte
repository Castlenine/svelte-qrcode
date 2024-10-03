<script lang="ts">
	import type { Options } from './generate';

	import { createEventDispatcher, onMount } from 'svelte';

	import { QRCode } from './generate';

	export let data = ''; // Data of the QR code to be encoded

	export let typeNumber:
		| 0 // Auto detection
		| 1
		| 2
		| 3
		| 4
		| 5
		| 6
		| 7
		| 8
		| 9
		| 10
		| 11
		| 12
		| 13
		| 14
		| 15
		| 16
		| 17
		| 18
		| 19
		| 20
		| 21
		| 22
		| 23
		| 24
		| 25
		| 26
		| 27
		| 28
		| 29
		| 30
		| 31
		| 32
		| 33
		| 34
		| 35
		| 36
		| 37
		| 38
		| 39
		| 40 = 0; // QR code Type number (1 ~ 40), or 0 for auto detection

	export let errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H' = 'M'; // Error correction level

	export let backgroundColor = '#ffffff'; // Background color of the QR code
	export let color = '#000000'; // Modules and anchors color of the QR code. Will be applied to `modulesColor`, `anchorsOuterColor`, and `anchorsInnerColor` properties if they are not defined
	export let modulesColor = color; // Modules color of the QR code
	export let anchorsOuterColor = modulesColor; // Outer anchors color of the QR code
	export let anchorsInnerColor = anchorsOuterColor; // Inner anchors color of the QR code

	export let shape: 'square' | 'circle' = 'square'; // Shape of the QR code
	export let haveBackgroundRoundedEdges = false; // QR code background with rounded edges or not
	export let haveGappedModules = false; // QR code modules with gaps or not

	export let isJoin = false; // If set to true, the QR code will be generated as a single SVG element. If set to false, each square will be an individual SVG element
	export let isResponsive = false; // If set to true, the QR code will be responsive and adapt to the available space in its parent element

	export let padding = 1; // Padding around the QR code
	export let size = 256; // Width and height dimensions in pixels of the QR code
	export let width = size; // Width dimension in pixels of the QR code
	export let height = size; // Height dimension in pixels of the QR code

	export let logoInBase64 = ''; // base64-encoded logo image. If it's an empty string (`''`) or undefined, it will be ignored. Use this property instead of `logoPath` for faster logo loading times
	export let logoPath = ''; // If it's an empty string (`''`), no logo will be added. Otherwise, the logo will be centered on the QR code. Typically, the logo file is located in the static folder
	export let logoBackgroundColor = ''; // Color the logo background. If it's an empty string (`''`), the background color for the logo will be the same as the QR code `backgroundColor` property
	export let logoPadding = 1; // Padding around the logo
	export let logoSize = 15; // Size of the logo in percentage relative to the QR code size
	export let logoWidth = logoSize; // Width of the logo in percentage relative to the QR code width
	export let logoHeight = logoSize; // Height of the logo in percentage relative to the QR code height
	export let waitForLogo = false; // If set to true, the QR code will not render until the logo has fully loaded

	export let dispatchDownloadUrl = false; // If set to true, a download url will be generated for the QR code and dispatched to the parent component
	export let downloadUrlFileFormat: 'svg' | 'png' | 'jpg' | 'jpeg' | 'webp' = 'svg'; // The file format of the download url

	const dispatch = createEventDispatcher();

	const OPTIONS: Options = {
		data,
		typeNumber,
		errorCorrectionLevel,
		backgroundColor,
		modulesColor,
		anchorsOuterColor,
		anchorsInnerColor,
		shape,
		haveBackgroundRoundedEdges,
		haveGappedModules,
		join: isJoin,
		container: isResponsive ? 'svg-viewbox' : 'svg',
		padding,
		width,
		height,
		logoInBase64,
		logoBackgroundColor,
		logoPadding,
		logoWidth,
		logoHeight,
	};

	// If the logo is not defined, the QR code will be visible immediately
	// Otherwise, it will be visible after the logo has been loaded if `waitForLogo` is set to true or if the logo is already in base64 with `logoInBase64`
	let qrCodeIsVisible: boolean = Boolean(logoInBase64) || !waitForLogo;

	const getQrCodeSvg = (regenerationWithLogo = false): string => {
		try {
			const QR_CODE: QRCode = new QRCode(OPTIONS);

			if (regenerationWithLogo) {
				// Can be useful to know when the QR Code has been regenerated with the logo
				dispatch('qrCodeRegeneratedWithLogo');
			} else {
				// Can be useful to know when the QR Code has been generated
				dispatch('qrCodeGenerated');
			}

			return QR_CODE.svg();
		} catch (error) {
			console.error('getQrCodeSvg: Failed to generate the QR code:', error);

			dispatch('qrCodeGenerationFailed');

			return '';
		}
	};

	let qrCode: string = getQrCodeSvg();

	const convertLogoToBase64 = async (path: string): Promise<string> => {
		// Convert the logo image to base64 to be used in the QR Code
		try {
			const RESPONSE = await fetch(path);

			if (!RESPONSE.ok) {
				throw new Error('Failed to fetch the logo image');
			}

			// Get the blob directly with its original MIME type
			const LOGO_BLOB: Blob = await RESPONSE.blob();

			// Read the blob as a DataURL using FileReader
			return new Promise<string>((resolve, reject) => {
				const READER = new FileReader();

				READER.onload = () => resolve(READER.result as string);
				READER.onerror = () => reject(new Error('Failed to read the blob as base64'));
				READER.readAsDataURL(LOGO_BLOB);
			});
		} catch (error) {
			console.error('convertImageToBase64: Failed to convert logo to base64:', error);

			return '';
		}
	};

	const convertQrCodeToFileFormat = (qrCodeSvg: string): void => {
		// Create a Blob from the SVG data
		const QR_CODE_BLOB = new Blob([qrCodeSvg], { type: 'image/svg+xml' });

		const QR_CODE_URL = URL.createObjectURL(QR_CODE_BLOB);

		if (downloadUrlFileFormat === 'svg') {
			// Dispatch the download url for the SVG file without converting it
			dispatch('downloadUrlGenerated', {
				url: QR_CODE_URL,
			});
		} else {
			if (typeof document === 'undefined') {
				console.error("Cannot use the 'downloadUrlFileFormat' other than 'svg' in a non-browser environment");

				return;
			}

			// Load and convert the SVG file to the specified file format
			const IMAGE = new Image();

			IMAGE.onload = () => {
				// Create a canvas and draw the image onto it
				const CANVAS = document.createElement('canvas');

				CANVAS.width = IMAGE.width;
				CANVAS.height = IMAGE.height;

				const CTX = CANVAS.getContext('2d');

				if (CTX) {
					CTX.drawImage(IMAGE, 0, 0);

					const FILE_FORMAT =
						{
							png: 'image/png',
							jpg: 'image/jpeg',
							jpeg: 'image/jpeg',
							webp: 'image/webp',
						}[downloadUrlFileFormat] || 'image/png';

					// Convert canvas to the desired file format
					const CONVERTED_FILE_URL = CANVAS.toDataURL(FILE_FORMAT);

					dispatch('downloadUrlGenerated', {
						url: CONVERTED_FILE_URL,
					});
				}
			};

			IMAGE.onerror = () => {
				console.error('convertQrCodeToFileFormat: Error loading or converting the image');
			};

			IMAGE.src = QR_CODE_URL;
		}
	};

	onMount(async () => {
		if (!logoInBase64 && logoPath) {
			// Reload the QR Code with logo included from the logoPath
			OPTIONS.logoInBase64 = await convertLogoToBase64(logoPath);

			qrCode = getQrCodeSvg(true);
		}

		qrCodeIsVisible = true;

		if (dispatchDownloadUrl && qrCode) {
			convertQrCodeToFileFormat(qrCode);
		}
	});
</script>

<!--
@component
### QR Code Generator Component

@param data (string) Data of the QR code to be encoded. **Required to generate the QR Code**

&nbsp;

@param typeNumber (number) QR code type number (1 ~ 40), or 0 for auto detection. Default is `0`

&nbsp;

@param errorCorrectionLevel (string) Error correction level of the QR Code. Possible values: `'L'`, `'M'`, `'Q'`, `'H'`. Default is `'M'`

&nbsp;

@param backgroundColor (string) Background color of the QR code. Default is `'#ffffff'`
@param color (string) Modules and anchors color of the QR code.  Will be applied to `modulesColor`, `anchorsOuterColor`, and `anchorsInnerColor` properties if they are not defined. Default is `'#000000'`
@param modulesColor (string) Modules color of the QR code. Default is the same as the `color` property
@param anchorsOuterColor (string) Outer anchors color of the QR code. Default is the same as the `modulesColor` property
@param anchorsInnerColor (string) Inner anchors color of the QR code. Default is the same as the `anchorsOuterColor` property

&nbsp;

@param shape (string) Shape of the QR code. Possible values: `'square'`, `'circle'`. Default is `'square'`
@param haveBackgroundRoundedEdges (boolean) If set to `true`, the background of the QR code will have rounded edges. Default is `false`
@param haveGappedModules (boolean) If set to `true`, the modules of the QR code will have gaps. Default is `false`

&nbsp;

@param isJoin (boolean) // If `isJoin` is set to `true`, the QR code will be generated as a single SVG element. If set to `false`, each square will be an individual SVG element. Default is `false`
**Note:** The `isJoin` property is useful for performance optimization, especially when generating a large number of QR codes. However, the colors of the anchors and modules will not differ, and the shape can only be `'square'` when `isJoin` is set to `true`
@param isResponsive (boolean) If set to `true`, the QR code will be responsive and adapt to the available space in its parent element

&nbsp;

@param padding (number) Padding around the QR code. Default is `1`
@param size (number) Width and height dimensions in pixels of the QR code. Default is `256` pixels
@param width (number) The width of the QR Code in pixels. Default is the same as the `size` property
@param height (number) The height of the QR Code in pixels. Default is the same as the `size` property

&nbsp;

@param logoInBase64 (string) base64-encoded logo image. If it's an empty string (`''`) or undefined, it will be ignored. Use this property instead of `logoPath` for faster logo loading times.
**Note:** There is no validation of the base64 encoding; ensure it is valid. Default is `''` (no logo)
@param logoPath (string) The path to the logo file to be added to the center of the QR Code. Default is `''` (no logo).
**Note:** With the logo, it is recommended to have a minimum error correction level of `'M'` to ensure the QR Code is readable
@param logoBackgroundColor (string) Color the logo background. Default is `''` (same as the QR Code `backgroundColor` property)
@param logoPadding (number) Padding around the logo. Default is `5`
@param logoSize (number) Size of the logo in percentage relative to the QR code size. Default is `15`%
@param logoWidth (number) Width of the logo in percentage relative to the QR code width. Default is the same as the `logoSize` property
@param logoHeight (number) Height of the logo in percentage relative to the QR code height. Default is the same as the `logoSize` property
@param waitForLogo (boolean) If set to `true`, the QR code will not render until the logo has fully loaded. Default is `false`

&nbsp;

@param dispatchDownloadUrl (boolean) If set to `true`, a download url will be generated for the QR code and dispatched to the parent component. Default is `false`
@param downloadUrlFileFormat (string) The file format of the download url. Possible values: `'svg'`, `'png'`, `'jpg'`, `'jpeg'`, `'webp'`. Default is `'svg'`

&nbsp;
&nbsp;

@dispatch qrCodeGenerated (void) The QR Code is successfully generated
@dispatch qrCodeRegeneratedWithLogo (void) The QR Code is successfully regenerated with the logo
@dispatch qrCodeGenerationFailed (void) The QR Code generation failed. Check the console for more information
@dispatch downloadUrlGenerated (string) The download url for the QR Code is generated and dispatched to the parent component if the `dispatchDownloadUrl` property is set to `true`

&nbsp;

-->

{#if qrCodeIsVisible}
	{@html qrCode}
{/if}
