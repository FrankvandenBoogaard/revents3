import { Link } from "react-router-dom";

export default function EventListAttendee({ attendee }) {
  return (
    <Link to={`/profile/${attendee.id}`}>
      <img
        className='inline-block h-10 w-10 rounded-full ring-2 ring-white'
        src={attendee.photoURL || '/assets/user.png'}
        alt={attendee.name}
      />
    </Link>
  );
}
