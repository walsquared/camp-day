import './App.css';
import campLogo from './images/camp-logo.png';
import RSVPForm from './rsvpForm';
import { ReactComponent as Cloud1 } from './images/cloud-1.svg';
import { ReactComponent as Cloud2 } from './images/cloud-2.svg';
import { ReactComponent as Cloud3 } from './images/cloud-3.svg';
import { ReactComponent as Sun } from './images/sun.svg';

function App() {
  return (
    <div className="app">
      <div className="hero">
        <Sun className="sun" />
        <Cloud1 className="cloud1" />
        <Cloud2 className="cloud2" />
        <Cloud3 className="cloud3" />
      </div>
      <section className="context">
        <div>
          <h1>Camp day is fast approaching</h1>
          <p>
            You and two companions (teams of 3) are invited to enjoy some fun
            and games while also competing against others for fame!
          </p>
          <p>
            Games will begin at <b>6pm on Saturday, August 26th</b>, at{' '}
            <a
              href="https://goo.gl/maps/GYYfQoJsXAiobogJA"
              target="_blank"
              rel="noopener noreferrer"
            >
              Parc de Normanville
            </a>
            . The program will be posted here soon!
          </p>
          <p>
            These activities will involve both physical and creative skills.
            There might also be options for arts and crafts.
          </p>
          <p>
            Below you’ll find a registration form — only one person per team
            will need to register. Please register your team by noon on{' '}
            <b>Saturday, August 26th!</b>
          </p>
          <p>
            Until then, get hyped, and get ready to play!
            <br />– Wal
          </p>
        </div>
      </section>
      <div className="transition" />
      <section className="registration">
        <div>
          <h1>
            <div className="preTitle">
              <img src={campLogo} alt="Camp logo" />
              Camp Wally West
            </div>
            <div>CAMPER REGISTRATION</div>
          </h1>
          <RSVPForm />
        </div>
      </section>
      <footer>
        <p>
          Website was made with&nbsp;
          <span title="love" aria-label="love">
            💖
          </span>
          &nbsp;by Wal.
        </p>
      </footer>
    </div>
  );
}

export default App;
