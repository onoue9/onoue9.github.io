const ContactMe = () => (
  <div className="flex content-center justify-center w-auto h-screen">
    <div className="flex flex-col content-center justify-center w-1/2">
      <form className="flex flex-col content-center justify-center w-auto">
        <label>Name: </label><input type={"text"}/>
        <label>Email: </label><input type={"text"}/>
        <label>Subject: </label><input type={"text"}/>
        <label></label><input type={"textarea"} placeholder="Type your msg here..."/>
        <button>Send</button>
      </form>
    </div>
    <div className="flex flex-col content-center justify-center text-center w-1/2">
      <span>Email: filipeflom@gmail.com</span>
      <span>phone/whatsapp: +552198168-5107</span>
      <span><a href="https://www.github.com/onoue9">github</a></span>
      <span><a href="https://www.linkedin.com/in/filipeonoue">linkedin</a></span>
    </div>
  </div>
)

export default ContactMe;
