<script lang="ts">
	import { QRCode } from '$lib/index';

	let downloadUrl = '';
	let downloadUrlResponsive = '';
	let downloadUrlJoin = '';

	let downloadUrlCustomColor = '';

	let downloadUrlDirectBase64 = '';

	let downloadUrlPng = '';
	let downloadUrlJpg = '';
	let downloadUrlJpeg = '';
	let downloadUrlWebp = '';

	const handleDownloadUrlGenerated = (url = '') => {
		downloadUrl = url;
	};

	const handleDownloadUrlResponsiveGenerated = (url = '') => {
		downloadUrlResponsive = url;
	};

	const handleDownloadUrlGeneratedJoin = (url = '') => {
		downloadUrlJoin = url;
	};

	const handleDownloadUrlGeneratedCustomColor = (url = '') => {
		downloadUrlCustomColor = url;
	};

	const handleDownloadUrlGeneratedForDirectBase64 = (url = '') => {
		downloadUrlDirectBase64 = url;
	};

	const handleDownloadUrlGeneratedPng = (url = '') => {
		downloadUrlPng = url;
	};

	const handleDownloadUrlGeneratedJpg = (url = '') => {
		downloadUrlJpg = url;
	};

	const handleDownloadUrlGeneratedJpeg = (url = '') => {
		downloadUrlJpeg = url;
	};

	const handleDownloadUrlGeneratedWebp = (url = '') => {
		downloadUrlWebp = url;
	};
</script>

<svelte:head>
	<title>Test QRCode component</title>
</svelte:head>

<h1>Standard QR Code</h1>
<QRCode data="Hello world!" />

<div>
	<QRCode data="This is a test" />

	<QRCode data="https://duxreserve.com" />

	<QRCode data="https://duxreserve.com?lang=fr" />

	<!-- Long data -->
	<QRCode
		data="Bitcoin. A purely P2P version of electronic cash would allow online payments to be sent directly from one party to another without going through a financial institution. Digital signatures provide part of the solution, but the main benefits are lost if a trusted third party is still required to prevent double-spending. We propose a solution to the double-spending problem using a peer-to-peer network. The network timestamps transactions by hashing them into an ongoing chain of hash-based proof-of-work, forming a record that cannot be changed without redoing the proof-of-work. The longest chain not only serves as proof of the sequence of events witnessed, but proof that it came from the largest pool of CPU power. As long as a majority of CPU power is controlled by nodes that are not cooperating to attack the network, they'll generate the longest chain and outpace attackers. The network itself requires minimal structure. Messages are broadcast on a best effort basis, and nodes can leave and rejoin the network at will, accepting the longest proof-of-work chain as proof of what happened while they were gone. 1. Introduction Commerce on the Internet has come to rely almost exclusively on financial institutions serving as trusted third parties to process electronic payments. While the system works well enough for most transactions, it still suffers from the inherent weaknesses of the trust based model. Completely non-reversible transactions are not really possible, since financial institutions cannot avoid mediating disputes. The cost of mediation increases transaction costs, limiting the minimum practical transaction size and cutting off the possibility for small casual transactions, and there is a broader cost in the loss of ability to make non-reversible payments for non-reversible services. With the possibility of reversal, the need for trust spreads. Merchants must be wary of their customers, hassling them for more information than they would otherwise need. A certain percentage of fraud is accepted as unavoidable. These costs and payment uncertainties can be avoided in person by using physical currency, but no mechanism exists to make payments over a communications channel without a trusted party. What is needed is an electronic payment system based on cryptographic proof instead of trust."
	/>
</div>

<h1>Bitcoin address</h1>

<strong>Not mine, just random address for testing purposes</strong>

<div>
	<!-- Genesis block address: -->
	<QRCode data="bitcoin:04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f" />

	<!-- 4th halving address: -->
	<QRCode data="bitcoin:18cBEMRxXHqzWWCxZNtU91F5sbUNKhL5PX" />

	<QRCode data="bitcoin:bc1qmhcxtwkcmkqlpajmd09ygzxwwujql74vdpzwd5" />

	<QRCode data="bitcoin:bc1qmhcxtwkcmkqlpajmd09ygzxwwujql74vdpzwd5" typeNumber={4} />

	<QRCode data="bitcoin:bc1qmhcxtwkcmkqlpajmd09ygzxwwujql74vdpzwd5" errorCorrectionLevel="H" />

	<QRCode data="bitcoin:bc1qmhcxtwkcmkqlpajmd09ygzxwwujql74vdpzwd5" typeNumber={4} errorCorrectionLevel="H" />
