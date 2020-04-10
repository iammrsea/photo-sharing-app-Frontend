export default ({ message, color, outDuration }) => {
	// eslint-disable-next-line
	M.toast({ html: message, classes: color, outDuration: outDuration ? outDuration : 375 });
};
