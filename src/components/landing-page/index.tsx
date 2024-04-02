import LaurelRatings from "../shared/laurel-ratings";
import PayingUsersAvatar from "../shared/paying-users-avatars";

const LandingPage = () => {
  return (
    <div className="space-y-3.5">
      <LaurelRatings />
      <h1 className="text-5xl font-bold">
        Go nomad and work remotely around the world
      </h1>
      <h3 className="font-medium">
        Join the #1 global community of 33,276 remote workers living and
        traveling around the world since 2014
      </h3>
      <PayingUsersAvatar />
      <div className="space-y-2 text-lg">
        <p>🍹 <u>Attend 416 meetups/year</u> in 100+ cities</p>
        <p>❤️ <u>Meet new people</u> for dating or making friends</p>
        <p>🧪 <u>Research destinations</u> and find your best place to live</p>
        <p>🌎 <u>Keep track of your travels</u> and record where you've been</p>
        <p>💬 <u>Join Nomad List chat</u> and find your community on the road</p>
      </div>
    </div>
  );
};

export default LandingPage;
