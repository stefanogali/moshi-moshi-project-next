import {useRouter, usePathname} from "next/navigation";
import {scrollTo} from "@/helper-functions/scrollTo";

const ScrollTo = ({toId, toRef, duration, className, children}) => {
	const router = useRouter();
	const pathname = usePathname();

	const handleClick = () => {
		if (pathname != "/") {
			router.push(`/#${toId}`);
			return;
		}

		return scrollTo({id: toId, ref: toRef, duration});
	};

	return (
		<li onClick={handleClick} className={className}>
			{children}
		</li>
	);
};

export default ScrollTo;
