<script lang="ts">
	import { QRCode } from './qrcode';
	import type { Options } from './qrcode';

	export let content = '';

	export let backgroundColor = '#ffffff';
	export let color = '#000000';
	export let errorCorrection = 'M';
	export let isResponsive = false;
	export let padding = 4;
	export let size = 150;

	const opt: Options = {
		background: backgroundColor,
		color,
		container: isResponsive ? 'svg-viewbox' : 'svg',
		content,
		ecl: errorCorrection,
		height: size,
		join: true,
		padding,
		typeNumber: 4,
		width: size,
	};

	const qrCode = new QRCode(opt);
</script>

{@html qrCode.svg()}
