const characters = {
	up: [
		768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786,
		787, 788, 789, 794, 795, 829, 830, 831, 832, 833, 834, 835, 836, 838, 842, 843, 844, 848, 849,
		850, 855, 856, 859, 861, 862, 864, 865, 867, 868, 869, 870, 871, 872, 873, 874, 875, 876, 877,
		878, 879,
	],
	middle: [820, 821, 822, 823, 824],
	down: [
		790, 791, 792, 793, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810,
		811, 812, 813, 814, 815, 816, 817, 818, 819, 825, 826, 827, 828, 837, 839, 840, 841, 845, 846,
		851, 852, 853, 854, 857, 858, 860, 863, 866,
	],
}

/** @type {<Type>(arr: Type[]) => Type} */
const random = arr => arr[Math.floor(Math.random() * arr.length)]

/**
 * @param {string} text
 */
export default function zalgo(
	text,
	options = {
		up: true,
		middle: true,
		down: true,
		intensity: 1,
	}
) {
	const zalgo_chars = [
		...(options.up ? characters.up : []),
		...(options.middle ? characters.middle : []),
		...(options.down ? characters.down : []),
	]
	return Array.from(
		text,
		(/** @type {string} */ char) =>
			char +
			Array.from({ length: options.intensity }, () =>
				String.fromCharCode(random(zalgo_chars))
			).join("")
	).join("")
}
