import { SvelteComponent } from 'svelte';

declare class QRCode extends SvelteComponent {
	constructor(options: any);

	$$prop_def: {
		content: string;

		backgroundColor?: string;
		color?: string;
		errorCorrection?: 'L' | 'M' | 'Q' | 'H';
		isResponsive: boolean;
		padding?: number;
		size?: number;
	};
}

export default QRCode;
