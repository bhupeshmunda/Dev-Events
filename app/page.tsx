import EventCard from "@/components/EventCard"
import ExploreButton from "@/components/ExploreButton"
import {events} from "@/lib/constants.ts"

function Page() {

  return (
    <section className="text-center">
      <h1 className="text-center">The Hub for Every Dev <br /> Event You Can't Miss</h1>
      <p className="text-center mt-5">Hackathon, Meetups, and Conferences, All in one Place</p>

      <ExploreButton/>

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {events.map((event) => (
            <li key={event.title}>
              <EventCard {...event}/>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Page
