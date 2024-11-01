import HeroSlider from "./HeroSlider";

const HomePage = () => {
  return (
    <div className="relative">
      {/* Navbar */}
      <nav className=" w-full top-0  flex items-center justify-between p-6 bg-gray-900 text-white">
        <div className="text-xl font-bold">TaskMaster</div>
        <div className="space-x-4 text-xs">
          <a href="/login" className="hover:text-gray-300">
            Sign in
          </a>
          <a href="/register" className="hover:text-gray-300">
            Register
          </a>
          <a
            href="https://documenter.getpostman.com/view/25136449/2sAY4uD43J"
            target="_blank"
            className="hover:text-gray-300"
          >
            Developer's Doc
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      {/* smosos */}
      <HeroSlider />
    </div>
  );
};

export default HomePage;
