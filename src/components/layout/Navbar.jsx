import { NavLink } from "react-router-dom";


function Navbar() {


  const links = [
    {
      name:"Home",
      path:"/"
    },
    {
      name:"Movies",
      path:"/movies"
    },
    {
      name:"Search",
      path:"/search"
    },
    {
      name:"Watchlist",
      path:"/watchlist"
    }
  ];


  return (

    <nav 
      className="
      fixed 
      top-0 
      left-0 
      right-0 
      z-50
      bg-black/40
      backdrop-blur-md
      border-b
      border-white/10
      "
    >

      <div 
        className="
        max-w-7xl 
        mx-auto
        px-5
        py-4
        flex
        justify-between
        items-center
        "
      >


        {/* Logo */}

        <NavLink 
          to="/"
          className="
          text-2xl
          font-bold
          text-red-500
          "
        >
          🎬 Cinema
        </NavLink>



        {/* Links */}

        <div
          className="
          flex
          gap-6
          "
        >

          {
            links.map((link)=>(
              <NavLink
                key={link.path}
                to={link.path}

                className={({isActive})=>
                  `
                  text-sm
                  font-medium
                  ${
                    isActive
                    ? "text-red-500"
                    :"text-white"
                  }
                  hover:text-red-400
                  `
                }

              >
                {link.name}
              </NavLink>
            ))
          }

        </div>


      </div>


    </nav>

  );
}


export default Navbar;