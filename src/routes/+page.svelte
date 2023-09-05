<script>
	import { QRCode } from '$lib';
</script>

<svelte:head>
	<title>Test QRCode component</title>
</svelte:head>

<h1>Standard QR Code</h1>
<QRCode content="https://duxreserve.com" />

<h2>Size 50 to 200</h2>
<div>
	<QRCode size={50} content="https://duxreserve.com" />
	<QRCode size={100} content="https://duxreserve.com" />
	<QRCode size={150} content="https://duxreserve.com" />
	<QRCode size={200} content="https://duxreserve.com" />
</div>

<h2>Padding 0 to 20</h2>
<div>
	<QRCode padding={0} content="https://duxreserve.com" />
	<QRCode padding={5} content="https://duxreserve.com" />
	<QRCode padding={10} content="https://duxreserve.com" />
	<QRCode padding={20} content="https://duxreserve.com" />
</div>

<h2>Colours and background colours</h2>
<div>
	<QRCode color="#990000" content="https://duxreserve.com" />
	<QRCode color="#009900" content="https://duxreserve.com" />
	<QRCode color="#ffffff" backgroundColor="#009900" content="https://duxreserve.com" />

	<QRCode color="#ffffff" backgroundColor="#000000" content="https://duxreserve.com" />
</div>

<h2>Error correction L, M, Q, and H</h2>
<div>
	<QRCode errorCorrection="L" content="https://duxreserve.com" />
	<QRCode errorCorrection="M" content="https://duxreserve.com" />
	<QRCode errorCorrection="Q" content="https://duxreserve.com" />
	<QRCode errorCorrection="H" content="https://duxreserve.com" />
</div>

<h2>Responsive</h2>
<div style="width:30%; height:30%;">
	<QRCode isResponsive content="https://duxreserve.com" />
</div>

<h2>Time based one time passwords configuration sample</h2>
<div>
	<QRCode content="otpauth://totp/ACME%20Co:john.doe@email.com?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ&issuer=ACME%20Co&algorithm=SHA1&digits=6&period=30" />
</div>
