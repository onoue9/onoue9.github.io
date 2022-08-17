import avatar from '../assets/avatar.png'

const Intro = () => (
  <div className="flex w-screen h-screen">
    <span className="text-4xl pl-40 pt-80">
      Hi, i'm Filipe Onoue
      <p className="text-3x1">Fullstack Web Developer</p>
    </span>
    
    <img className="pl-40 pt-40 w-2/4 h-auto" src={avatar} alt="a picture of me" />
  </div>
)

export default Intro;
