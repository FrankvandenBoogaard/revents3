import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./eventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";

export default function EventDetailedPage() {
  return (
    <div className='max-w-3xl mx-auto grid grid-cols-1 gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3'>
      <div className='space-y-6 lg:col-start-1 lg:col-span-2'>
        {/* Description list*/}
        <section aria-labelledby='applicant-information-title'>
          <div className='bg-white shadow sm:rounded-lg'>
            <EventDetailedHeader />
            <EventDetailedInfo />
          </div>
        </section>
        {/* Comments*/}
        <EventDetailedChat />
      </div>
      <EventDetailedSidebar />
    </div>
  );
}
