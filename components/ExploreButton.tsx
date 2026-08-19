'use client'

import Image from "next/image"

function ExploreButton() {

    return (
        <button type="button" id="explore-btn" className="text-center mt-7 mx-auto border p-2 rounded-md hover:bg-transparent" onClick={() => console.log("button clicked")}><a href="#events">ExploreButtons<Image src="/icons/arrow-down.svg" alt="button" width={20} height={20}/></a></button>
    )
}

export default ExploreButton