</div>

<h2>Default not join vs join</h2>
<div>
	<QRCode data="https://duxreserve.com" />
	<QRCode data="https://duxreserve.com" isJoin />
	<QRCode data="https://duxreserve.com" isJoin haveGappedModules />
</div>

<h2>Size 50 to 200</h2>
<div>
	<QRCode data="https://duxreserve.com" size={50} />
	<QRCode data="https://duxreserve.com" size={100} />
	<QRCode data="https://duxreserve.com" size={150} />
	<QRCode data="https://duxreserve.com" size={200} />
</div>

<h2>Size with different width and height</h2>
<div>
	<!-- This one may not work for QR scanning -->
	<QRCode data="https://duxreserve.com" width={100} />
	<QRCode data="https://duxreserve.com" width={100} height={150} />
	<QRCode data="https://duxreserve.com" width={150} height={150} />
</div>

<h2>Padding 0 to 20</h2>
<div>
	<QRCode data="https://duxreserve.com" padding={0} />
	<QRCode data="https://duxreserve.com" padding={5} />
	<QRCode data="https://duxreserve.com" padding={10} />
	<QRCode data="https://duxreserve.com" padding={20} />
</div>

<h2>Colors</h2>
<div>
	<QRCode data="https://duxreserve.com" color="#990000" />
	<QRCode data="https://duxreserve.com" color="#009900" />
	<QRCode data="https://duxreserve.com" backgroundColor="#009900" color="#ffffff" />

	<QRCode data="https://duxreserve.com" backgroundColor="#000000" color="#ffffff" />

	<QRCode data="https://duxreserve.com" anchorsOuterColor="#00ff00" anchorsInnerColor="blue" />

	<QRCode data="https://duxreserve.com" backgroundColor="yellow" modulesColor="red" anchorsInnerColor="green" />

	<QRCode data="https://duxreserve.com" backgroundColor="yellow" modulesColor="red" anchorsInnerColor="green" shape="circle" />

	<QRCode data="https://duxreserve.com" backgroundColor="yellow" modulesColor="red" anchorsInnerColor="green" shape="circle" haveBackgroundRoundedEdges />
</div>

<h2>Shape</h2>
<div style="display: flex; flex-direction: column;">
	<div style="display: flex; gap: 32px;">
		<div>
			<QRCode data="https://duxreserve.com" shape="square" />
			<p>square (default)</p>
		</div>
		<div>
			<QRCode data="https://duxreserve.com" shape="circle" />
			<p>circle</p>
		</div>
	</div>
	<div style="display: flex; gap: 32px;">
		<div>
			<QRCode data="https://duxreserve.com" backgroundColor="#0000FF" color="#ffffff" shape="square" haveBackgroundRoundedEdges />
			<p>square (default) with haveBackgroundRoundedEdges</p>
		</div>
		<div>
			<QRCode data="https://duxreserve.com" backgroundColor="#000000" color="#ffffff" shape="circle" haveBackgroundRoundedEdges />
			<p>circle with haveBackgroundRoundedEdges</p>
		</div>
	</div>
	<div style="display: flex; gap: 32px;">
		<div>
			<QRCode data="https://duxreserve.com" shape="square" haveGappedModules />
			<p>square (default) with haveGappedModules</p>
		</div>
		<div>
			<QRCode data="https://duxreserve.com" shape="circle" haveGappedModules />
			<p>circle with haveGappedModules</p>
		</div>
	</div>
</div>

<h2>Error correction L, M, Q, and H</h2>
<div>
	<QRCode data="https://duxreserve.com" errorCorrectionLevel="L" />
	<QRCode data="https://duxreserve.com" errorCorrectionLevel="M" />
	<QRCode data="https://duxreserve.com" errorCorrectionLevel="Q" />
	<QRCode data="https://duxreserve.com" errorCorrectionLevel="H" />
</div>

<h2>Responsive</h2>
<div style="width: 30%; height: 30%;">
	<QRCode data="https://duxreserve.com" isResponsive />
</div>

<h2>With logo</h2>
<div>
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.svg" />
</div>

<div>
	<!-- Works without the first slash -->
	<QRCode data="https://duxreserve.com" logoPath="logo/lightning.svg" logoBackgroundColor="#009900" />
</div>

<div>
	<!-- 1 logoPadding  = 1 module -->
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.svg" logoBackgroundColor="#009900" logoPadding={0} />
</div>

<div>
	<!-- 1 logoPadding  = 1 module -->
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.svg" logoBackgroundColor="#009900" logoPadding={2} />
</div>

