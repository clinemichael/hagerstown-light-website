import LoginForm from "./auth/LoginForm";


export default function Hero() {
  return (
 <div className="relative z-10 max-w-7xl min-h-screen mx-auto flex items-center px-8">

  <div className="grid md:grid-cols-2 gap-12 items-center w-full">


    <div>

      <img
        src="/logo.jpg"
        alt="Hagerstown Light Department"
        className="w-80 mb-10"
      />


      <h1 className="text-5xl font-bold text-white">
        HLD Operations
      </h1>


      <p className="mt-6 text-xl text-white max-w-lg">
        Hagerstown Light Department
        Internal Operations Portal
      </p>


    </div>


    <div className="flex justify-center">

      <LoginForm />

    </div>


  </div>

</div>
  );
}