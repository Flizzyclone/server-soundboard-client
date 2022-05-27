import Login from '../components/Login'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { AppAppContextProvider } from '../components/AppContextProvider';

const particleOptions = {
  particles: {
    collisions: {
      enable:true
    },
    color: {
      value: ['#D12229','#F68A1E','#FDE01A','#007940','#24408E','#732982'],
    },
    links: {
      color: "#FDE01A",
      distance:50,
      opacity:1,
      width:2,
      enable:true
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: true,
      speed: {min: 1, max: 3},
      straight: false,
    },
    opacity: {
      value: 1,
    },
    size: {
      value:4
    }
  }
}

function LoginPage() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };
  return (
    <div>
      <Login></Login>
    </div>
  );
}

export default LoginPage;