<div>
	<!-- You can set decimal logoSize  -->
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.svg" logoBackgroundColor="#009900" logoSize={22.1} />
</div>

<p>Logo width & height</p>
<div>
	<!-- You can set a different logoWidth and LogoHeight  -->
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.svg" logoBackgroundColor="#009900" logoWidth={20} logoHeight={30} />

	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.svg" logoBackgroundColor="#009900" width={256} height={200} logoWidth={20} logoHeight={30} />
</div>

<div>
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.svg" logoBackgroundColor="transparent" logoSize={20} />
</div>

<div>
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.png" />
</div>

<div>
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.jpeg" />
</div>

<div>
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.webp" />
</div>

<div>
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.gif" />
</div>

<p>Wait for logo</p>

<div style="min-width: 260px; min-height: 260px;">
	<!-- Set the min-width and min-height to prevent the element from resizing when the logo is loaded -->
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning.gif" waitForLogo />
</div>

<p>Direct base64 encoded image</p>
<div>
	<QRCode
		data="https://duxreserve.com"
		logoInBase64="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im0xOC40OTYgMTAuNzA5bC04LjYzNiA4Ljg4Yy0uMjQuMjQ2LS42MzgtLjAzOS0uNDgyLS4zNDVsMy4wNzQtNi4wNjZhLjMuMyAwIDAgMC0uMjY4LS40MzZINS43MThhLjMuMyAwIDAgMS0uMjE0LS41MWw4LjAxLTguMTE1Yy4yMzItLjIzNS42MTguMDIzLjQ4OS4zMjhMMTEuNzA2IDkuODZhLjMuMyAwIDAgMCAuMjguNDE3bDYuMjkxLS4wNzhhLjMuMyAwIDAgMSAuMjIuNTA5Ii8+PC9zdmc+"
		logoBackgroundColor="#eeff00"
	/>
</div>

<p>Direct base64 encoded image with wait for logo (should be ignored)</p>
<div>
	<QRCode
		data="https://duxreserve.com"
		logoInBase64="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im0xOC40OTYgMTAuNzA5bC04LjYzNiA4Ljg4Yy0uMjQuMjQ2LS42MzgtLjAzOS0uNDgyLS4zNDVsMy4wNzQtNi4wNjZhLjMuMyAwIDAgMC0uMjY4LS40MzZINS43MThhLjMuMyAwIDAgMS0uMjE0LS41MWw4LjAxLTguMTE1Yy4yMzItLjIzNS42MTguMDIzLjQ4OS4zMjhMMTEuNzA2IDkuODZhLjMuMyAwIDAgMCAuMjguNDE3bDYuMjkxLS4wNzhhLjMuMyAwIDAgMSAuMjIuNTA5Ii8+PC9zdmc+"
		logoBackgroundColor="#eeff00"
		waitForLogo
	/>
</div>

<p>External URL</p>
<div>
	<QRCode
		data="https://duxreserve.com"
		logoPath="https://upload.wikimedia.org/wikipedia/commons/a/a8/Lightning_bolt_simple.png"
		logoBackgroundColor="#009900"
	/>
</div>

<p>Incorrect path (no logo)</p>
<div>
	<QRCode data="https://duxreserve.com" logoPath="/logo/lightning/image.png" />
</div>

<h2>With download url generated</h2>
<div>
	<QRCode
		data="https://duxreserve.com"
		logoPath="/logo/lightning.svg"
		dispatchDownloadUrl
		on:downloadUrlGenerated={(event) => handleDownloadUrlGenerated(event.detail.url)}
	/>
</div>

