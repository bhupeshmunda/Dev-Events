import Image from "next/image"

function ExploreButton() {

    return (
        <a id="explore-btn" href="#events" className="mt-7 mx-auto flex-center gap-2">
            Explore Events
            <Image src="/icons/arrow-down.svg" alt="" width={20} height={20}/>
        </a>
    )
}

export default ExploreButton
