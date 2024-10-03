<script lang="ts">
  import { QRCode } from '$lib/index';

  let error = "No error detected. If this message is not replaced, then errors are not reported";

  function onQrCodeGenerationFailed(e) {
    console.log("Got ", e);
    error = `OK. Got an error while attempting to generate the content: ${e.detail.message}`;
  }
</script>

<QRCode
  data={" ".repeat(10000)}
  on:qrCodeGenerationFailed={onQrCodeGenerationFailed} />
{error}