{#if downloadUrl}
	<a href={downloadUrl} download="QR-code-filename" target="_blank">Download QR Code</a>
{/if}

<h2>With download url generated with responsive</h2>
<div>
	<QRCode
		data="https://duxreserve.com"
		logoPath="/logo/lightning.svg"
		dispatchDownloadUrl
		isResponsive
		on:downloadUrlGenerated={(event) => handleDownloadUrlResponsiveGenerated(event.detail.url)}
	/>
</div>

{#if downloadUrlResponsive}
	<a href={downloadUrlResponsive} download="QR-code-filename" target="_blank">Download QR Code</a>
{/if}

<h2>With download url generated for join</h2>
<div>
	<QRCode
		data="https://duxreserve.com"
		logoPath="/logo/lightning.svg"
		isJoin
		dispatchDownloadUrl
		on:downloadUrlGenerated={(event) => handleDownloadUrlGeneratedJoin(event.detail.url)}
	/>
</div>

{#if downloadUrlJoin}
	<a href={downloadUrlJoin} download="QR-code-filename-not-join" target="_blank">Download QR Code join</a>
{/if}

<h2>With download url generated for custom color</h2>
<div>
	<QRCode
		data="https://duxreserve.com"
		backgroundColor="yellow"
		modulesColor="red"
		anchorsOuterColor="green"
		anchorsInnerColor="orange"
		logoPath="/logo/lightning.svg"
		logoBackgroundColor="blue"
		haveGappedModules
		dispatchDownloadUrl
		on:downloadUrlGenerated={(event) => handleDownloadUrlGeneratedCustomColor(event.detail.url)}
	/>
</div>

{#if downloadUrlCustomColor}
	<a href={downloadUrlCustomColor} download="QR-code-filename-not-join" target="_blank">Download QR Code custom color</a>
{/if}

<p>Direct base64 encoded image</p>
<div>
	<QRCode
		data="https://duxreserve.com"
		logoInBase64="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im0xOC40OTYgMTAuNzA5bC04LjYzNiA4Ljg4Yy0uMjQuMjQ2LS42MzgtLjAzOS0uNDgyLS4zNDVsMy4wNzQtNi4wNjZhLjMuMyAwIDAgMC0uMjY4LS40MzZINS43MThhLjMuMyAwIDAgMS0uMjE0LS41MWw4LjAxLTguMTE1Yy4yMzItLjIzNS42MTguMDIzLjQ4OS4zMjhMMTEuNzA2IDkuODZhLjMuMyAwIDAgMCAuMjguNDE3bDYuMjkxLS4wNzhhLjMuMyAwIDAgMSAuMjIuNTA5Ii8+PC9zdmc+"
		logoBackgroundColor="#eeff00"
		dispatchDownloadUrl
		on:downloadUrlGenerated={(event) => handleDownloadUrlGeneratedForDirectBase64(event.detail.url)}
	/>
</div>

{#if downloadUrl}
	<a href={downloadUrlDirectBase64} download="QR-code-filename-direct-base64" target="_blank">Download QR Code</a>
{/if}

<p>With download url generated for PNG</p>
<div>
	<QRCode
		data="https://duxreserve.com"
		logoPath="/logo/lightning.svg"
		dispatchDownloadUrl
		downloadUrlFileFormat="png"
		on:downloadUrlGenerated={(event) => handleDownloadUrlGeneratedPng(event.detail.url)}
	/>
</div>

{#if downloadUrlPng}
	<a href={downloadUrlPng} download="QR-code-filename-png" target="_blank">Download QR Code in png format</a>
{/if}

<p>With download url generated for JPG</p>
<div>
	<QRCode
		data="https://duxreserve.com"
		logoPath="/logo/lightning.svg"
		dispatchDownloadUrl
		downloadUrlFileFormat="jpg"
		on:downloadUrlGenerated={(event) => handleDownloadUrlGeneratedJpg(event.detail.url)}
	/>
</div>

{#if downloadUrlJpg}
	<a href={downloadUrlJpg} download="QR-code-filename-jpg" target="_blank">Download QR Code in jpeg (jpg) format</a>
{/if}

<p>With download url generated for JPEG</p>
<div>
	<QRCode
		data="https://duxreserve.com"
		logoPath="/logo/lightning.svg"
		dispatchDownloadUrl
		downloadUrlFileFormat="jpeg"
		on:downloadUrlGenerated={(event) => handleDownloadUrlGeneratedJpeg(event.detail.url)}
	/>
</div>

{#if downloadUrlJpeg}
	<a href={downloadUrlJpeg} download="QR-code-filename-jpeg" target="_blank">Download QR Code in jpeg format</a>
{/if}

<p>With download url generated for WEBP</p>
<div>
	<QRCode
		data="https://duxreserve.com"
		logoPath="/logo/lightning.svg"
		dispatchDownloadUrl
		downloadUrlFileFormat="webp"
		on:downloadUrlGenerated={(event) => handleDownloadUrlGeneratedWebp(event.detail.url)}
	/>
</div>

{#if downloadUrlWebp}
	<a href={downloadUrlWebp} download="QR-code-filename-webp" target="_blank">Download QR Code in webp format</a>
{/if}

<h2>Time based one time passwords configuration sample</h2>
<div>
	<QRCode data="otpauth://totp/ACME%20Co:john.doe@email.com?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ&issuer=ACME%20Co&algorithm=SHA1&digits=6&period=30" />
</div>
