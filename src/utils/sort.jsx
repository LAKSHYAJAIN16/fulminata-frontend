export function sortimber(buffer) {
    return cocktailSort(buffer);
}

export function cocktailSort(arr) {
	let start = 0, end = arr.length, swapped = true;

	while (swapped) {
		swapped = false;
		for (let i = start; i < end - 1; i++) {
			if (arr[i].imber > arr[i+1].imber) {
				let temp = arr[i];
				arr[i] = arr[i+1];
				arr[i+1] = temp;
				swapped = true;
			}
		}

		end--;
		if (!swapped)
			break;
    
		swapped = false;
		for (let i = end - 1; i > start; i--) {
			if (arr[i - 1].imber > arr[i].imber) {
				let temp = arr[i];
				arr[i] = arr[i - 1];
				arr[i - 1] = temp;
				swapped = true;
			}
		}

		start++;
	}

	return arr;
}