export function copyData(dst: any, src: any): void {
	if (
		typeof dst !== "object" ||
		typeof src !== "object" ||
		dst === null ||
		src === null
	) {
		return;
	}

	for (const key of Object.keys(src)) {
		if (
			typeof src[key] === "object" &&
			src[key] !== null &&
			typeof dst[key] === "object" &&
			dst[key] !== null
		) {
			copyData(dst[key], src[key]);
		} else {
			dst[key] = src[key];
		}
	}
}
