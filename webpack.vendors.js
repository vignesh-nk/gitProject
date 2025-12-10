module.exports = {
	output: 'dist',
	entry: {
		keenicons: [
			{
				src: ['src/assets/vendors/keenicons/**/style.css'], // Updated path
				dist: '/assets/vendors/keenicons/styles.bundle.css', // Updated dist
				bundle: true,
			},
			{
				src: [
					'src/assets/vendors/keenicons/duotone/fonts', // Updated path
					'src/assets/vendors/keenicons/filled/fonts', // Updated path
					'src/assets/vendors/keenicons/outline/fonts', // Updated path
					'src/assets/vendors/keenicons/solid/fonts', // Updated path
				],
				dist: '/assets/vendors/keenicons/fonts', // Updated dist
			},
		],
		apexcharts: [
			{
				src: ['node_modules/apexcharts/dist/apexcharts.css'],
				dist: '/assets/vendors/apexcharts/apexcharts.css', // Updated dist
			},
			{
				src: ['node_modules/apexcharts/dist/apexcharts.min.js'],
				dist: '/assets/vendors/apexcharts/apexcharts.min.js', // Updated dist
			},
		],
		prismjs: [
			{
				src: [
					'node_modules/prismjs/prism.js',
					'node_modules/prismjs/components/prism-markup.js',
					'node_modules/prismjs/components/prism-markup-templating.js',
					'node_modules/prismjs/components/prism-bash.js',
					'node_modules/prismjs/components/prism-javascript.js',
					'node_modules/prismjs/components/prism-css.js',
					'node_modules/prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js',
					'src/assets/vendors/prismjs/prismjs.init.js', // Updated path
				],
				dist: '/assets/vendors/prismjs/prismjs.min.js', // Updated dist
				bundle: true,
			},
		],
		clipboard: [
			{
				src: ['node_modules/clipboard/dist/clipboard.min.js'],
				dist: '/assets/vendors/clipboard/clipboard.min.js', // Updated dist
			},
		],
		ktui: [
			{
				src: ['node_modules/@keenthemes/ktui/dist/ktui.min.js'],
				dist: '/assets/vendors/ktui/ktui.min.js', // Updated dist
			},
		],
		toastr: [
            {
                src: ["node_modules/toastr/build/toastr.min.css"],
                dist: "/assets/vendors/toastr/toastr.css"
            },
            {
                src: ["node_modules/toastr/build/toastr.min.js"],
                dist: "/assets/vendors/toastr/toastr.js"
            }
        ],
		jquery: [
			{
				src: ["node_modules/jquery/dist/jquery.min.js"],
				dist: "/assets/vendors/jquery/jquery.min.js"
			}
		],
	},
};
