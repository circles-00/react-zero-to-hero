import discordLogo from '../assets/img/mdi_discord.png'
const { REACT_APP_DISCORD_INVITE_URL: discordInviteUrl } = process.env

const CommunityPage = () => {
  return (
    <div className="container-lg text-center community-container">
      <h1>JOIN OUR COMMUNITY!</h1>
      <p>
        We have a big and supporting community of many great developers and
        students just like you! <br /> <br />
        All the communication is centralized on our Discord server, so if you
        need any help or guidance you can always go there and seek help from the
        other members. There is always a humble soul that will help you through
        your journey to become a great ReactJS developer!
        <br /> <br />
        Join us on our Discord server, we expect you and wish you the very best
        on your journey to mastering one of the greatest libraries for frontend
        development!
      </p>

      <div className="d-flex justify-content-between discord-container">
        <button onClick={() => (window.location.href = discordInviteUrl)}>
          JOIN NOW
        </button>
        <img alt="discord-logo" src={discordLogo} />
      </div>
    </div>
  )
}

export default CommunityPage
