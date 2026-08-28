import Image from "next/image"
import { notFound } from "next/navigation"
import { events } from "@/lib/constants"

export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params
  const event = events.find((item) => item.slug === slug)

  if (!event) {
    notFound()
  }

  return (
    <section id="event">
      <div className="header">
        <h2>{event.title}</h2>
        <div className="flex flex-row flex-wrap items-center gap-4">
          <div className="flex flex-row gap-2">
            <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
            <p>{event.location}</p>
          </div>
          <div className="flex flex-row gap-2">
            <Image src="/icons/calendar.svg" alt="date" width={14} height={14} />
            <p>{event.date}</p>
          </div>
          <div className="flex flex-row gap-2">
            <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
            <p>{event.time}</p>
          </div>
        </div>
      </div>

      <div className="details">
        <div className="content">
          <Image
            src={event.image}
            alt={event.title}
            width={900}
            height={457}
            className="banner"
          />
        </div>
      </div>
    </section>
  )
}
