import Link from "next/link";
import { Button } from "../component/ui/button";
import { CreationSubmit } from "./SubmitButtons";




export function CreationBottomBar() {
    return (
         <div className="fixed w-full bottom-0 z-10 bg-white border-t h-24">
                <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
                    <Button className="bg-[#ff385d] text-white border-2 border-[#ff385d] hover:bg-white hover:text-[#ff385d] transition-colors cursor-pointer" asChild>
                        <Link href='/'>Cancel</Link>
                    </Button>
                     <CreationSubmit />
                </div>
            </div>
    )
}