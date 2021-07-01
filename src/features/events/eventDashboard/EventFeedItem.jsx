import { Link } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";

export default function EventFeedItem({ post }) {
  let summary;
  switch (post.code) {
    case "joined-event":
      summary = (
        <>
          has signed up to{" "}
          <Link to={`/events/${post.eventId}`}>{post.title}</Link>
        </>
      );
      break;
    case "left-event":
      summary = (
        <>
          has cancelled their place on{" "}
          <Link to={`/events/${post.eventId}`}>{post.title}</Link>
        </>
      );
      break;
    default:
      summary = "dit stuk tekst zien we nooit";
      break;
  }
  return (
    <li className='py-4'>
      <div className='flex space-x-3'>
        <img
          className='h-6 w-6 rounded-full'
          src={post.photoURL || "/assets/user.png"}
          alt=''
        />
        <div className='flex-1 space-y-1'>
          <div className='flex items-center justify-between'>
            <h3 className='text-sm font-medium'>
              {<Link to={`/profile/${post.userUid}`}>{post.displayName} </Link>}
            </h3>
            <p className='text-sm text-gray-500'>
              {formatDistanceToNowStrict(new Date(post.date))}
            </p>
          </div>
          <p className='text-sm text-gray-500'>{summary}</p>
        </div>
      </div>
    </li>
  );
}
