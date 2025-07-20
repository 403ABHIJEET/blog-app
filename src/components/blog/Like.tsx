import { EmptyHeartSvg } from "@/util/svgs";
import { Button } from "../ui/button";

export default function Like() {

    

    return (
        <Button
            variant="ghost"
            className="p-0 m-0 hover:bg-gray-300 bg-none rounded-4xl"
        >
            {/* <FilledHeartSvg /> */}
            <EmptyHeartSvg /> <span className="text-black">{100}</span>
        </Button>
    );
}
