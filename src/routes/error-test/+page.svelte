<script lang="ts">
	import { QRCode } from '$lib/index';

	let errorMessage = 'No error detected. If this message is not replaced, then errors are not reported';

	function onQrCodeGenerationFailed(message: string) {
		errorMessage = `Got an error while attempting to generate the content: ${message}`;
	}
</script>

<QRCode data={' '.repeat(10000)} on:qrCodeGenerationFailed={(event) => onQrCodeGenerationFailed(event.detail)} />

<p>{errorMessage}</p>
