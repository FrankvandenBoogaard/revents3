export default function EventListAttendee({ attendee }) {
  return (
    <>
      <img
        className='inline-block h-10 w-10 rounded-full ring-2 ring-white'
        src={attendee.photoURL}
        alt={attendee.name}
      />
    </>
  );
}
